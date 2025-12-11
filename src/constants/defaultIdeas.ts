interface Idea {
  id: string;
  transcription: string;
  audioUrl?: string;
  audioDuration?: number;
  createdAt: Date;
  category: string;
  aiProcessed: boolean;
  aiAnalysis?: string;
  aiMarkdown?: string;
  aiSuggestions?: string[];
  tags?: string[];
}

export const DEFAULT_IDEAS: Idea[] = [
  {
    id: '1',
    transcription: 'Tengo una idea para una app de meditación que ayude a las personas a relajarse con sesiones guiadas personalizadas. Podría incluir música relajante y seguimiento de progreso.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    audioDuration: 45,
    category: 'salud y bienestar',
    aiProcessed: true,
    aiAnalysis: 'Esta idea tiene potencial en el mercado de wellness. La personalización es clave para diferenciarse.',
    aiMarkdown: `## Propuesta de Valor
Una app de meditación con sesiones personalizadas es un nicho creciente en wellness. La diferenciación está en la personalización basada en el estado emocional y objetivos específicos.

## Potencial de Mercado
- Mercado global de apps de meditación: $2.8B (2023), crecimiento anual 12%
- Target: Millennials y Gen Z con estrés laboral y ansiedad
- Oportunidad: Versión en español para mercado hispanohablante

## Diferenciadores vs Competencia
- **Meditaciones dinámicas** basadas en IA (vs contenido grabado)
- **Integración con wearables** (Apple Watch, Fitbit)
- **Comunidad de meditadores** para accountability
- **Modo offline premium** para usuarios sin conexión

## Competencia Principal
- Calm: Líder global, $160M en ARR
- Insight Timer: Freemium, 15M usuarios activos
- Headspace: $500M en funding
- **Oportunidad**: Enfoque local + personalización IA

## Requisitos Técnicos MVP
- App mobile iOS/Android
- Backend con API de sesiones de meditación
- Integración con APIs de wearables
- Base de datos de usuarios y preferencias

## Plan de Monetización
- Freemium: 5 sesiones/mes gratis
- Premium: $9.99/mes = Acceso ilimitado + comunidad
- B2B: Licencias corporativas para wellness empresarial

## Validación Recomendada
- Entrevistar 20 usuarios potenciales sobre dolor de puntos
- Crear landing page y recopilar 500+ leads
- Prototipo de 10 sesiones de prueba`,
    aiSuggestions: [
      'Considera integrar con wearables para mejor seguimiento',
      'Añade una comunidad para compartir experiencias',
      'Ofrece un modo offline para meditar en cualquier lugar'
    ],
    tags: ['wellness', 'mobile', 'meditación']
  },
  {
    id: '2',
    transcription: 'Blog sobre productividad personal donde comparta técnicas que he aprendido a lo largo de los años. Enfoque en emprendedores y freelancers.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    audioDuration: 62,
    category: 'contenido y marketing',
    aiProcessed: true,
    aiAnalysis: 'Nicho bien definido. El contenido para emprendedores tiene buena demanda.',
    aiSuggestions: [
      'Crea un newsletter semanal',
      'Considera hacer entrevistas a expertos',
      'Monetiza con cursos o coaching'
    ],
    tags: ['contenido', 'productividad', 'blog']
  },
  {
    id: '3',
    transcription: 'Quiero crear un curso de diseño UX para principiantes que no sepan nada de diseño. Que sea práctico con proyectos reales.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    audioDuration: 38,
    category: '',
    aiProcessed: false,
    tags: ['educación', 'diseño', 'ux']
  },
  {
    id: '4',
    transcription: 'Servicio de suscripción mensual de plantas para oficina con mantenimiento incluido. Las empresas pagan y nosotros nos encargamos de todo.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    audioDuration: 52,
    category: 'negocios',
    aiProcessed: true,
    aiAnalysis: 'Modelo de negocio B2B interesante. El mantenimiento recurrente genera ingresos predecibles.',
    aiSuggestions: [
      'Enfócate en oficinas corporativas primero',
      'Ofrece paquetes personalizados según tamaño de oficina',
      'Considera partnership con proveedores de muebles de oficina'
    ],
    tags: ['suscripción', 'b2b', 'plantas']
  },
  {
    id: '5',
    transcription: 'Plataforma para conectar desarrolladores freelance con startups que necesitan MVP rápidos. Con templates y componentes prediseñados.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    audioDuration: 67,
    category: 'tecnología',
    aiProcessed: true,
    aiAnalysis: 'Hay demanda para MVPs rápidos. Los templates pueden acelerar el desarrollo significativamente.',
    aiSuggestions: [
      'Crea un marketplace de templates premium',
      'Sistema de reputación para freelancers',
      'Integra herramientas de gestión de proyectos'
    ],
    tags: ['plataforma', 'freelance', 'mvp']
  },
  {
    id: '6',
    transcription: 'App para ayudar a padres a gestionar actividades extraescolares de sus hijos. Con calendario compartido y recordatorios automáticos.',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    audioDuration: 41,
    category: 'salud y bienestar',
    aiProcessed: true,
    aiAnalysis: 'Problema real para familias ocupadas. La coordinación entre padres es un pain point importante.',
    aiSuggestions: [
      'Permite compartir con otros familiares y cuidadores',
      'Integra pagos de actividades',
      'Añade función de carpool compartido'
    ],
    tags: ['familia', 'organización', 'mobile']
  },
  {
    id: '7',
    transcription: 'Podcast sobre cómo construir negocios secundarios mientras trabajas full-time. Entrevistar a gente que lo ha logrado.',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    audioDuration: 55,
    category: 'contenido y marketing',
    aiProcessed: true,
    aiAnalysis: 'Side hustles son tendencia. Las historias reales generan mucho engagement.',
    aiSuggestions: [
      'Define formato y frecuencia de episodios',
      'Monetiza con sponsors relacionados',
      'Crea comunidad de oyentes en Discord'
    ],
    tags: ['podcast', 'emprendimiento', 'entrevistas']
  },
  {
    id: '8',
    transcription: 'Herramienta de IA que analiza código legacy y sugiere refactorizaciones. Para equipos que tienen deuda técnica.',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    audioDuration: 48,
    category: 'tecnología',
    aiProcessed: true,
    aiAnalysis: 'Deuda técnica es un problema constante. Herramientas de análisis automático tienen valor.',
    aiSuggestions: [
      'Integra con GitHub/GitLab',
      'Genera reportes de priorización',
      'Ofrece estimaciones de tiempo de refactor'
    ],
    tags: ['ia', 'desarrollo', 'saas']
  },
  {
    id: '9',
    transcription: 'Escribí sobre una idea para hacer consultorías de estrategia digital pero no estoy seguro si debería enfocarme en ecommerce o SaaS.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    audioDuration: 34,
    category: '',
    aiProcessed: false,
    tags: ['consultoría', 'estrategia']
  },
  {
    id: '10',
    transcription: 'Kit de herramientas no-code para crear landing pages con IA. El usuario describe su producto y la IA genera todo el contenido y diseño.',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    audioDuration: 59,
    category: 'tecnología',
    aiProcessed: true,
    aiAnalysis: 'No-code + IA es una combinación poderosa. Reduce fricción para lanzar productos.',
    aiSuggestions: [
      'Incluye templates por industria',
      'Sistema de A/B testing integrado',
      'Analytics y optimización de conversión'
    ],
    tags: ['no-code', 'ia', 'landing-pages']
  },
  {
    id: '11',
    transcription: 'Programa de mentoría grupal para nuevos managers. Sesiones semanales con casos prácticos y feedback entre pares.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    audioDuration: 44,
    category: 'educación',
    aiProcessed: true,
    aiAnalysis: 'Hay gap en formación de managers. El formato grupal reduce costo y aumenta networking.',
    aiSuggestions: [
      'Cohorts de 10-15 personas máximo',
      'Crea material de apoyo y casos de estudio',
      'Ofrece certificación al finalizar'
    ],
    tags: ['mentoría', 'management', 'liderazgo']
  },
  {
    id: '12',
    transcription: 'Red social para runners que quieran encontrar compañeros de entrenamiento en su zona. Con niveles y objetivos similares.',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    audioDuration: 28,
    category: '',
    aiProcessed: false,
    tags: ['running', 'social', 'fitness']
  },
  {
    id: '13',
    transcription: 'Aplicación para rastrear hábitos diarios con gamificación. Sistema de racha, logros y desafíos con amigos.',
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    audioDuration: 52,
    category: 'productividad',
    aiProcessed: true,
    aiAnalysis: 'Gamificación es muy efectiva para retención. Hay mercado bien definido para apps de hábitos.',
    aiSuggestions: [
      'Integra con Apple Health y Google Fit',
      'Permite crear hábitos personalizados',
      'Sistema de recompensas con moneda virtual'
    ],
    tags: ['hábitos', 'gamificación', 'mobile']
  },
  {
    id: '14',
    transcription: 'Plataforma marketplace para comprar y vender cursos digitales entre creadores independientes. Modelo de comisión.',
    createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
    audioDuration: 71,
    category: 'educación',
    aiProcessed: true,
    aiAnalysis: 'Demanda creciente de educación digital. Marketplace permite escala sin crear contenido propio.',
    aiSuggestions: [
      'Sistema de reviews y ratings',
      'Herramientas de marketing para creadores',
      'Opciones de suscripción y acceso ilimitado'
    ],
    tags: ['marketplace', 'educación', 'saas']
  },
  {
    id: '15',
    transcription: 'Software para pequeños restaurantes que automatice pedidos, inventario y contabilidad todo en uno.',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    audioDuration: 63,
    category: 'negocios',
    aiProcessed: true,
    aiAnalysis: 'Pequeños restaurantes gastan mucho en múltiples herramientas. Integración es el diferenciador clave.',
    aiSuggestions: [
      'Integra con proveedores de delivery',
      'Reportes financieros automáticos',
      'Sistema de reservas y mesas'
    ],
    tags: ['saas', 'restaurantes', 'automatización']
  },
  {
    id: '16',
    transcription: 'Plataforma de coaching de vida virtual con IA para soporte emocional y consejos personalizados.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    audioDuration: 41,
    category: '',
    aiProcessed: false,
    tags: ['ia', 'coaching', 'salud-mental']
  },
  {
    id: '17',
    transcription: 'Herramienta de análisis de competencia para e-commerce. Monitorea precios, estrategias y cambios de competidores.',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    audioDuration: 58,
    category: 'tecnología',
    aiProcessed: true,
    aiAnalysis: 'E-commerce es muy competitivo. Inteligencia competitiva es crucial para sobrevivir.',
    aiSuggestions: [
      'Alertas automáticas de cambios de precios',
      'Análisis de palabras clave y SEO',
      'Reportes semanales automáticos'
    ],
    tags: ['ecommerce', 'análisis', 'saas']
  },
  {
    id: '18',
    transcription: 'Comunidad en línea de creativos (diseñadores, ilustradores, fotógrafos) para colaborar en proyectos.',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    audioDuration: 35,
    category: '',
    aiProcessed: false,
    tags: ['comunidad', 'creativos', 'colaboración']
  },
  {
    id: '19',
    transcription: 'Sistema de automatización de marketing por email con AI que segmenta y personaliza automáticamente.',
    createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
    audioDuration: 69,
    category: 'contenido y marketing',
    aiProcessed: true,
    aiAnalysis: 'Email marketing sigue siendo ROI alto. Personalización con IA es tendencia 2024.',
    aiSuggestions: [
      'A/B testing automático de asuntos',
      'Predicción de mejor tiempo de envío',
      'Análisis de sentimiento de respuestas'
    ],
    tags: ['email', 'marketing', 'ia']
  },
  {
    id: '20',
    transcription: 'App de recetas que sugiere qué cocinar basado en ingredientes que tienes en casa. Optimiza compras.',
    createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
    audioDuration: 44,
    category: 'salud y bienestar',
    aiProcessed: true,
    aiAnalysis: 'Reducir desperdicios de comida es importante. Hay audiencia de cocineros y familias.',
    aiSuggestions: [
      'Integración con apps de compras',
      'Sugerencias basadas en alergias',
      'Planificador de menús semanal'
    ],
    tags: ['recetas', 'cocina', 'ia']
  },
];
