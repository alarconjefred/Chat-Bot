import { Router } from './core/router.js';
import { Sidebar } from './components/Sidebar.js';
import { ChatWidget } from './chatbot/ChatWidget.js';

import HomePage from './pages/HomePage.js';
import CoursesPage from './pages/CoursesPage.js';
import CourseDetailPage from './pages/CourseDetailPage.js';
import InstructorsPage from './pages/InstructorsPage.js';
import ContactPage from './pages/ContactPage.js';

class PlaceholderPage {
  constructor(params) { this.params = params; }
  async render() {
    const div = document.createElement('div');
    div.innerHTML = `<h2>Vista en construcción</h2><p>Chatbot disponible próximamente.</p>`;
    return div;
  }
}

const routes = {
  '#/home': HomePage,
  '#/cursos': CoursesPage,
  '#/cursos/:id': CourseDetailPage,
  '#/instructores': InstructorsPage,
  '#/chatbot': PlaceholderPage,
  '#/contacto': ContactPage
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sidebar
  const sidebarContainer = document.getElementById('sidebar-container');
  const sidebar = new Sidebar();
  sidebarContainer.appendChild(sidebar.render());

  // 2. Initialize Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  
  function toggleMobileMenu() {
    sidebarContainer.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');
  }
  
  mobileBtn.addEventListener('click', toggleMobileMenu);
  sidebarOverlay.addEventListener('click', toggleMobileMenu);
  
  // Close sidebar on navigation (mobile)
  window.addEventListener('route-changed', () => {
    sidebarContainer.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
  });

  // 3. Initialize Router
  const router = new Router(routes, '#/home');
  router.init();

  // 4. Initialize Floating Chat Widget
  const chatContainer = document.getElementById('chat-widget-container');
  const floatingChat = new ChatWidget(false);
  chatContainer.appendChild(floatingChat.render());
});
