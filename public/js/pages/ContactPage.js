import { createElement } from '../core/dom.js';
import { contactData } from '../data/contact.js';
import { ContactForm } from '../components/ContactForm.js';

export default class ContactPage {
  async render() {
    const container = createElement('div', { className: 'page-contact animation-fade-in' });
    
    container.innerHTML = `
      <div class="page-header">
        <h1>Contacta con <span class="text-gradient">Nosotros</span></h1>
        <p>Estamos aquí para resolver tus dudas y ayudarte a dar el siguiente paso en tu carrera.</p>
      </div>
      
      <div class="contact-layout">
        <div class="contact-info">
          <div class="info-card">
            <h3>Información de Contacto</h3>
            <p><strong>Email:</strong> ${contactData.info.email}</p>
            <p><strong>Teléfono:</strong> ${contactData.info.phone}</p>
            <p><strong>Ubicación:</strong> ${contactData.info.city}</p>
            <p><strong>Horario:</strong> ${contactData.info.hours}</p>
          </div>
          
          <div class="faq-section mt-4">
            <h3>Preguntas Frecuentes</h3>
            <div class="accordion">
              ${contactData.faqs.map(faq => `
                <div class="faq-item">
                  <h4>${faq.question}</h4>
                  <p>${faq.answer}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="contact-form-wrapper">
          <div class="info-card">
            <h3>Envíanos un mensaje</h3>
            <div id="contact-form-container"></div>
          </div>
        </div>
      </div>
    `;
    
    const formContainer = container.querySelector('#contact-form-container');
    const form = new ContactForm();
    formContainer.appendChild(form.render());
    
    if (!document.getElementById('contact-css')) {
      const link = createElement('link', { id: 'contact-css', rel: 'stylesheet', href: '/css/pages/contact.css' });
      const formCss = createElement('link', { id: 'form-css', rel: 'stylesheet', href: '/css/components/form.css' });
      document.head.appendChild(link);
      document.head.appendChild(formCss);
    }
    
    return container;
  }
}
