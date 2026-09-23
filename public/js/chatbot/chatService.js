import { retrieveChunks } from './retriever.js';
import { systemPrompt } from './prompt.js';

export async function sendMessageToBot(userText) {
  // 1. Retrieve relevant context based on user query
  const contextChunks = retrieveChunks(userText);
  
  // 2. Prepare payload
  const payload = {
    systemInstruction: systemPrompt,
    userText,
    contextChunks
  };

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al comunicarse con el servidor.');
    }

    return data.reply;
  } catch (error) {
    console.error('ChatService error:', error);
    return "Lo siento, hubo un error al procesar tu solicitud. Intenta nuevamente más tarde.";
  }
}
