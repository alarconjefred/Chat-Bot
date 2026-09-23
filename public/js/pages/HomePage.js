import { createElement } from '../core/dom.js';
import { historyData } from '../data/history.js';
import { Timeline } from '../components/Timeline.js';

export default class HomePage {
  async render() {
    const container = createElement('div', { className: 'page-home animation-fade-in' });
    
    // Hero Section
    const hero = createElement('section', { className: 'hero-section' });
    const heroContent = createElement('div', { className: 'hero-content' });
    
    heroContent.innerHTML = `
      <h1 class="hero-title">Domina el futuro con la <span class="text-gradient">Inteligencia Artificial</span></h1>
      <p class="hero-subtitle">Desde los fundamentos hasta el Deep Learning aplicado. Aprende las habilidades más demandadas del mundo.</p>
      <div class="hero-actions">
        <a href="#/cursos" class="btn btn-primary btn-lg">Explorar Cursos</a>
        <a href="#/chatbot" class="btn btn-outline btn-lg">Hablar con IA</a>
      </div>
    `;
    hero.appendChild(heroContent);
    container.appendChild(hero);
    
    // History Section
    const historySection = createElement('section', { className: 'history-section' });
    historySection.innerHTML = `
      <div class="section-header text-center">
        <h2>La Historia de la IA</h2>
        <p>Un recorrido por los hitos que nos trajeron a la revolución actual.</p>
      </div>
    `;
    
    const timeline = new Timeline(historyData);
    historySection.appendChild(timeline.render());
    
    container.appendChild(historySection);
    
    // Quick load styles if not loaded
    if (!document.getElementById('home-css')) {
      const link = createElement('link', { id: 'home-css', rel: 'stylesheet', href: '/css/pages/home.css' });
      document.head.appendChild(link);
    }
    
    return container;
  }
}
