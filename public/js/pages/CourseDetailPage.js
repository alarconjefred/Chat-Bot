import { createElement } from '../core/dom.js';
import { coursesData } from '../data/courses.js';
import { formatCOP } from '../core/formatters.js';

export default class CourseDetailPage {
  constructor(params) {
    this.slug = params.id;
    this.course = coursesData.find(c => c.slug === this.slug);
  }

  async render() {
    const container = createElement('div', { className: 'page-course-detail animation-fade-in' });
    
    if (!this.course) {
      container.innerHTML = `<h2>Curso no encontrado</h2><a href="#/cursos" class="btn btn-primary">Volver</a>`;
      return container;
    }

    const c = this.course;

    container.innerHTML = `
      <div class="course-detail-header">
        <a href="#/cursos" class="back-link">&larr; Volver a cursos</a>
        <div class="course-badges">
          <span class="badge badge-green">${c.level}</span>
          <span class="badge badge-blue">${c.durationHours} horas</span>
        </div>
        <h1 class="course-detail-title">${c.title}</h1>
        <p class="course-detail-summary">${c.summary}</p>
        <div class="course-detail-price">${formatCOP(c.priceCOP)}</div>
        <button class="btn btn-primary btn-lg mt-3">Inscribirme ahora</button>
      </div>

      <div class="course-content-grid">
        <div class="course-main">
          <section class="detail-section">
            <h2>Módulos del Curso</h2>
            <div class="modules-list">
              ${c.modules.map((m, i) => `
                <div class="module-item">
                  <div class="module-number">${i + 1}</div>
                  <div class="module-content">
                    <h3>${m.title}</h3>
                    <ul>
                      ${m.topics.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>
        
        <aside class="course-sidebar">
          <section class="detail-section sidebar-box">
            <h3>¿Qué aprenderás?</h3>
            <ul class="check-list">
              ${c.outcomes.map(o => `<li>${o}</li>`).join('')}
            </ul>
          </section>
          <section class="detail-section sidebar-box">
            <h3>Dirigido a</h3>
            <ul class="bullet-list">
              ${c.audience.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </section>
          <section class="detail-section sidebar-box">
            <h3>Requisitos</h3>
            <ul class="bullet-list">
              ${c.prerequisites.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </section>
        </aside>
      </div>
    `;

    // Load dynamic CSS
    if (!document.getElementById('course-detail-css')) {
      const link = createElement('link', { id: 'course-detail-css', rel: 'stylesheet', href: '/css/pages/courses.css' });
      document.head.appendChild(link);
    }

    return container;
  }
}
