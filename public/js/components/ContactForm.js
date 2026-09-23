import { createElement } from '../core/dom.js';
import { coursesData } from '../data/courses.js';

export class ContactForm {
  render() {
    const container = createElement('form', { className: 'contact-form', id: 'contact-form' });
    
    container.innerHTML = `
      <div class="form-group">
        <label for="name">Nombre completo</label>
        <input type="text" id="name" name="name" required placeholder="Ej. Ana Pérez">
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" name="email" required placeholder="ana@ejemplo.com">
      </div>
      <div class="form-group">
        <label for="course">Curso de interés (Opcional)</label>
        <select id="course" name="course">
          <option value="">Seleccione un curso...</option>
          ${coursesData.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" name="message" rows="4" required placeholder="¿En qué podemos ayudarte?"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Enviar mensaje</button>
      <div class="form-success-msg" id="form-success" style="display: none;">
        ¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.
      </div>
    `;

    container.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = container.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Enviando...';
      
      // Simulate API call
      setTimeout(() => {
        container.reset();
        btn.style.display = 'none';
        container.querySelector('#form-success').style.display = 'block';
      }, 1000);
    });

    return container;
  }
}
