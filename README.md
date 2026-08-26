# 🚀 Portafolio Web Personal — Franz Kennedy Aguilar Cerna

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

Portafolio web personal moderno desarrollado con **Astro 5**, arquitectura de **Islas de Vue 3 (Composition API)**, canvas 3D interactivo con **Three.js**, animaciones fluidas con **anime.js**, estado global reactivo con **Nano Stores** y estilos optimizados con **Tailwind CSS v4**.

---

## 🏛️ Arquitectura del Proyecto

El proyecto está diseñado bajo el patrón **Astro Islands Architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                    BaseLayout.astro                         │
│  (Static HTML Shell + View Transitions + SEO + Fonts)       │
├─────────────────────────────────────────────────────────────┤
│  • Navbar.vue              → [Island: client:load]          │
│  • CommandPalette.vue      → [Island: client:load]          │
│  • HeroScene.vue (Three.js)→ [Island: client:only="vue"]    │
│  • Terminal.vue            → [Island: client:visible]       │
│  • Experience.vue          → [Island: client:visible]       │
│  • About.astro             → [Static HTML - 0 JS]           │
│  • Projects.vue            → [Island: client:visible]       │
│  • Certifications.vue      → [Island: client:visible]       │
│  • Contact.astro           → [Static HTML - 0 JS]           │
│  • Footer.astro            → [Static HTML - 0 JS]           │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │
            ┌──────────────────┴──────────────────┐
            │   Nano Stores (Cross-Island State)  │
            │   • $theme (Dark / Light Mode)      │
            │   • $isCommandPaletteOpen (⌘K)     │
            └─────────────────────────────────────┘
