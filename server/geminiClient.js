import { config } from './config.js';

const CANDIDATE_MODELS = [
  config.model || 'gemini-flash-latest',
  'gemini-flash-latest',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash'
];

/**
 * Calls the Google AI Studio Gemini API via fetch with fallback models.
 */
export async function generateContent({ systemInstruction, userText, contextChunks }) {
  if (!config.apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  // Remove duplicates while preserving order
  const modelsToTry = [...new Set(CANDIDATE_MODELS.filter(Boolean))];

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

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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
        console.error(`Gemini API Error with ${model}:`, response.status, errData);
        lastError = new Error(`GEMINI_ERROR: ${response.status}`);
        continue;
      }

      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!replyText) {
        lastError = new Error('EMPTY_RESPONSE');
        continue;
      }

      return replyText;
    } catch (err) {
      console.error(`Error attempting ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('GEMINI_ERROR: 500');
}
