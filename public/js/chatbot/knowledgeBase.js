import { historyData } from '../data/history.js';
import { coursesData } from '../data/courses.js';
import { instructorsData } from '../data/instructors.js';
import { contactData } from '../data/contact.js';

export function buildKnowledgeBase() {
  const chunks = [];

  // 1. History
  historyData.forEach(h => {
    chunks.push({
      id: `history-${h.year}`,
      type: 'history',
      title: `Historia de IA: ${h.title} (${h.year})`,
      text: `${h.year} - ${h.title}: ${h.description}`
    });
  });

  // 2. Courses
  coursesData.forEach(c => {
    // Course summary chunk
    chunks.push({
      id: `course-${c.id}-summary`,
      type: 'course',
      title: `Curso: ${c.title}`,
      text: `Curso: ${c.title}. Nivel: ${c.level}. Duración: ${c.durationHours} horas. Precio: ${c.priceCOP} COP. Resumen: ${c.summary}. Dirigido a: ${c.audience.join(', ')}. Requisitos: ${c.prerequisites.join(', ')}.`
    });
    
    // Modules chunk
    const modulesText = c.modules.map((m, i) => `Módulo ${i + 1}: ${m.title} (${m.topics.join(', ')})`).join('. ');
    chunks.push({
      id: `course-${c.id}-modules`,
      type: 'course_modules',
      title: `Módulos de ${c.title}`,
      text: `Temario del curso ${c.title}: ${modulesText}`
    });
  });

  // 3. Instructors
  instructorsData.forEach(inst => {
    const experienceText = inst.experience.map(e => `${e.company} (${e.period})`).join(', ');
    chunks.push({
      id: `instructor-${inst.id}`,
      type: 'instructor',
      title: `Instructor: ${inst.name}`,
      text: `Instructor: ${inst.name}. Rol: ${inst.role}. Bio: ${inst.bio}. Experiencia: ${experienceText}. Habilidades: ${inst.skills.join(', ')}. Cursos que dicta: ${inst.courses.join(', ')}.`
    });
  });

  // 4. Contact
  chunks.push({
    id: 'contact-info',
    type: 'contact',
    title: 'Información de Contacto',
    text: `Correo: ${contactData.info.email}. Teléfono/WhatsApp: ${contactData.info.phone}. Horario: ${contactData.info.hours}. Ubicación: ${contactData.info.city}.`
  });

  contactData.faqs.forEach((faq, i) => {
    chunks.push({
      id: `faq-${i}`,
      type: 'faq',
      title: `FAQ: ${faq.question}`,
      text: `Pregunta: ${faq.question} Respuesta: ${faq.answer}`
    });
  });

  return chunks;
}
