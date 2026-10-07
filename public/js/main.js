import { Router } from './core/router.js';
import { Sidebar } from './components/Sidebar.js';
import { ChatWidget } from './chatbot/ChatWidget.js';

import HomePage from './pages/HomePage.js';
import CoursesPage from './pages/CoursesPage.js';
import CourseDetailPage from './pages/CourseDetailPage.js';
import InstructorsPage from './pages/InstructorsPage.js';
import ChatbotPage from './pages/ChatbotPage.js';
import ContactPage from './pages/ContactPage.js';

const routes = {
  '#/home': HomePage,
  '#/cursos': CoursesPage,
  '#/cursos/:id': CourseDetailPage,
  '#/instructores': InstructorsPage,
  '#/chatbot': ChatbotPage,
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
  const chatContainer = document.getElementById('chat-widget-container');
  
  function toggleMobileMenu() {
    sidebarContainer.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');
  }
  
  mobileBtn.addEventListener('click', toggleMobileMenu);
  sidebarOverlay.addEventListener('click', toggleMobileMenu);
  
  // Close sidebar on navigation (mobile) & toggle floating chat widget
  window.addEventListener('route-changed', (e) => {
    sidebarContainer.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');

    const path = e.detail?.path || window.location.hash;
    if (path === '#/chatbot') {
      chatContainer.style.display = 'none';
    } else {
      chatContainer.style.display = '';
    }
  });

  // 3. Initialize Router
  const router = new Router(routes, '#/home');
  router.init();

  // 4. Initialize Floating Chat Widget
  const floatingChat = new ChatWidget(false);
  chatContainer.appendChild(floatingChat.render());

  // Initial check for current route on load
  if (window.location.hash === '#/chatbot') {
    chatContainer.style.display = 'none';
  }
});
