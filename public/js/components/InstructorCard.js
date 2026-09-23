import { createElement } from '../core/dom.js';

export class InstructorCard {
  constructor(instructor) {
    this.instructor = instructor;
  }

  render() {
    const inst = this.instructor;
    const card = createElement('div', { className: 'instructor-card' });
    
    card.innerHTML = `
      <div class="instructor-header">
        <img src="${inst.photo}" alt="${inst.name}" class="instructor-photo" loading="lazy">
        <div class="instructor-title-area">
          <h3 class="instructor-name">${inst.name}</h3>
          <p class="instructor-role">${inst.role}</p>
        </div>
      </div>
      <div class="instructor-body">
        <p class="instructor-bio">${inst.bio}</p>
        <div class="instructor-skills">
          ${inst.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}
        </div>
      </div>
      <div class="instructor-footer">
        <div class="instructor-links">
          <a href="${inst.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${inst.links.github}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    `;
    
    return card;
  }
}
