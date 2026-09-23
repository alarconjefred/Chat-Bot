import { createElement } from '../core/dom.js';

export class Timeline {
  constructor(items) {
    this.items = items;
  }

  render() {
    const container = createElement('div', { className: 'timeline-container' });
    
    this.items.forEach(item => {
      const lineNode = createElement('div', { className: 'timeline-item' },
        createElement('div', { className: 'timeline-marker' }),
        createElement('div', { className: 'timeline-content' },
          createElement('h3', { className: 'timeline-year' }, item.year),
          createElement('h4', { className: 'timeline-title' }, item.title),
          createElement('p', { className: 'timeline-desc' }, item.description)
        )
      );
      container.appendChild(lineNode);
    });

    return container;
  }
}
