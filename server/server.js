import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import { generateContent } from './geminiClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml'
};

// Basic in-memory rate limiting (max 10 requests per minute per IP)
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

const server = http.createServer(async (req, res) => {
  // CORS config if needed (since same origin, just basic setup)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Handle POST /api/chat
  if (req.method === 'POST' && req.url === '/api/chat') {
    const ip = req.socket.remoteAddress;
    if (!applyRateLimit(ip)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Demasiadas peticiones. Intenta de nuevo en un minuto.' }));
    }

    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const { systemInstruction, userText, contextChunks } = JSON.parse(body);
        
        if (!userText || typeof userText !== 'string' || userText.length > 500) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Mensaje inválido o demasiado largo.' }));
        }

        try {
          const reply = await generateContent({ systemInstruction, userText, contextChunks });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply }));
        } catch (error) {
          if (error.message === 'MISSING_API_KEY') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
              reply: "¡Hola! Soy el chatbot de prueba. Para que pueda responder con IA real usando Gemini, necesitas añadir tu clave en el archivo `.env` como `GEMINI_API_KEY=tu_clave` y reiniciar el servidor. ¡Sigue explorando la interfaz mientras tanto!" 
            }));
          } else {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error interno del servidor al procesar con Gemini.' }));
          }
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Body no es JSON válido.' }));
      }
    });
    return;
  }

  // Serve static files
  if (req.method === 'GET') {
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Serve index.html for unknown routes (SPA fallback)
          fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (errHtml, contentHtml) => {
            if (errHtml) {
              res.writeHead(500);
              return res.end('Error cargando index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(contentHtml, 'utf-8');
          });
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});

server.listen(config.port, () => {
  console.log(`[🚀] Servidor iniciado en http://localhost:${config.port}`);
  console.log(`[ℹ] Modo: ${config.env}`);
  if (!config.apiKey) {
    console.log(`[!] GEMINI_API_KEY no encontrada. El chatbot operará en modo de demostración local.`);
  }
});
