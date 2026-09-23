export const coursesData = [
  {
    id: 'fundamentos-ia',
    slug: 'fundamentos-de-inteligencia-artificial',
    title: 'Fundamentos de Inteligencia Artificial',
    level: 'Básico',
    durationHours: 20,
    priceCOP: 189000,
    summary: 'Panorama completo de qué es la IA, cómo evolucionó y dónde se aplica hoy.',
    audience: ['Personas sin experiencia técnica', 'Estudiantes', 'Profesionales curiosos'],
    prerequisites: ['Ninguno'],
    outcomes: ['Distinguir IA, ML y DL', 'Identificar casos de uso', 'Entender riesgos y ética'],
    instructorIds: ['jefred-alarcon'],
    modules: [
      { title: 'Qué es la IA', topics: ['Definiciones', 'Tipos (débil, general, superinteligencia)', 'Historia'] },
      { title: 'Áreas de la IA', topics: ['Visión por computador', 'NLP', 'Robótica', 'Sistemas de recomendación'] },
      { title: 'Datos', topics: ['Tipos', 'Calidad', 'Sesgos', 'Preparación básica'] },
      { title: 'IA en la industria', topics: ['Salud', 'Finanzas', 'Educación', 'Agro', 'Comercio'] },
      { title: 'Ética y regulación', topics: ['Sesgos', 'Privacidad', 'Transparencia', 'IA responsable'] },
      { title: 'Herramientas actuales', topics: ['Asistentes', 'IA generativa', 'Buenas prácticas de uso'] }
    ]
  },
  {
    id: 'intro-ml',
    slug: 'introduccion-a-machine-learning',
    title: 'Introducción a Machine Learning',
    level: 'Básico-Intermedio',
    durationHours: 32,
    priceCOP: 329000,
    summary: 'Primeros modelos de aprendizaje automático con Python y scikit-learn.',
    audience: ['Programadores junior', 'Analistas de datos', 'Estudiantes de ingeniería'],
    prerequisites: ['Lógica de programación básica', 'Nociones de Python'],
    outcomes: ['Entrenar modelos supervisados', 'Evaluar algoritmos', 'Mejorar modelos no supervisados'],
    instructorIds: ['carlos-ml'],
    modules: [
      { title: 'Ciclo de vida', topics: ['Fases de un proyecto de ML'] },
      { title: 'Preparación de datos', topics: ['Limpieza', 'Codificación', 'Escalado', 'Train/test split'] },
      { title: 'Aprendizaje supervisado', topics: ['Regresión lineal y logística', 'k-NN', 'Árboles de decisión'] },
      { title: 'Aprendizaje no supervisado', topics: ['k-means', 'Clustering jerárquico', 'PCA'] },
      { title: 'Evaluación', topics: ['Accuracy, precisión, recall, F1', 'Matriz de confusión', 'Validación cruzada'] },
      { title: 'Sobreajuste y regularización', topics: ['Overfitting', 'Underfitting', 'Técnicas de regularización'] },
      { title: 'Proyecto final', topics: ['Modelo de predicción sobre un dataset real'] }
    ]
  },
  {
    id: 'ml-algoritmos-geneticos',
    slug: 'machine-learning-y-algoritmos-geneticos',
    title: 'Machine Learning y Algoritmos Genéticos',
    level: 'Intermedio',
    durationHours: 36,
    priceCOP: 399000,
    summary: 'ML avanzado combinado con computación evolutiva para optimización y selección de modelos.',
    audience: ['Data Scientists', 'Desarrolladores AI', 'Investigadores'],
    prerequisites: ['Curso Introducción a ML o experiencia equivalente'],
    outcomes: ['Ensambles avanzados', 'Ajuste de hiperparámetros', 'Optimización con algoritmos genéticos'],
    instructorIds: ['carlos-ml'],
    modules: [
      { title: 'Repaso de ML y ensambles', topics: ['Random Forest', 'Gradient Boosting'] },
      { title: 'Fundamentos de computación evolutiva', topics: ['Conceptos biológicos', 'Evolución artificial'] },
      { title: 'Algoritmos genéticos', topics: ['Población, selección, cruce, mutación, elitismo'] },
      { title: 'Funciones de aptitud', topics: ['Fitness', 'Codificación de soluciones'] },
      { title: 'Optimización de hiperparámetros', topics: ['Uso de algoritmos genéticos para tuning'] },
      { title: 'Selección de características', topics: ['Feature selection evolutivo'] },
      { title: 'Problemas clásicos', topics: ['Mochila', 'Agente viajero', 'Planificación'] },
      { title: 'Proyecto final', topics: ['Optimizar modelo ML con GA'] }
    ]
  },
  {
    id: 'deep-learning-fundamentos',
    slug: 'deep-learning-fundamentos',
    title: 'Deep Learning Fundamentos',
    level: 'Intermedio',
    durationHours: 40,
    priceCOP: 459000,
    summary: 'Bases matemáticas y prácticas de las redes neuronales profundas con TensorFlow/Keras o PyTorch.',
    audience: ['Data Scientists', 'Estudiantes avanzados', 'Ingenieros de Software'],
    prerequisites: ['Python', 'Álgebra lineal y cálculo básicos', 'Nociones de ML'],
    outcomes: ['Construir redes neuronales', 'Entrenar arquitecturas profundas', 'Entender el backpropagation'],
    instructorIds: ['jefred-alarcon', 'sofia-dl'],
    modules: [
      { title: 'Bases biológicas', topics: ['De la neurona biológica al perceptrón'] },
      { title: 'Redes multicapa', topics: ['Funciones de activación', 'Propagación hacia adelante'] },
      { title: 'Entrenamiento', topics: ['Función de pérdida', 'Descenso del gradiente', 'Backpropagation'] },
      { title: 'Optimizadores', topics: ['SGD', 'Adam', 'RMSProp', 'Tasa de aprendizaje'] },
      { title: 'Regularización', topics: ['Dropout', 'Early stopping', 'Normalización por lotes'] },
      { title: 'Redes convolucionales (CNN)', topics: ['Filtros', 'Pooling', 'Clasificación de imágenes'] },
      { title: 'Redes recurrentes (RNN)', topics: ['Secuencias', 'Memoria', 'LSTM básicos'] },
      { title: 'Proyecto final', topics: ['Clasificador de imágenes profundo'] }
    ]
  },
  {
    id: 'aplicaciones-deep-learning',
    slug: 'aplicaciones-de-deep-learning',
    title: 'Aplicaciones de Deep Learning',
    level: 'Avanzado',
    durationHours: 44,
    priceCOP: 529000,
    summary: 'Casos reales de deep learning: visión, lenguaje natural y modelos generativos en producción.',
    audience: ['Machine Learning Engineers', 'AI Researchers'],
    prerequisites: ['Curso Deep Learning Fundamentos o experiencia equivalente'],
    outcomes: ['Aplicar Transfer Learning', 'Usar Transformers para NLP', 'Desplegar modelos con MLOps básico'],
    instructorIds: ['sofia-dl'],
    modules: [
      { title: 'Transfer learning', topics: ['Fine-tuning', 'Modelos preentrenados'] },
      { title: 'Visión avanzada', topics: ['Detección de objetos', 'Segmentación semántica'] },
      { title: 'NLP con Transformers', topics: ['Embeddings', 'Clasificación', 'Generación de texto'] },
      { title: 'Modelos de lenguaje', topics: ['LLM', 'Ingeniería de prompts avanzada'] },
      { title: 'Modelos generativos', topics: ['Autoencoders', 'GANs', 'Modelos de difusión'] },
      { title: 'MLOps básico', topics: ['Empaquetado', 'APIs (FastAPI)', 'Despliegue de modelos'] },
      { title: 'Ética en producción', topics: ['Sesgos', 'Evaluación continua', 'Monitoreo'] },
      { title: 'Proyecto final', topics: ['Aplicación end-to-end con Deep Learning'] }
    ]
  }
];
