/**
 * Hash-based router
 */
export class Router {
  constructor(routes, defaultRoute = '#/home') {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    this.currentView = null;
    this.container = document.getElementById('view-container');
    
    window.addEventListener('hashchange', () => this.handleRouteChange());
  }

  init() {
    if (!window.location.hash) {
      window.location.hash = this.defaultRoute;
    } else {
      this.handleRouteChange();
    }
  }

  handleRouteChange() {
    const hash = window.location.hash;
    const path = hash.split('?')[0]; // simple path without query
    const segments = path.split('/').filter(Boolean);
    
    let matchedRoute = null;
    let params = {};

    // Basic exact match or parametric match (e.g., #/cursos/:id)
    for (const [routePath, component] of Object.entries(this.routes)) {
      const routeSegments = routePath.split('/').filter(Boolean);
      
      if (routeSegments.length === segments.length) {
        let isMatch = true;
        let tempParams = {};
        
        for (let i = 0; i < routeSegments.length; i++) {
          if (routeSegments[i].startsWith(':')) {
            tempParams[routeSegments[i].substring(1)] = segments[i];
          } else if (routeSegments[i] !== segments[i]) {
            isMatch = false;
            break;
          }
        }
        
        if (isMatch) {
          matchedRoute = component;
          params = tempParams;
          break;
        }
      }
    }

    if (!matchedRoute && this.routes[this.defaultRoute]) {
      window.location.hash = this.defaultRoute;
      return;
    }

    this.render(matchedRoute, params);
    
    // Dispatch custom event for Sidebar to update active link
    window.dispatchEvent(new CustomEvent('route-changed', { detail: { path } }));
  }

  async render(ComponentClass, params) {
    if (!this.container) return;
    
    // Smooth transition out
    this.container.style.opacity = 0;
    
    setTimeout(async () => {
      this.container.innerHTML = '';
      
      if (ComponentClass) {
        const component = new ComponentClass(params);
        const element = await component.render();
        this.container.appendChild(element);
      }
      
      // Smooth transition in
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.container.style.opacity = 1;
    }, 150);
  }
}
