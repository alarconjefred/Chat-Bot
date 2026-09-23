import { createElement } from '../core/dom.js';

export class Sidebar {
  constructor() {
    this.links = [
      { path: '#/home', label: 'Inicio', icon: this.getIcon('home') },
      { path: '#/cursos', label: 'Cursos', icon: this.getIcon('courses') },
      { path: '#/instructores', label: 'Instructores', icon: this.getIcon('instructors') },
      { path: '#/chatbot', label: 'Chatbot', icon: this.getIcon('chat') },
      { path: '#/contacto', label: 'Contáctanos', icon: this.getIcon('contact') }
    ];
  }

  getIcon(type) {
    const icons = {
      home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      courses: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
      instructors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
      contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
    };
    return icons[type] || '';
  }

  render() {
    const container = createElement('nav', { className: 'sidebar' });
    
    // Logo
    const logo = createElement('div', { className: 'sidebar-logo' });
    logo.innerHTML = `<div class="sidebar-logo-icon">IA</div>Academia IA`;
    container.appendChild(logo);
    
    // Links container
    const nav = createElement('div', { className: 'sidebar-nav' });
    
    this.links.forEach(link => {
      const a = createElement('a', { 
        className: 'nav-link', 
        href: link.path,
        innerHTML: `${link.icon} ${link.label}`
      });
      nav.appendChild(a);
    });
    
    container.appendChild(nav);
    
    // Setup active state listening
    window.addEventListener('route-changed', (e) => {
      const currentPath = e.detail.path || '#/home';
      nav.querySelectorAll('.nav-link').forEach(el => {
        if (el.getAttribute('href') === currentPath || 
           (currentPath.startsWith('#/cursos/') && el.getAttribute('href') === '#/cursos')) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    });

    return container;
  }
}
