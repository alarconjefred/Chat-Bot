import { generateContent } from '../server/geminiClient.js';

// Basic in-memory rate limiting (Note: In Serverless this only applies per-instance)
const rateLimits = new Map();

function applyRateLimit(ip) {
  const now = Date.now();
  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  const record = rateLimits.get(ip);
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + 60000;
    return true;
  }
  if (record.count >= 10) return false;
  record.count++;
  return true;
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting (per instance)
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (!applyRateLimit(ip)) {
    return res.status(429).json({ error: 'Demasiadas peticiones. Intenta de nuevo en un minuto.' });
  }

  const { systemInstruction, userText, contextChunks } = req.body || {};

  if (!userText || typeof userText !== 'string' || userText.length > 500) {
    return res.status(400).json({ error: 'Mensaje inválido o demasiado largo.' });
  }

  try {
    const reply = await generateContent({ systemInstruction, userText, contextChunks });
    return res.status(200).json({ reply });
  } catch (error) {
    if (error.message === 'MISSING_API_KEY') {
      return res.status(200).json({ 
        reply: "¡Hola! Soy el chatbot de prueba. Para que pueda responder con IA real en Vercel, necesitas añadir la variable de entorno GEMINI_API_KEY en la configuración del proyecto en Vercel." 
      });
    } else {
      console.error(error);
      return res.status(500).json({ error: 'Error interno del servidor al procesar con Gemini.' });
    }
  }
}