```

### Principios Clave
1. **Zero JS por defecto**: Las secciones puramente informativas (`About`, `Contact`, `Footer`) se compilan a HTML plano sin sobrecarga de JavaScript en el cliente.
2. **Hidratación Selectiva**: Los componentes interactivos se hidratan bajo demanda según directivas (`client:visible`, `client:load`, `client:only`).
3. **Estado Desacoplado**: Comunicación entre islas mediante **Nano Stores** (<1 KB) sin necesidad de un Virtual DOM compartido o providers pesados.
4. **Modo Oscuro sin FOUC**: Script inline en el `<head>` que previene el parpadeo de tema durante la carga inicial.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Descripción |
|---|---|---|
| **Framework Core** | **Astro 5.x** | Static Site Generation (SSG) de ultra alto rendimiento y SEO nativo. |
| **Componentes UI** | **Vue 3 (Composition API)** | Reactividad y lógica de interfaz en islas interactivas. |
| **3D & Canvas** | **Three.js** | Escena 3D de partículas reactivas al mouse con geometría flotante en el Hero. |
| **Animaciones** | **anime.js + @vueuse/core** | Composable `useAnime` con limpieza automática de memoria (`onUnmounted`). |
| **Gestión de Estado** | **Nano Stores** | Estado reactivo cross-island para modo claro/oscuro y Command Palette. |
| **Estilos** | **Tailwind CSS v4** | Configuración `@theme`, tema pixel art y soporte completo de modo oscuro. |
| **Iconografía** | **Lucide Icons** | Iconos SVG optimizados e importados dinámicamente. |
| **Backend / Serverless** | **Express.js (Node.js)** | Funciones serverless en `/api` desplegables en Vercel. |

---

## 📁 Estructura de Directorios

```text
Portafolio-Web/
├── api/                           # Funciones Serverless de Backend
│   └── index.js                   # API Express con ES Modules
├── public/                        # Archivos estáticos servidos directamente
│   ├── certificates/              # Certificados en PDF
│   │   ├── DesarrolloWeb.pdf
│   │   └── FullStackPHP.pdf
│   ├── images/                    # Fotos y recursos gráficos
│   │   └── profile.jpg
│   └── favicon.svg                # Favicon pixel art
├── src/                           # Código fuente de la aplicación
│   ├── components/
│   │   ├── layout/                # Componentes estructurales
│   │   │   ├── Navbar.vue         # Barra de navegación con detector de scroll
│   │   │   ├── CommandPalette.vue # Buscador global y accesos rápidos (Cmd+K)
│   │   │   └── Footer.astro       # Pie de página estático
│   │   ├── sections/              # Secciones principales del portafolio
│   │   │   ├── Hero.astro         # Hero principal con escena 3D y terminal
│   │   │   ├── Experience.vue     # Línea de tiempo con acordeón de las 4 empresas
│   │   │   ├── About.astro        # Biografía, formación y habilidades técnicas
│   │   │   ├── Projects.vue       # Repositorios en vivo de GitHub con filtros
│   │   │   ├── Certifications.vue # Visor modal y descarga de certificados
│   │   │   └── Contact.astro      # Canales de contacto directo
│   │   ├── three/                 # Escenas y componentes 3D
│   │   │   └── HeroScene.vue      # Canvas Three.js con partículas interactivas
│   │   └── ui/                    # Componentes UI reutilizables
│   │       ├── PixelBackground.vue# Fondo con partículas flotantes pixeladas
│   │       ├── SectionDivider.astro# Separadores decorativos de sección
│   │       ├── Terminal.vue       # Consola Bash interactiva con comandos
│   │       └── ThemeToggle.vue    # Botón de alternancia de tema claro/oscuro
│   ├── composables/               # Composables de Vue reutilizables
│   │   └── useAnime.ts            # Wrapper seguro de anime.js con auto-cleanup
│   ├── data/                      # Datos y constantes centralizadas
│   │   └── constants.js           # Información personal, experiencia, skills y certs
│   ├── layouts/                   # Layouts globales de Astro
│   │   └── BaseLayout.astro       # Shell HTML, ClientRouter, metadata SEO y anti-FOUC
│   ├── pages/                     # Rutas y páginas de Astro
│   │   └── index.astro            # Página principal ensamblada
│   ├── stores/                    # Nano Stores para estado global
│   │   ├── theme.ts               # Store de tema (light / dark) con persistencia
│   │   └── commandPalette.ts      # Store de apertura/cierre de la paleta
│   └── styles/                    # Estilos modulares
│       ├── base.css               # Import de fuentes, Tailwind v4 y @theme
│       └── components.css         # Estilos pixel-art (pixel-card, pixel-btn)
├── astro.config.mjs               # Configuración de Astro con Vue y Tailwind
├── package.json                   # Dependencias y scripts unificados
├── tsconfig.json                  # Configuración de TypeScript con alias @/*
├── vercel.json                    # Configuración de despliegue en Vercel
└── .gitignore                     # Exclusión de archivos y temporales
```

---

## 💼 Experiencia Profesional Incluida

El portafolio detalla las siguientes 4 experiencias laborales con sus proyectos y funciones clave:

1. **Tecnovedades** (*Desarrollador Full Stack — 7 meses*)
   - Desarrollo móvil en Flutter con APIs RESTful en tiempo real.
   - Construcción de sistemas CRM a medida y plataformas E-commerce con pasarelas de pago.
   - Modelado y normalización de bases de datos relacionales.
   - Soporte correctivo/evolutivo y optimización de servidores en producción.

2. **Grupo Consigue Ventas Inversiones E.I.R.L.** (*Responsable Núcleo SEO / Desarrollador Web — 5 meses*)
   - Liderazgo técnico en desarrollo web con WordPress/Elementor y personalización dinámica.
   - Auditorías de SEO Técnico avanzado, optimización de Core Web Vitals y Crawl Budget.
   - Monitoreo de analítica con Google Analytics 4 y Search Console.

3. **Devdatep Consulting** (*Desarrollador Backend / Full Stack — 4 meses*)
   - Creación de APIs RESTful modulares para procesos de selección y reclutamiento.
   - Desarrollo y optimización de Stored Procedures en SQL con alta concurrencia.
   - Implementación de seguridad y control de acceso basado en roles (RBAC).
   - Documentación y pruebas de endpoints con Bruno/Postman y control de versiones con Git.

4. **Promolider** (*Desarrollador Full Stack — 2 meses por Proyecto*)
   - Desarrollo integral de ecosistema digital (CRM, tienda virtual, Landing Pages y App móvil en Flutter).
   - Auditoría y optimización de algoritmos de árboles binarios y comisiones de negocio.
   - Refactorización de bases de datos para mitigar cuellos de botella.

---

## ✨ Funcionalidades Destacadas

- 🌌 **Hero 3D Interactivo**: Partículas renderizadas con WebGL que reaccionan al cursor y se adaptan a la paleta de colores del tema.
- 💻 **Terminal Bash Simulado**: Permite escribir comandos (`help`, `about`, `exp`, `skills`, `projects`, `contact`, `theme`, `matrix`) con autoscroll hacia las secciones correspondientes.
- ⌨️ **Command Palette (⌘K / Ctrl+K)**: Buscador modal con navegación por teclado para saltar rápidamente a cualquier sección, cambiar de tema o abrir redes sociales.
- 📂 **Proyectos en Tiempo Real**: Consume la API pública de GitHub con filtrado interactivo por lenguajes de programación.
- 📜 **Visor de Certificaciones**: Modal interactivo con previsualización en iframe y descarga directa de certificados PDF.
- 🌓 **Modo Claro / Oscuro**: Sincronizado en `localStorage` mediante Nano Stores y protegido contra parpadeos (FOUC).

---

## 🚀 Guía de Inicio Rápido

### Prerrequisitos
- Node.js 18+ o superior
- Gestor de paquetes `npm` (o `pnpm` / `bun`)

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Fcranz28/Portafolio-Web.git

# Entrar al directorio
cd Portafolio-Web

# Instalar dependencias
npm install
```

### Comandos Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo local de Astro (`http://localhost:4321`). |
| `npm run build` | Compila el sitio estático optimizado para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción generado. |
| `npm run server` | Ejecuta el servidor API Express en `http://localhost:5000`. |

---

## 🌐 Despliegue en Vercel

El proyecto incluye la configuración [`vercel.json`](file:///c:/Users/Franz/Documents/Portafolio-Web/vercel.json) optimizada para desplegar:
- **Frontend estático**: Compilado automáticamente mediante `@vercel/static-build`.
- **API Serverless**: Servida desde `api/index.js` mediante `@vercel/node`.

Al conectar el repositorio a **Vercel**, el build se ejecuta de forma automática con:
- **Framework Preset**: `Astro`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 👨‍💻 Autor

**Franz Kennedy Aguilar Cerna**
- **LinkedIn**: [Franz Aguilar](https://www.linkedin.com/in/franz-kennedy-aguilar-cerna-5ab72226a/)
- **GitHub**: [@Fcranz28](https://github.com/Fcranz28)
- **Email**: [franzaguilar28@gmail.com](mailto:franzaguilar28@gmail.com)
- **Teléfono**: +51 941 451 076