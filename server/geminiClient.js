import { config } from './config.js';

/**
 * Calls the Google AI Studio Gemini API via fetch.
 */
export async function generateContent({ systemInstruction, userText, contextChunks }) {
  if (!config.apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`;
  
  // Build context payload
  const combinedContext = `CONTEXTO DEL SITIO (Usa solo esto para responder):\n\n${contextChunks}\n\nPREGUNTA DEL USUARIO:\n${userText}`;

  const payload = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents: [{ role: 'user', parts: [{ text: combinedContext }] }],
    generationConfig: { 
      temperature: 0.2, // Low temp for factual RAG
      maxOutputTokens: 800
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': config.apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.text();
    console.error('Gemini API Error:', response.status, errData);
    throw new Error(`GEMINI_ERROR: ${response.status}`);
  }

  const data = await response.json();
  const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!replyText) {
    throw new Error('EMPTY_RESPONSE');
  }

  return replyText;
}
