/**
 * formatters.js
 */

export function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    maximumFractionDigits: 0 
  }).format(value);
}

export function slugify(text) {
  return text
    .toString()
    .normalize('NFD') // Convierte a formato de normalización
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios con -
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos
    .replace(/\-\-+/g, '-'); // Reemplaza múltiples - con un solo -
}
