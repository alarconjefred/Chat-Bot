/**
 * DOM helper functions
 */

export function createElement(tag, attributes = {}, ...children) {
  const el = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (key === 'className') {
      el.className = value;
    } else if (key === 'dataset') {
      for (const [dataKey, dataVal] of Object.entries(value)) {
        el.dataset[dataKey] = dataVal;
      }
    } else if (key === 'innerHTML') {
      el.innerHTML = value;
    } else {
      el.setAttribute(key, value);
    }
  }
  
  children.forEach(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    } else if (Array.isArray(child)) {
      child.forEach(c => {
        if (c instanceof Node) el.appendChild(c);
      });
    }
  });
  
  return el;
}

export function mount(container, element) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  if (!container) return;
  
  container.appendChild(element);
}

export function clear(container) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  if (!container) return;
  
  container.innerHTML = '';
}
