import { createElement } from '../core/dom.js';
import { sendMessageToBot } from './chatService.js';

export class ChatWidget {
  constructor(isPage = false) {
    this.isPage = isPage;
    this.messages = [
      { role: 'assistant', text: '¡Hola! Soy el asistente virtual de Academia IA. ¿En qué puedo ayudarte hoy sobre nuestros cursos, instructores o la historia de la IA?' }
    ];
    this.isTyping = false;
  }

  render() {
    this.container = createElement('div', { 
      className: this.isPage ? 'chat-page-container' : 'chat-widget-floating' 
    });

    if (!this.isPage) {
      this.toggleBtn = createElement('button', { 
        className: 'chat-widget-toggle btn-primary',
        innerHTML: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>'
      });
      this.toggleBtn.onclick = () => this.toggleWidget();
      this.container.appendChild(this.toggleBtn);
      
      this.chatWindow = createElement('div', { className: 'chat-window hidden' });
      this.container.appendChild(this.chatWindow);
    } else {
      this.chatWindow = createElement('div', { className: 'chat-window open' });
      this.container.appendChild(this.chatWindow);
    }

    this.renderChatWindow();

    return this.container;
  }

  toggleWidget() {
    if (this.chatWindow.classList.contains('hidden')) {
      this.chatWindow.classList.remove('hidden');
      this.chatWindow.classList.add('open');
    } else {
      this.chatWindow.classList.add('hidden');
      this.chatWindow.classList.remove('open');
    }
  }

  renderChatWindow() {
    this.chatWindow.innerHTML = '';

    // Header
    const header = createElement('div', { className: 'chat-header' });
    header.innerHTML = `
      <div class="chat-header-info">
        <div class="chat-avatar">IA</div>
        <div class="chat-title">Asistente Virtual</div>
      </div>
    `;
    if (!this.isPage) {
      const closeBtn = createElement('button', { className: 'chat-close-btn', innerHTML: '×' });
      closeBtn.onclick = () => this.toggleWidget();
      header.appendChild(closeBtn);
    }
    this.chatWindow.appendChild(header);

    // Messages Area
    this.messagesArea = createElement('div', { 
      className: 'chat-messages',
      'aria-live': 'polite'
    });
    this.chatWindow.appendChild(this.messagesArea);
    this.updateMessagesDOM();

    // Input Area
    const inputArea = createElement('div', { className: 'chat-input-area' });
    
    // Suggestions
    const suggestions = createElement('div', { className: 'chat-suggestions' });
    const suggestionsList = ["¿Qué cursos ofrecen?", "¿Cuánto cuesta Deep Learning?", "¿Quién dicta Machine Learning?"];
    suggestionsList.forEach(s => {
      const pill = createElement('button', { className: 'chat-suggestion-pill', innerHTML: s });
      pill.onclick = () => this.handleSend(s);
      suggestions.appendChild(pill);
    });
    inputArea.appendChild(suggestions);

    // Form
    const form = createElement('form', { className: 'chat-form' });
    this.input = createElement('input', { 
      type: 'text', 
      placeholder: 'Escribe tu mensaje...', 
      className: 'chat-input',
      autocomplete: 'off'
    });
    this.sendBtn = createElement('button', { 
      type: 'submit', 
      className: 'chat-send-btn btn-primary',
      innerHTML: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
    });

    form.onsubmit = (e) => {
      e.preventDefault();
      const val = this.input.value.trim();
      if (val) this.handleSend(val);
    };

    form.appendChild(this.input);
    form.appendChild(this.sendBtn);
    inputArea.appendChild(form);

    this.chatWindow.appendChild(inputArea);
  }

  updateMessagesDOM() {
    this.messagesArea.innerHTML = '';
    
    this.messages.forEach(m => {
      const bubble = createElement('div', { className: `chat-bubble ${m.role}` });
      
      // Simple markdown parser for bold and line breaks
      let textHTML = m.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
        
      bubble.innerHTML = textHTML;
      this.messagesArea.appendChild(bubble);
    });

    if (this.isTyping) {
      const typingBubble = createElement('div', { className: 'chat-bubble assistant typing' });
      typingBubble.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
      this.messagesArea.appendChild(typingBubble);
    }

    this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
  }

  async handleSend(text) {
    if (this.isTyping) return;

    // Add user message
    this.messages.push({ role: 'user', text });
    this.input.value = '';
    this.isTyping = true;
    this.sendBtn.disabled = true;
    this.updateMessagesDOM();

    // Call API
    const reply = await sendMessageToBot(text);

    // Add bot message
    this.isTyping = false;
    this.sendBtn.disabled = false;
    this.messages.push({ role: 'assistant', text: reply });
    this.updateMessagesDOM();
    
    // Focus back on input
    if (!this.isPage) this.input.focus();
  }
}
