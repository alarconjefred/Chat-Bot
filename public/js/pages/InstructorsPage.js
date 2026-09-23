import { createElement } from '../core/dom.js';
import { instructorsData } from '../data/instructors.js';
import { InstructorCard } from '../components/InstructorCard.js';

export default class InstructorsPage {
  async render() {
    const container = createElement('div', { className: 'page-instructors animation-fade-in' });
    
    container.innerHTML = `
      <div class="page-header">
        <h1>Nuestros <span class="text-gradient">Instructores</span></h1>
        <p>Aprende de expertos de la industria con experiencia real construyendo sistemas de IA.</p>
      </div>
      <div class="instructors-grid" id="instructors-grid"></div>
    `;
    
    const grid = container.querySelector('#instructors-grid');
    instructorsData.forEach(inst => {
      const card = new InstructorCard(inst);
      grid.appendChild(card.render());
    });
    
    if (!document.getElementById('instructors-css')) {
      const link = createElement('link', { id: 'instructors-css', rel: 'stylesheet', href: '/css/pages/instructors.css' });
      document.head.appendChild(link);
    }
    
    return container;
  }
}
