import { createElement } from '../core/dom.js';
import { ChatWidget } from '../chatbot/ChatWidget.js';

export default class ChatbotPage {
  async render() {
    const container = createElement('div', { className: 'page-chatbot animation-fade-in' });
    
    const header = createElement('div', { className: 'page-header' });
    header.innerHTML = `
      <h1>Asistente <span class="text-gradient">Inteligente</span></h1>
      <p>Pregúntale a nuestro bot sobre los cursos, precios, instructores o la historia de la IA.</p>
    `;
    container.appendChild(header);
    
    const chatContainer = createElement('div', { className: 'chatbot-full-wrapper' });
    
    const widget = new ChatWidget(true);
    chatContainer.appendChild(widget.render());
    
    container.appendChild(chatContainer);
    
    if (!document.getElementById('chatbot-css')) {
      const link = createElement('link', { id: 'chatbot-css', rel: 'stylesheet', href: '/css/components/chatbot.css' });
      document.head.appendChild(link);
    }
    
    // Auto focus the input after rendering
    setTimeout(() => {
      const input = container.querySelector('.chat-input');
      if (input) input.focus();
    }, 100);
    
    return container;
  }
}
