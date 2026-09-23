import { createElement } from '../core/dom.js';
import { formatCOP } from '../core/formatters.js';

export class CourseCard {
  constructor(course) {
    this.course = course;
  }

  render() {
    const c = this.course;
    const card = createElement('div', { className: 'course-card' });
    
    // Header
    const header = createElement('div', { className: 'course-card-header' });
    const badge = createElement('span', { className: 'badge badge-green' }, c.level);
    const duration = createElement('span', { className: 'badge badge-blue' }, `${c.durationHours}h`);
    
    header.appendChild(badge);
    header.appendChild(duration);
    
    // Body
    const body = createElement('div', { className: 'course-card-body' });
    const title = createElement('h3', { className: 'course-title' }, c.title);
    const desc = createElement('p', { className: 'course-desc' }, c.summary);
    const price = createElement('div', { className: 'course-price' }, formatCOP(c.priceCOP));
    
    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(price);
    
    // Footer
    const footer = createElement('div', { className: 'course-card-footer' });
    const btn = createElement('a', { 
      className: 'btn btn-primary', 
      href: `#/cursos/${c.slug}` 
    }, 'Ver detalles');
    
    footer.appendChild(btn);
    
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    
    return card;
  }
}
