export const PERSONAL_INFO = {
  name: 'FRANZ KENNEDY AGUILAR CERNA',
  shortName: 'Franz Aguilar',
  role: 'SOFTWARE ENGINEER | FULL STACK DEV',
  bio: 'Ingeniero de Sistemas en formación y Desarrollador Full Stack. Especializado en combinar la lógica de alto rendimiento en backend, arquitecturas escalables y experiencias frontend interactivas con Vue 3, Astro, Flutter, Laravel y Node.js.',
  email: 'franzaguilar28@gmail.com',
  phone: '+51 941 451 076',
  github: 'https://github.com/Fcranz28',
  githubUsername: 'Fcranz28',
  linkedin: 'https://www.linkedin.com/in/franz-aguilar/',
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
    id: 'consigueventas', company: 'Agencia Online Consigue Ventas',
    role: 'Desarrollador Full Stack', duration: '8 meses', period: 'Febrero — actualidad',
    modality: 'Remoto · Jornada completa', current: true,
    summary: 'Desarrollo de aplicaciones web Full Stack con Spring Boot y Angular.',
    skills: ['Spring Boot', 'Angular', 'Full Stack'],
    projects: [
      { title: 'Backend con Spring Boot', description: 'Desarrollo de servicios backend para aplicaciones web.' },
      { title: 'Frontend con Angular', description: 'Desarrollo de interfaces web e integración con el backend.' }
    ]
  },
  {
    id: 'devdatep', company: 'Devdatep Consulting',
    role: 'Desarrollador Back End Junior', duration: '6 meses', period: 'Abril — septiembre',
    modality: 'Remoto · Jornada parcial',
    summary: 'Co-diseño e implementación de una aplicación de escritorio multiplataforma orientada al control de accesos, con Rust y Tauri.',
    skills: ['Rust', 'Tauri', 'Laravel', 'Backend'],
    projects: [
      { title: 'Sistemas nativos', description: 'Desarrollo de una aplicación de escritorio para Linux, Windows y macOS con Rust y Tauri.' },
      { title: 'Control de accesos', description: 'Co-diseño e implementación de funcionalidades para el control estricto de accesos.' }
    ]
  },
  {
    id: 'tecnovedades', company: 'Tecnovedades Web',
    role: 'Desarrollador Full Stack', duration: '7 meses', period: 'Marzo — septiembre',
    modality: 'Remoto · Jornada completa',
    summary: 'Desarrollo frontend, backend y móvil para soluciones digitales comerciales y de gestión interna.',
    skills: ['Flutter', 'REST APIs', 'Node.js', 'MySQL', 'CRM', 'E-commerce'],
    projects: [
      { title: 'Aplicaciones móviles', description: 'Desarrollo de aplicaciones en Flutter integradas con APIs REST.' },
      { title: 'Plataformas web', description: 'Desarrollo de sistemas CRM, comercio electrónico y landing pages con integración de pasarelas de pago.' },
      { title: 'Backend y mantenimiento', description: 'Construcción de servicios backend, bases de datos y soporte de soluciones en producción.' }
    ]
  },
  {
    id: 'promolider', company: 'Promolider',
    role: 'Programador Full Stack', duration: '2 meses', period: 'Julio — agosto',
    modality: 'Remoto · Contrato temporal',
    summary: 'Desarrollo de un ecosistema digital con plataforma web, aplicación móvil y lógica de negocio.',
    skills: ['Full Stack', 'Flutter', 'CRM', 'E-commerce', 'Árboles binarios'],
    projects: [
      { title: 'Ecosistema digital', description: 'Implementación de CRM, tienda virtual, landing pages y aplicación móvil con Flutter.' },
      { title: 'Lógica de negocio', description: 'Revisión de algoritmos de distribución de puntos y comisiones, y de estructuras de bases de datos.' }
    ]
  }
];

export const EDUCATION = [
  { id: 1, text: 'Universidad Continental - Ingeniero de Sistemas e Informática', color: 'bg-primary' },
  { id: 2, text: 'Universidad Continental - Desarrollo Web Profesional', color: 'bg-secondary' },
  { id: 3, text: 'Universidad Continental - Full Stack Developer', color: 'bg-accent' },
];

export const SKILLS = [
  'Spring Boot', 'Angular', 'Rust', 'Tauri', 'Vue 3', 'Astro', 'JavaScript / TypeScript', 'PHP / Laravel', 'Flutter',
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
