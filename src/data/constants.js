export const PERSONAL_INFO = {
  name: 'FRANZ KENNEDY AGUILAR CERNA',
  shortName: 'Franz Aguilar',
  role: 'SOFTWARE ENGINEER | FULL STACK DEV',
  bio: 'Ingeniero de Sistemas en formación y Desarrollador Full Stack. Especializado en combinar la lógica de alto rendimiento en backend, arquitecturas escalables y experiencias frontend interactivas con Vue 3, Astro, Flutter, Laravel y Node.js.',
  email: 'franzaguilar28@gmail.com',
  phone: '+51 941 451 076',
  github: 'https://github.com/Fcranz28',
  githubUsername: 'Fcranz28',
  linkedin: 'https://www.linkedin.com/in/franz-kennedy-aguilar-cerna-5ab72226a/',
  profileImage: '/images/profile.jpg',
};

export const HERO_BADGES = ['VUE 3', 'ASTRO', 'NODE.JS', 'FLUTTER', 'PHP / LARAVEL', 'THREE.JS'];

export const NAV_LINKS = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Certificados', href: '#certifications' },
  { name: 'Contacto', href: '#contact' },
];

export const EXPERIENCES = [
  {
    id: 'tecnovedades',
    company: 'Tecnovedades',
    role: 'Desarrollador Full Stack',
    duration: '7 meses',
    modality: 'Híbrido / Completo',
    badgeColor: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    summary: 'Responsable del ciclo de vida completo de desarrollo (Frontend, Backend y Mobile) para múltiples soluciones digitales comerciales y de gestión interna.',
    skills: ['Flutter', 'REST APIs', 'Node.js', 'MySQL', 'CRM', 'E-commerce', 'Payment Gateways'],
    projects: [
      {
        title: 'Desarrollo Móvil Multiplataforma',
        description: 'Diseño, maquetación y desarrollo de aplicaciones móviles en Flutter integradas con APIs RESTful para sincronización de datos en tiempo real.'
      },
      {
        title: 'Sistemas CRM y E-commerce',
        description: 'Arquitectura y construcción integral de sistemas CRM a medida, plataformas de comercio electrónico (E-commerce) y Landing Pages de alta conversión con integración de pasarelas de pago y catálogos dinámicos.'
      },
      {
        title: 'Backend y Bases de Datos',
        description: 'Construcción de endpoints, servicios backend y normalización de bases de datos relacionales asegurando consistencia de datos entre plataformas web y móviles.'
      },
      {
        title: 'Mantenimiento y Despliegue',
        description: 'Soporte correctivo/evolutivo, resolución de incidencias en producción y optimización de tiempos de carga en servidores.'
      }
    ]
  },
  {
    id: 'consigueventas',
    company: 'Grupo Consigue Ventas Inversiones E.I.R.L.',
    shortCompany: 'ConsigueVentas',
    role: 'Responsable del Núcleo de Desarrollo SEO / Desarrollador Web',
    duration: '5 meses',
    modality: 'Remoto',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    summary: 'Liderazgo técnico del área de SEO y desarrollo web, coordinando estrategias para maximizar visibilidad orgánica, rendimiento web (WPO) e indexabilidad en múltiples proyectos corporativos.',
    skills: ['SEO Técnico', 'Core Web Vitals', 'WPO', 'WordPress / Elementor', 'GA4', 'Search Console', 'Schema.org'],
    projects: [
      {
        title: 'Liderazgo Técnico y Desarrollo Web',
        description: 'Coordinación técnica en diseño, personalización y despliegue de sitios en WordPress (Elementor, plantillas dinámicas, CSS/JS personalizado) para marcas como Academia JF, Soy Jhoel Fernández, Contador Abogado y Zona Impecable.'
      },
      {
        title: 'SEO Técnico Avanzado y WPO',
        description: 'Auditorías técnicas, optimización de Core Web Vitals, marcado de datos estructurados (Schema.org), arquitectura de enlazado interno y optimización de rastreabilidad (Crawl Budget).'
      },
      {
        title: 'Analítica Digital',
        description: 'Monitoreo de KPIs de tráfico y comportamiento de usuario mediante Google Analytics 4 (GA4) y Google Search Console, elaborando informes de rendimiento.'
      }
    ]
  },
  {
    id: 'devdatep',
    company: 'Devdatep Consulting',
    role: 'Desarrollador Backend / Full Stack',
    duration: '4 meses',
    modality: 'Remoto',
    badgeColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    summary: 'Especializado en el desarrollo de servicios backend robustos y optimización de bases de datos relacionales para módulos críticos de contratación y selección de personal.',
    skills: ['Backend APIs', 'SQL Stored Procedures', 'Database Tuning', 'Seguridad / RBAC', 'Postman / Bruno', 'Git'],
    projects: [
      {
        title: 'Desarrollo de APIs RESTful',
        description: 'Diseño e implementación de endpoints modulares y seguros para la gestión y seguimiento del flujo de postulaciones de candidatos.'
      },
      {
        title: 'Ingeniería de Bases de Datos',
        description: 'Creación, optimización y depuración de procedimientos almacenados (Stored Procedures) y consultas complejas en bases de datos relacionales, reduciendo tiempos de respuesta y asegurando transacciones seguras.'
      },
      {
        title: 'Seguridad y Reglas de Negocio',
        description: 'Implementación de lógica de negocio para roles, permisos y protección de datos sensibles en procesos de reclutamiento.'
      },
      {
        title: 'Control de Versiones y Pruebas',
        description: 'Documentación y validación de APIs con herramientas de testeo (Bruno/Postman) y flujo de trabajo colaborativo en Git/GitHub.'
      }
    ]
  },
  {
    id: 'promolider',
    company: 'Promolider',
    role: 'Desarrollador Full Stack',
    duration: '2 meses',
    modality: 'Por Proyecto',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    summary: 'Desarrollo end-to-end de una solución digital integral llave en mano, combinando desarrollo web, móvil y auditoría de algoritmos complejos de negocio.',
    skills: ['Full Stack', 'Flutter', 'CRM / E-commerce', 'Algoritmos Complejos', 'Árboles Binarios', 'Comisiones'],
    projects: [
      {
        title: 'Desarrollo Integral del Ecosistema Digital',
        description: 'Implementación de plataforma completa que incluyó CRM administrativo, tienda virtual (E-commerce), Landing Pages y aplicación móvil en Flutter con sincronización de datos centralizada.'
      },
      {
        title: 'Auditoría de Arquitectura y Algoritmos',
        description: 'Revisión y validación técnica de código y de lógica jerárquica (árboles binarios / algoritmos de distribución de puntos y comisiones).'
      },
      {
        title: 'Optimización de Seguridad y Base de Datos',
        description: 'Refactorización de estructuras en bases de datos para soportar concurrencia sin cuellos de botella y aplicación de buenas prácticas de seguridad informática.'
      }
    ]
  }
];

export const EDUCATION = [
  { id: 1, text: 'Universidad Continental - Ingeniero de Sistemas e Informática', color: 'bg-primary' },
  { id: 2, text: 'Universidad Continental - Desarrollo Web Profesional', color: 'bg-secondary' },
  { id: 3, text: 'Universidad Continental - Full Stack Developer', color: 'bg-accent' },
];

export const SKILLS = [
  'Vue 3', 'Astro', 'JavaScript / TypeScript', 'PHP / Laravel', 'Flutter',
  'TailwindCSS', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'Supabase',
  'Three.js / TresJS', 'Docker', 'AWS', 'Git / GitHub', 'SEO Técnico'
];

export const CERTIFICATIONS = [
  {
    title: 'Desarrollo Web Profesional',
    issuer: 'Universidad Continental Post-Grado',
    date: '2025',
    file: '/certificates/DesarrolloWeb.pdf',
  },
  {
    title: 'Full Stack Developer',
    issuer: 'Universidad Continental Post-Grado',
    date: '2025',
    file: '/certificates/FullStackPHP.pdf',
  },
];
