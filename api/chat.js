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
  // Manejo de preflight OPTIONS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Chatbot-Key');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Verificación obligatoria de token de servicio seguro
  const expectedToken = process.env.CHATBOT_SERVICE_TOKEN;
  if (!expectedToken || typeof expectedToken !== 'string' || expectedToken.trim() === '') {
    console.error('[Seguridad Vercel] CHATBOT_SERVICE_TOKEN no configurado en las variables de entorno.');
    return res.status(503).json({ error: 'Servicio de IA no configurado de forma segura.' });
  }

  const providedToken = req.headers['x-chatbot-key'];
  if (!providedToken || typeof providedToken !== 'string' || providedToken !== expectedToken) {
    return res.status(401).json({ error: 'Acceso no autorizado al servicio de IA.' });
  }

  // 2. Control de tasa por IP en instancia (filtro complementario)
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (!applyRateLimit(ip)) {
    return res.status(429).json({ error: 'Demasiadas peticiones. Intenta de nuevo en un minuto.' });
  }

  // 3. Validación estricta del payload
  const { systemInstruction, userText, contextChunks } = req.body || {};

  if (!userText || typeof userText !== 'string' || userText.length > 500) {
    return res.status(400).json({ error: 'Mensaje inválido o demasiado largo (máximo 500 caracteres).' });
  }

  if (contextChunks && (typeof contextChunks !== 'string' || contextChunks.length > 5000)) {
    return res.status(400).json({ error: 'El contexto excede el límite permitido.' });
  }

  if (systemInstruction && (typeof systemInstruction !== 'string' || systemInstruction.length > 2000)) {
    return res.status(400).json({ error: 'La instrucción del sistema excede el límite permitido.' });
  }

  try {
    const reply = await generateContent({ systemInstruction, userText, contextChunks });
    return res.status(200).json({ reply });
  } catch (error) {
    if (error.message === 'MISSING_API_KEY') {
      return res.status(500).json({ 
        error: 'GEMINI_API_KEY no configurada en el servidor de Vercel.' 
      });
    } else {
      console.error('[Gemini Error]:', error);
      return res.status(500).json({ error: 'Error interno del servidor al procesar con Gemini.' });
    }
  }
}
