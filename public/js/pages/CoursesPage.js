import { createElement } from '../core/dom.js';
import { coursesData } from '../data/courses.js';
import { CourseCard } from '../components/CourseCard.js';

export default class CoursesPage {
  async render() {
    const container = createElement('div', { className: 'page-courses animation-fade-in' });
    
    const header = createElement('div', { className: 'page-header' });
    header.innerHTML = `
      <h1>Catálogo de <span class="text-gradient">Cursos</span></h1>
      <p>Rutas de aprendizaje diseñadas para llevarte desde cero hasta experto en IA.</p>
    `;
    container.appendChild(header);
    
    const grid = createElement('div', { className: 'courses-grid' });
    
    coursesData.forEach(course => {
      const card = new CourseCard(course);
      grid.appendChild(card.render());
    });
    
    container.appendChild(grid);
    
    if (!document.getElementById('courses-css')) {
      const link = createElement('link', { id: 'courses-css', rel: 'stylesheet', href: '/css/pages/courses.css' });
      const cardCss = createElement('link', { id: 'card-css', rel: 'stylesheet', href: '/css/components/card.css' });
      document.head.appendChild(link);
      document.head.appendChild(cardCss);
    }
    
    return container;
  }
}
