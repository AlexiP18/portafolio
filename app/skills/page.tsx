"use client"

import { useState } from "react"
import { Server, Database, Monitor, X, Mail, MessageSquare, Briefcase, BookOpen, Sparkles, Layers, FolderOpen, ChevronDown, Globe, ShieldCheck, Settings2, Rocket } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

// Mock data for technology details
const techDetails = {
  // Frontend Technologies
  HTML5: {
    years: "3 Años",
    sections: {
      fundamentos: ["Estructura de documentos", "Tags semánticos", "Formularios", "Listas y tablas", "Multimedia"],
      caracteristicasAvanzadas: ["Web Components", "Custom Elements", "Shadow DOM", "Templates", "HTML5 APIs"],
      ecosistema: ["Accesibilidad (ARIA)", "SEO en HTML", "Validadores W3C", "HTML Canvas", "SVG"],
      proyectos: ["Landing pages", "Formularios interactivos", "Plantillas de emails", "Portafolios"],
    },
  },
  CSS: {
    years: "3 Años",
    sections: {
      fundamentos: ["Selectores", "Box Model", "Flexbox", "Grid Layout", "Media Queries"],
      caracteristicasAvanzadas: ["Animaciones", "Transformaciones", "Variables CSS", "Pseudo-elementos", "Pseudo-clases"],
      ecosistema: ["SASS/SCSS", "PostCSS", "CSS Modules", "Styled Components", "BEM Methodology"],
      proyectos: ["Interfaces responsivas", "Animaciones interactivas", "Sistemas de diseño", "Temas dark/light"],
    },
  },
  JavaScript: {
    years: "2.5 Años",
    sections: {
      fundamentos: ["Variables y tipos", "Funciones", "Objetos y Arrays", "DOM Manipulation", "Event Handling"],
      caracteristicasAvanzadas: ["Async/Await", "Promises", "Closures", "ES6+ Features", "Web APIs"],
      ecosistema: ["NPM", "Webpack", "Babel", "ESLint", "Jest"],
      proyectos: ["Validadores de formularios", "Juegos simples", "Aplicaciones SPA", "Consumo de APIs"],
    },
  },
  Angular: {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Componentes", "Templates", "Directivas", "Pipes", "Data Binding"],
      caracteristicasAvanzadas: ["Services", "Dependency Injection", "Routing", "Reactive Forms", "HttpClient"],
      ecosistema: ["NgRx", "Angular Material", "RxJS", "Angular CLI", "Karma/Jasmine"],
      proyectos: ["Dashboard admin", "Aplicaciones empresariales", "Portales corporativos", "E-commerce"],
    },
  },
  React: {
    years: "2 Años",
    sections: {
      fundamentos: ["Componentes", "Props", "Estado", "Hooks básicos", "JSX"],
      caracteristicasAvanzadas: ["Custom Hooks", "Context API", "Memoización", "Renderizado condicional", "Refs"],
      ecosistema: ["React Router", "Redux", "MobX", "React Query", "Styled Components"],
      proyectos: ["E-commerce", "Dashboard admin", "Aplicación de gestión de tareas", "Redes sociales"],
    },
  },
  Bootstrap: {
    years: "2 Años",
    sections: {
      fundamentos: ["Grid System", "Componentes UI", "Utilidades", "Formularios", "Navbar"],
      caracteristicasAvanzadas: ["Personalización con SASS", "Temas", "JavaScript plugins", "Tooltips/Popovers", "Modals"],
      ecosistema: ["Bootstrap Icons", "React-Bootstrap", "NG-Bootstrap", "Bootswatch", "AdminLTE"],
      proyectos: ["Sitios corporativos", "Dashboards", "Tiendas online", "Plantillas administrativas"],
    },
  },
  jQuery: {
    years: "1 Año",
    sections: {
      fundamentos: ["Selectores", "Manipulación DOM", "Eventos", "Efectos", "AJAX"],
      caracteristicasAvanzadas: ["Plugins", "Animaciones personalizadas", "Delegación de eventos", "Encadenamiento", "Callbacks"],
      ecosistema: ["jQuery UI", "jQuery Mobile", "Plugins populares", "Sliders", "Form validation"],
      proyectos: ["Galerías interactivas", "Formularios dinámicos", "Widgets para sitios web", "Carruseles"],
    },
  },
  "Tailwind CSS": {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Utility-first", "Responsive design", "Flexbox", "Grid", "Colors y tipografía"],
      caracteristicasAvanzadas: ["Configuración", "JIT Mode", "Plugins", "Dark Mode", "Animations"],
      ecosistema: ["Headless UI", "Tailwind UI", "DaisyUI", "Twin.macro", "TailwindCSS Forms"],
      proyectos: ["Interfaces modernas", "Landing pages", "Dashboards", "Aplicaciones web"],
    },
  },
  // Backend Technologies
  "Node.js": {
    years: "2 Años",
    sections: {
      fundamentos: ["Módulos", "Event Loop", "NPM", "File System", "HTTP Server"],
      caracteristicasAvanzadas: ["Streams", "Child processes", "Clustering", "Buffers", "Async patterns"],
      ecosistema: ["Express", "Socket.io", "Passport", "Mongoose", "PM2"],
      proyectos: ["APIs RESTful", "Microservicios", "Chat en tiempo real", "CLI tools", "Web scrapers"],
    },
  },
  NestJS: {
    years: "1 Año",
    sections: {
      fundamentos: ["Módulos", "Controladores", "Servicios", "DTOs", "Pipes"],
      caracteristicasAvanzadas: ["Guards", "Interceptors", "Custom decorators", "Exception filters", "Middleware"],
      ecosistema: ["TypeORM", "Swagger", "JWT", "GraphQL", "Microservices"],
      proyectos: ["APIs corporativas", "Gateway APIs", "Sistemas de autenticación", "Backends escalables"],
    },
  },
  "Spring Boot": {
    years: "1.5 Años",
    sections: {
      fundamentos: ["IoC Container", "Beans", "Annotations", "Spring MVC", "JPA"],
      caracteristicasAvanzadas: ["Security", "AOP", "Data JPA", "REST Controllers", "Validation"],
      ecosistema: ["Spring Cloud", "Thymeleaf", "Actuator", "Spring Data", "Lombok"],
      proyectos: ["APIs empresariales", "Sistemas de gestión", "Integraciones", "Microservicios"],
    },
  },
  // Databases
  MongoDB: {
    years: "2 Años",
    sections: {
      fundamentos: ["Documentos", "Colecciones", "CRUD Operations", "Queries", "Indexes"],
      caracteristicasAvanzadas: ["Aggregation Pipeline", "Replica Sets", "Sharding", "Transactions", "Schema Validation"],
      ecosistema: ["Mongoose", "MongoDB Atlas", "MongoDB Compass", "Change Streams", "MongoDB Charts"],
      proyectos: ["Blogs", "E-commerce", "Aplicaciones en tiempo real", "Análisis de datos"],
    },
  },
  "SQL Server": {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Tablas", "Queries", "Joins", "Views", "Stored Procedures"],
      caracteristicasAvanzadas: ["Triggers", "Indexes", "Transactions", "Performance tuning", "Security"],
      ecosistema: ["SSMS", "SSIS", "SSRS", "Azure SQL", "Entity Framework"],
      proyectos: ["Sistemas de gestión empresarial", "Data warehousing", "Reporting", "Aplicaciones .NET"],
    },
  },
  MySQL: {
    years: "2 Años",
    sections: {
      fundamentos: ["Tablas y relaciones", "Queries", "Joins", "Views", "Constraints"],
      caracteristicasAvanzadas: ["Stored Procedures", "Triggers", "Transactions", "Optimización", "Partitioning"],
      ecosistema: ["PHPMyAdmin", "MySQL Workbench", "HeidiSQL", "Sequelize", "TypeORM"],
      proyectos: ["CMS", "Blogs", "Foros", "Aplicaciones web LAMP"],
    },
  },
  PostgreSQL: {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Tablas", "Queries", "Joins", "Constraints", "Schemas"],
      caracteristicasAvanzadas: ["JSON/JSONB", "Funciones", "Triggers", "Views materializadas", "Extensiones"],
      ecosistema: ["pgAdmin", "PostGIS", "Prisma", "Supabase", "TimescaleDB"],
      proyectos: ["Aplicaciones geoespaciales", "Sistemas analíticos", "Backends escalables", "APIs"],
    },
  },
  SQLite: {
    years: "1 Año",
    sections: {
      fundamentos: ["Database creation", "Tablas", "Queries básicas", "Data types", "Foreign keys"],
      caracteristicasAvanzadas: ["Transactions", "Indexes", "Triggers", "Virtual tables", "FTS"],
      ecosistema: ["DB Browser for SQLite", "SQLite Studio", "Mobile integration", "Embedded applications"],
      proyectos: ["Aplicaciones móviles", "Prototipos", "Apps offline", "Herramientas de escritorio"],
    },
  },
  // DevOps & Cloud
  AWS: {
    years: "1.5 Años",
    sections: {
      fundamentos: ["EC2", "S3", "RDS", "Lambda", "IAM"],
      caracteristicasAvanzadas: ["ECS/EKS", "CloudFormation", "API Gateway", "DynamoDB", "CloudWatch"],
      ecosistema: ["AWS CLI", "AWS SDK", "Terraform", "CloudFront", "Elastic Beanstalk"],
      proyectos: ["Aplicaciones serverless", "Sitios estáticos", "Microservicios", "ETL pipelines"],
    },
  },
  "Google Cloud": {
    years: "1 Año",
    sections: {
      fundamentos: ["Compute Engine", "Cloud Storage", "App Engine", "Firebase", "Cloud Functions"],
      caracteristicasAvanzadas: ["GKE", "Cloud SQL", "BigQuery", "Pub/Sub", "IAM"],
      ecosistema: ["gcloud CLI", "Firebase Tools", "Cloud Build", "Cloud Run", "Firestore"],
      proyectos: ["Aplicaciones móviles", "Análisis de datos", "Backends escalables", "PWAs"],
    },
  },
  Azure: {
    years: "1 Año",
    sections: {
      fundamentos: ["Virtual Machines", "App Service", "Azure Functions", "Storage", "SQL Database"],
      caracteristicasAvanzadas: ["AKS", "DevOps", "Logic Apps", "Service Bus", "Cosmos DB"],
      ecosistema: ["Azure CLI", "Azure Portal", ".NET Integration", "Visual Studio Tools", "ARM Templates"],
      proyectos: ["Aplicaciones .NET", "Microservicios", "CI/CD pipelines", "Integraciones empresariales"],
    },
  },
  // Tools
  Git: {
    years: "3 Años",
    sections: {
      fundamentos: ["Init, add, commit", "Branches", "Merge", "Push/Pull", "Clone"],
      caracteristicasAvanzadas: ["Rebase", "Cherry-pick", "Stash", "Hooks", "Submodules"],
      ecosistema: ["GitHub", "GitLab", "Bitbucket", "Git Flow", "Husky"],
      proyectos: ["Control de versiones", "Colaboración en equipo", "Open Source", "CI/CD"],
    },
  },
  GitHub: {
    years: "2.5 Años",
    sections: {
      fundamentos: ["Repositorios", "Issues", "Pull Requests", "Actions", "Pages"],
      caracteristicasAvanzadas: ["GitHub CLI", "Projects", "Wikis", "Codespaces", "Dependabot"],
      ecosistema: ["GitHub Desktop", "Git LFS", "GitHub Marketplace", "OAuth Apps", "GitHub API"],
      proyectos: ["Contribuciones OSS", "Portafolios", "Documentación", "CI/CD"],
    },
  },
  Figma: {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Frames", "Components", "Auto Layout", "Constraints", "Styles"],
      caracteristicasAvanzadas: ["Variants", "Interactive Components", "Variables", "Plugins", "Prototyping"],
      ecosistema: ["Community", "FigJam", "Dev Mode", "Handoff tools", "Design Systems"],
      proyectos: ["UI Kits", "Wireframes", "Mockups", "Prototipos interactivos"],
    },
  },
  // Testing & Others
  Jenkins: {
    years: "1 Año",
    sections: {
      fundamentos: ["Pipelines", "Jobs", "Builds", "Plugins", "Agents"],
      caracteristicasAvanzadas: ["Jenkinsfile", "Shared Libraries", "Parameters", "Credentials", "Notifications"],
      ecosistema: ["Blue Ocean", "Docker integration", "SonarQube", "Artifactory", "Git integration"],
      proyectos: ["CI/CD pipelines", "Automatización de pruebas", "Deployment", "Build management"],
    },
  },
  Grafana: {
    years: "1 Año",
    sections: {
      fundamentos: ["Dashboards", "Panels", "Data sources", "Queries", "Alerting"],
      caracteristicasAvanzadas: ["Variables", "Annotations", "Templating", "Transformations", "Custom Plugins"],
      ecosistema: ["Prometheus", "InfluxDB", "Loki", "Tempo", "Grafana Cloud"],
      proyectos: ["Monitorización de sistemas", "Business analytics", "Observabilidad", "SRE dashboards"],
    },
  },
  "OWASP Top Ten": {
    years: "1 Año",
    sections: {
      fundamentos: ["Injection", "Broken Authentication", "XSS", "CSRF", "Security Misconfigurations"],
      caracteristicasAvanzadas: ["Insecure Deserialization", "Using Components with Known Vulnerabilities", "SSRF", "XML External Entities", "Broken Access Control"],
      ecosistema: ["OWASP ZAP", "Security Headers", "Content Security Policy", "Authentication libraries", "Vulnerability scanners"],
      proyectos: ["Security reviews", "Penetration testing", "Secure coding practices", "Risk assessment"],
    },
  },
  Burpsuite: {
    years: "1 Año",
    sections: {
      fundamentos: ["Proxy", "Repeater", "Intruder", "Scanner", "Target"],
      caracteristicasAvanzadas: ["Sequencer", "Decoder", "Extensions", "Macros", "Session handling"],
      ecosistema: ["Collaborator", "BApp Store", "Jython", "Burp REST API", "JWT handling"],
      proyectos: ["Web app security testing", "API security", "Authentication bypass", "CSRF/XSS testing"],
    },
  },
  // Add any missing technology details as needed
  "Next.js": {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Páginas y rutas", "Data Fetching", "Static Generation", "Server-side Rendering", "Layouts"],
      caracteristicasAvanzadas: ["API Routes", "Middleware", "Optimización de imágenes", "Internacionalización", "Edge Runtime"],
      ecosistema: ["Next Auth", "SWR", "Vercel", "Content Management", "NextUI"],
      proyectos: ["Blog personal", "Plataforma educativa", "Sitio corporativo", "E-commerce"],
    },
  },
  // Frontend - Adding TypeScript
  TypeScript: {
    years: "2 Años",
    sections: {
      fundamentos: ["Tipos básicos", "Interfaces", "Tipos genéricos", "Enums", "Type Assertions"],
      caracteristicasAvanzadas: ["Tipos condicionales", "Mapped types", "Utility Types", "Decoradores", "Namespaces y módulos"],
      ecosistema: ["TSConfig", "ESLint", "ts-node", "TypeScript + React", "TypeScript + Node.js"],
      proyectos: ["API Rest tipadas", "Aplicaciones React/Next.js", "Librerías con tipos", "CLIs"],
    },
  },
  // Backend - Adding Express, Python, FastAPI
  Express: {
    years: "2 Años",
    sections: {
      fundamentos: ["Routing", "Middleware", "Request/Response", "Error handling", "Static files"],
      caracteristicasAvanzadas: ["Custom middleware", "Template engines", "RESTful APIs", "Authentication", "File uploads"],
      ecosistema: ["Express-validator", "Passport.js", "Mongoose", "Multer", "Morgan"],
      proyectos: ["REST APIs", "Aplicaciones MVC", "Microservicios", "Gateway APIs"],
    },
  },
  Python: {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Sintaxis básica", "Estructuras de datos", "Funciones", "Clases y OOP", "Manejo de archivos"],
      caracteristicasAvanzadas: ["Decoradores", "Generadores", "Context Managers", "AsyncIO", "Type Hints"],
      ecosistema: ["Pip/Poetry", "Virtualenv", "Pytest", "Numpy/Pandas", "Django/Flask"],
      proyectos: ["Automatización", "Scraping", "Análisis de datos", "APIs backend"],
    },
  },
  FastAPI: {
    years: "1 Año",
    sections: {
      fundamentos: ["Path operations", "Query parameters", "Request body", "Response models", "Path parameters"],
      caracteristicasAvanzadas: ["Dependency Injection", "Security & Auth", "Middleware", "Background tasks", "WebSockets"],
      ecosistema: ["Pydantic", "SQLAlchemy", "Alembic", "Uvicorn", "Starlette"],
      proyectos: ["APIs de alto rendimiento", "Microservicios", "Aplicaciones asíncronas", "Integración con frontend"],
    },
  },
  // Databases - Adding Firebase
  Firebase: {
    years: "1.5 Años",
    sections: {
      fundamentos: ["Firestore", "Realtime Database", "Authentication", "Storage", "Hosting"],
      caracteristicasAvanzadas: ["Security Rules", "Cloud Functions", "Transactions", "Offline capabilities", "Indexing"],
      ecosistema: ["Firebase CLI", "Firebase Admin SDK", "Firebase Emulators", "Extensions", "Analytics"],
      proyectos: ["Apps en tiempo real", "Autenticación de usuarios", "Aplicaciones móviles", "Serverless backends"],
    },
  },
  // DevOps & Cloud - Adding Docker
  Docker: {
    years: "2 Años",
    sections: {
      fundamentos: ["Imágenes", "Contenedores", "Dockerfile", "Docker Compose", "Volúmenes"],
      caracteristicasAvanzadas: ["Multi-stage builds", "Networking", "Docker Swarm", "Secrets", "Health checks"],
      ecosistema: ["Docker Hub", "Docker Desktop", "Portainer", "Docker Registry", "Kubernetes"],
      proyectos: ["Entornos de desarrollo", "CI/CD pipelines", "Microservicios", "Aplicaciones contenerizadas"],
    },
  },
  // Herramientas - Adding VS Code
  "VS Code": {
    years: "3 Años",
    sections: {
      fundamentos: ["Navegación de código", "Debugging", "Terminal integrado", "Git integration", "Atajos de teclado"],
      caracteristicasAvanzadas: ["Remote Development", "Tasks", "Multi-root workspaces", "Settings sync", "Custom snippets"],
      ecosistema: ["ESLint", "Prettier", "Live Share", "GitLens", "Thunder Client"],
      proyectos: ["Desarrollo web", "Desarrollo fullstack", "Edición remota", "Pair programming"],
    },
  },
  // Testing & Otros - Adding Jest
  Jest: {
    years: "2 Años",
    sections: {
      fundamentos: ["Test suites", "Matchers", "Mocks", "Snapshots", "Setup/Teardown"],
      caracteristicasAvanzadas: ["Custom matchers", "Mock implementations", "Timer mocks", "Manual mocks", "Module mocking"],
      ecosistema: ["Testing Library", "Supertest", "jest-axe", "Jest Extended", "jest-dom"],
      proyectos: ["Unit testing", "Integration testing", "UI component testing", "API testing"],
    },
  },
  // CRM y similares
  WordPress: {
    years: "2 Años",
    sections: {
      fundamentos: ["Posts y Páginas", "Temas básicos", "Plugins", "Gestión de usuarios", "Multimedia"],
      caracteristicasAvanzadas: ["Custom Post Types", "Advanced Custom Fields", "Desarrollo de Temas", "Shortcodes", "WP-CLI"],
      ecosistema: ["WooCommerce", "Elementor", "WPML", "Yoast SEO", "Contact Form 7"],
      proyectos: ["Blogs corporativos", "Tiendas online (WooCommerce)", "Portafolios", "Integraciones con APIs"],
    },
  },
  Shopify: {
    years: "1 Año",
    sections: {
      fundamentos: ["Gestión de productos", "Colecciones", "Descuentos", "Configuración de envíos", "Pagos"],
      caracteristicasAvanzadas: ["Liquid templating", "Desarrollo de temas custom", "Storefront API", "Webhooks", "Metafields"],
      ecosistema: ["Shopify Apps", "Shopify CLI", "Hydrogen", "Polaris", "Shopify Plus"],
      proyectos: ["E-commerce B2C", "Custom storefronts", "Migraciones de tienda", "Integración ERP"],
    },
  },
  Odoo: {
    years: "1 Año",
    sections: {
      fundamentos: ["CRM", "Ventas", "Compras", "Inventario", "Facturación"],
      caracteristicasAvanzadas: ["Personalización de módulos", "Flujos de trabajo", "Reportes avanzados", "Vistas automatizadas", "Gestión de permisos"],
      ecosistema: ["Odoo Apps", "Comunidad Odoo", "Odoo Studio", "eCommerce", "Website Builder"],
      proyectos: ["Implementación ERP", "Gestión comercial integral", "Puntos de venta (POS)", "Facturación electrónica"],
    },
  },
  Astro: {
    years: "1 Año",
    sections: {
      fundamentos: ["Islas de componentes", "Ruteo basado en archivos", "SSR/SSG", "Markdown", "Integraciones"],
      caracteristicasAvanzadas: ["Astro Content Collections", "Server Endpoints", "View Transitions", "Optimización de assets", "Adaptadores"],
      ecosistema: ["Tailwind", "React/Vue/Svelte integrations", "Vercel/Netlify adapters", "Image optimization", "Partytown"],
      proyectos: ["Landing pages", "Sitios corporativos", "Blogs de alto rendimiento", "Portafolios modernos"],
    },
  },
  "Java (Spring Boot)": {
    years: "1.5 Años",
    sections: {
      fundamentos: ["POO en Java", "Spring IoC", "Controladores REST", "JPA", "Validaciones"],
      caracteristicasAvanzadas: ["Spring Security", "JWT", "Paginación y filtros", "Microservicios", "Testing"],
      ecosistema: ["Spring Data", "Maven/Gradle", "Lombok", "Swagger/OpenAPI", "Docker"],
      proyectos: ["APIs empresariales", "Sistemas de gestión", "Integraciones con frontend", "Backends escalables"],
    },
  },
  PHP: {
    years: "2 Años",
    sections: {
      fundamentos: ["Sintaxis", "Variables y funciones", "POO", "Manejo de formularios", "Conexión a BD"],
      caracteristicasAvanzadas: ["Composer", "Namespaces", "Middlewares", "Patrones MVC", "Seguridad básica"],
      ecosistema: ["Laravel", "WordPress", "PHP-FPM", "MySQL", "Apache/Nginx"],
      proyectos: ["Sitios corporativos", "Módulos CMS", "Backends web", "Automatización de procesos"],
    },
  },
  CSS3: {
    years: "3 Años",
    sections: {
      fundamentos: ["Selectores", "Box Model", "Flexbox", "Grid", "Responsive Design"],
      caracteristicasAvanzadas: ["Animaciones", "Transiciones", "Variables CSS", "Pseudo-elementos", "Media queries complejas"],
      ecosistema: ["SASS", "PostCSS", "BEM", "Autoprefixer", "Design tokens"],
      proyectos: ["Interfaces responsivas", "Sistemas de diseño", "Animaciones UI", "Dashboards"],
    },
  },
  "JavaScript (ES6+)": {
    years: "2.5 Años",
    sections: {
      fundamentos: ["Tipos y estructuras", "Funciones", "DOM", "Eventos", "Módulos"],
      caracteristicasAvanzadas: ["Async/Await", "Promises", "Closures", "Destructuring", "Fetch API"],
      ecosistema: ["NPM", "Babel", "ESLint", "Jest", "Vite/Webpack"],
      proyectos: ["Apps SPA", "Consumo de APIs", "Automatizaciones", "Componentes interactivos"],
    },
  },
  WooCommerce: {
    years: "1 Año",
    sections: {
      fundamentos: ["Productos", "Carrito y checkout", "Métodos de pago", "Pedidos", "Inventario"],
      caracteristicasAvanzadas: ["Hooks y filtros", "Plantillas custom", "Shortcodes", "Cupones avanzados", "Impuestos y envíos"],
      ecosistema: ["WordPress", "Elementor", "Pasarelas de pago", "Plugins de marketing", "Analytics"],
      proyectos: ["Tiendas online", "Catálogos B2C", "Integración con ERP", "Optimización de conversiones"],
    },
  },
  BrowserStack: {
    years: "1 Año",
    sections: {
      fundamentos: ["Pruebas cross-browser", "Pruebas en dispositivos reales", "Capturas y reportes", "Sesiones remotas", "Debug visual"],
      caracteristicasAvanzadas: ["Automate", "Percy visual testing", "Integración CI", "Paralelización", "Network logs"],
      ecosistema: ["Selenium", "Cypress", "Playwright", "GitHub Actions", "Jira"],
      proyectos: ["QA de frontends", "Validación multi-dispositivo", "Regresión visual", "Release checks"],
    },
  },
  "Katalon Studio": {
    years: "1 Año",
    sections: {
      fundamentos: ["Test cases", "Object Repository", "Test suites", "Web testing", "API testing"],
      caracteristicasAvanzadas: ["Data-driven testing", "Keywords custom", "Parallel execution", "BDD", "Reporting"],
      ecosistema: ["Selenium engine", "Jenkins", "Git", "Katalon TestOps", "Integración CI/CD"],
      proyectos: ["Automatización QA", "Pruebas funcionales", "Pruebas de APIs", "Regression suites"],
    },
  },
  "Burp Suite": {
    years: "1 Año",
    sections: {
      fundamentos: ["Proxy", "Repeater", "Intruder", "Scanner", "Target"],
      caracteristicasAvanzadas: ["Sequencer", "Decoder", "Extensions", "Macros", "Session handling"],
      ecosistema: ["OWASP", "BApp Store", "Jython", "REST API", "JWT analysis"],
      proyectos: ["Pruebas de seguridad web", "Seguridad de APIs", "Validación de autenticación", "Hardening"],
    },
  },
  "Google Cloud Platform (GCP)": {
    years: "1 Año",
    sections: {
      fundamentos: ["Compute Engine", "Cloud Storage", "Cloud Functions", "Cloud Run", "IAM"],
      caracteristicasAvanzadas: ["GKE", "BigQuery", "Pub/Sub", "Cloud SQL", "Monitoring"],
      ecosistema: ["gcloud CLI", "Firebase", "Cloud Build", "Artifact Registry", "Service Accounts"],
      proyectos: ["Backends escalables", "Deploy de apps web", "Pipelines cloud", "Análisis de datos"],
    },
  },
  "GitHub Actions (CI/CD)": {
    years: "1 Año",
    sections: {
      fundamentos: ["Workflows", "Jobs", "Runners", "Triggers", "Artifacts"],
      caracteristicasAvanzadas: ["Matrix builds", "Reusable workflows", "Secrets", "Caching", "Environments"],
      ecosistema: ["GitHub", "Docker", "Vercel", "Azure", "BrowserStack"],
      proyectos: ["CI pipelines", "Automatización de despliegues", "Quality gates", "Release automation"],
    },
  },
  cPanel: {
    years: "1 Año",
    sections: {
      fundamentos: ["Gestión de dominios", "File Manager", "Cuentas de correo", "Bases de datos", "SSL"],
      caracteristicasAvanzadas: ["Cron jobs", "Subdominios", "Backups", "DNS Zone Editor", "Redirects"],
      ecosistema: ["Apache/Nginx", "PHP", "MySQL", "Softaculous", "Email services"],
      proyectos: ["Administración de hosting", "Despliegue de sitios", "Mantenimiento web", "Soporte técnico"],
    },
  },
  Notion: {
    years: "1 Año",
    sections: {
      fundamentos: ["Páginas y bloques", "Bases de datos", "Templates", "Kanban", "Calendario"],
      caracteristicasAvanzadas: ["Automations", "Relaciones", "Rollups", "Integraciones", "Wikis de equipo"],
      ecosistema: ["API de Notion", "Zapier", "Slack", "GitHub", "Google Calendar"],
      proyectos: ["Gestión de proyectos", "Documentación técnica", "Roadmaps", "Knowledge base"],
    },
  },
  Asana: {
    years: "1 Año",
    sections: {
      fundamentos: ["Proyectos", "Tareas", "Subtareas", "Timeline", "Assignations"],
      caracteristicasAvanzadas: ["Reglas", "Portfolios", "Workload", "Custom fields", "Dependencias"],
      ecosistema: ["Slack", "Google Workspace", "GitHub", "Zapier", "Calendarios"],
      proyectos: ["Seguimiento de entregables", "Planificación de sprints", "Coordinación de equipos", "PM operativo"],
    },
  },
  "Linux (Ubuntu, CentOS, Pop!_OS)": {
    years: "2 Años",
    sections: {
      fundamentos: ["Terminal", "Permisos", "Gestión de paquetes", "Servicios", "Redes básicas"],
      caracteristicasAvanzadas: ["Shell scripting", "Systemd", "SSH", "Logs y monitoreo", "Hardening básico"],
      ecosistema: ["Ubuntu", "CentOS", "Pop!_OS", "Nginx/Apache", "Docker"],
      proyectos: ["Configuración de entornos", "Deploy de aplicaciones", "Automatización operativa", "Soporte de servidores"],
    },
  },
  "IntelliJ IDEA": {
    years: "1 Año",
    sections: {
      fundamentos: ["Navegación de código", "Refactorización", "Debugging", "Maven/Gradle", "Atajos"],
      caracteristicasAvanzadas: ["Inspecciones", "Profiling", "Integración Git", "Plugins", "Run configurations"],
      ecosistema: ["Java", "Spring Boot", "Kotlin", "JUnit", "Docker"],
      proyectos: ["APIs Java", "Backends empresariales", "Mantenimiento de código", "Productividad de desarrollo"],
    },
  },
  "Apache NetBeans": {
    years: "1 Año",
    sections: {
      fundamentos: ["Proyectos Java", "Depuración", "GUI Builder", "Ant/Maven", "Editor integrado"],
      caracteristicasAvanzadas: ["Profiler", "Integración con servidores", "Refactoring", "Plugins", "Templates"],
      ecosistema: ["Java", "PHP", "Git", "Tomcat/GlassFish", "Maven"],
      proyectos: ["Aplicaciones de escritorio", "Proyectos académicos", "Backends Java", "Mantenimiento legacy"],
    },
  },
  Antigravity: {
    years: "1 Año",
    sections: {
      fundamentos: ["Entorno de trabajo", "Flujo de desarrollo", "Configuración inicial", "Atajos", "Organización de proyectos"],
      caracteristicasAvanzadas: ["Personalización", "Integraciones", "Automatizaciones", "Plantillas", "Optimización de productividad"],
      ecosistema: ["IDEs", "Control de versiones", "Herramientas de QA", "Gestión de tareas", "Documentación"],
      proyectos: ["Prototipos rápidos", "Soporte de desarrollo", "Mejora de flujo técnico", "Trabajo colaborativo"],
    },
  },
}

const skillsData = {
  frontend: {
    title: "Frontend",
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    bgColor: "bg-blue-400/10",
    icon: Monitor,
    description:
      "Desarrollo frontend moderno con enfoque en rendimiento, arquitectura escalable y experiencia de usuario.",
    technologies: [
      {
        name: "Angular",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" className="w-12 h-12" alt="Angular" />,
      },
      {
        name: "Astro",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg" className="w-12 h-12" alt="Astro" />,
      },
      {
        name: "TypeScript",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className="w-12 h-12" alt="TypeScript" />,
      },
      {
        name: "JavaScript (ES6+)",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-12 h-12" alt="JavaScript" />,
      },
      {
        name: "HTML5",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-12 h-12" alt="HTML5" />,
      },
      {
        name: "CSS3",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-12 h-12" alt="CSS3" />,
      },
    ],
  },
  backend: {
    title: "Backend",
    color: "text-green-400",
    borderColor: "border-green-400/30",
    bgColor: "bg-green-400/10",
    icon: Server,
    description:
      "Desarrollo backend orientado a APIs y lógica de negocio con foco en robustez y mantenibilidad.",
    technologies: [
      {
        name: "Java (Spring Boot)",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" className="w-12 h-12" alt="Spring Boot" />,
      },
      {
        name: "PHP",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" className="w-12 h-12" alt="PHP" />,
      },
    ],
  },
  database: {
    title: "Bases de Datos",
    color: "text-purple-400",
    borderColor: "border-purple-400/30",
    bgColor: "bg-purple-400/10",
    icon: Database,
    description:
      "Persistencia de datos en motores relacionales y NoSQL con diseño y optimización para producción.",
    technologies: [
      {
        name: "PostgreSQL",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" className="w-12 h-12" alt="PostgreSQL" />,
      },
      {
        name: "MySQL",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-12 h-12" alt="MySQL" />,
      },
      {
        name: "SQL Server",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" className="w-12 h-12" alt="SQL Server" />,
      },
      {
        name: "Firebase",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" className="w-12 h-12" alt="Firebase" />,
      },
    ],
  },
}

const additionalSkills = {
  title: "Más Skills...",
  description: "Otras tecnologías y herramientas que complementan mi stack de desarrollo",
  categories: [
    {
      name: "Plataformas & CMS",
      icon: Globe,
      technologies: [
        {
          name: "WordPress",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" className="w-12 h-12" alt="WordPress" />,
        },
        {
          name: "WooCommerce",
          icon: <img src="https://cdn.simpleicons.org/woocommerce/96588A" className="w-12 h-12" alt="WooCommerce" />,
        },
      ],
    },
    {
      name: "Calidad, Seguridad & Testing",
      icon: ShieldCheck,
      technologies: [
        {
          name: "BrowserStack",
          icon: (
            <div
              className="w-12 h-12 rounded-xl bg-[#FF7139] text-white flex items-center justify-center font-bold text-[11px] tracking-wide shadow-sm"
              aria-label="BrowserStack"
              title="BrowserStack"
            >
              BS
            </div>
          ),
        },
        {
          name: "Katalon Studio",
          icon: (
            <svg
              viewBox="0 0 48 48"
              className="w-12 h-12"
              role="img"
              aria-label="Katalon Studio"
            >
              <defs>
                <linearGradient id="katalonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B4AE2" />
                  <stop offset="100%" stopColor="#8A6BFF" />
                </linearGradient>
              </defs>
              <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#katalonGradient)" />
              <path
                d="M16 14h7L31 22v12h-7l-8-8V14Zm7 6h-2v6h2l3 3h2v-4l-5-5Z"
                fill="white"
              />
            </svg>
          ),
        },
        {
          name: "Burp Suite",
          icon: <img src="https://cdn.simpleicons.org/burpsuite/FF6633" className="w-12 h-12" alt="Burp Suite" />,
        },
      ],
    },
    {
      name: "Infraestructura, Cloud & DevOps",
      icon: Server,
      technologies: [
        {
          name: "Azure",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" className="w-12 h-12" alt="Azure" />,
        },
        {
          name: "Google Cloud Platform (GCP)",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" className="w-12 h-12" alt="Google Cloud Platform" />,
        },
        {
          name: "Git",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" className="w-12 h-12" alt="Git" />,
        },
        {
          name: "GitHub",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-12 h-12" alt="GitHub" />,
        },
        {
          name: "GitHub Actions (CI/CD)",
          icon: <img src="https://cdn.simpleicons.org/githubactions/2088FF" className="w-12 h-12" alt="GitHub Actions" />,
        },
        {
          name: "cPanel",
          icon: <img src="https://cdn.simpleicons.org/cpanel/FF6C2C" className="w-12 h-12" alt="cPanel" />,
        },
      ],
    },
    {
      name: "Diseño, Gestión & Entornos",
      icon: Settings2,
      technologies: [
        {
          name: "Figma",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" className="w-12 h-12" alt="Figma" />,
        },
        {
          name: "Notion",
          icon: <img src="https://cdn.simpleicons.org/notion/000000" className="w-12 h-12" alt="Notion" />,
        },
        {
          name: "Asana",
          icon: <img src="https://cdn.simpleicons.org/asana/F06A6A" className="w-12 h-12" alt="Asana" />,
        },
        {
          name: "Linux (Ubuntu, CentOS, Pop!_OS)",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" className="w-12 h-12" alt="Linux" />,
        },
        {
          name: "IntelliJ IDEA",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" className="w-12 h-12" alt="IntelliJ IDEA" />,
        },
        {
          name: "VS Code",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" className="w-12 h-12" alt="VS Code" />,
        },
        {
          name: "Apache NetBeans",
          icon: <img src="https://cdn.simpleicons.org/apachenetbeanside/1B6AC6" className="w-12 h-12" alt="Apache NetBeans" />,
        },
        {
          name: "Antigravity",
          icon: <Rocket className="w-12 h-12 text-slate-700" />,
        },
      ],
    },
  ],
}

export default function Skills() {
  const { language } = useLanguage()
  const [selectedTech, setSelectedTech] = useState<keyof typeof techDetails | null>(null)
  const [activeSections, setActiveSections] = useState({
    fundamentos: true,
    caracteristicasAvanzadas: false,
    ecosistema: false,
    proyectos: false,
  })

  const handleTechClick = (techName: string) => {
    setSelectedTech(techName as keyof typeof techDetails)
  }

  const handleCloseModal = () => {
    setSelectedTech(null)
  }

  const toggleSection = (section: keyof typeof activeSections) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Define tech item interface
  interface TechItem {
    name: string;
    icon: React.ReactNode;
  }

  // Function to render technology items with click handler
  const renderTechItem = (tech: TechItem) => (
    <div
      key={tech.name}
      className="relative flex justify-center items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group/tech cursor-pointer"
      onClick={() => handleTechClick(tech.name)}
    >
      <div className="transform group-hover:scale-110 transition-transform duration-200">{tech.icon}</div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {tech.name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )

  const selectedTechIcon =
    selectedTech
      ? Object.values(skillsData)
          .flatMap((category) => category.technologies)
          .concat(...additionalSkills.categories.flatMap((cat) => cat.technologies))
          .find((tech) => tech.name === selectedTech)?.icon
      : null

  const pageText = {
    title: language === "en" ? "Technical Skills" : "Skills Técnicas",
    subtitle:
      language === "en"
        ? "Technologies and tools I use to build complete digital solutions"
        : "Tecnologías y herramientas que domino para crear soluciones digitales completas",
    additionalSkillsTitle: language === "en" ? "More Skills..." : "Más Skills...",
    additionalSkillsDescription:
      language === "en"
        ? "Other technologies and tools that complement my development stack"
        : "Otras tecnologías y herramientas que complementan mi stack de desarrollo",
    modalDetail: language === "en" ? "Technical experience details" : "Detalle de experiencia técnica",
    fundamentals: language === "en" ? "Fundamentals" : "Fundamentos",
    advanced: language === "en" ? "Advanced Features" : "Características Avanzadas",
    ecosystem: language === "en" ? "Ecosystem and Tools" : "Ecosistema y otras herramientas",
    projects: language === "en" ? "Projects and Practical Apps" : "Proyecto y Aplicaciones prácticas",
    noInfo: language === "en" ? "Information not available" : "Información no disponible",
    questions: language === "en" ? "Do you have questions about this technology?" : "¿Tienes dudas sobre esta tecnología?",
    contactMe: language === "en" ? "Contact me" : "Contáctame",
    year: language === "en" ? "Year" : "Año",
    years: language === "en" ? "Years" : "Años",
  }

  const categoryTitleMap: Record<string, { en: string; es: string }> = {
    frontend: {
      en: "Frontend",
      es: "Frontend",
    },
    backend: {
      en: "Backend",
      es: "Backend",
    },
    database: {
      en: "Databases",
      es: "Bases de Datos",
    },
  }

  const categoryDescriptionMap: Record<string, { en: string; es: string }> = {
    frontend: {
      en: "Core frontend stack focused on Angular, Astro, TypeScript, JavaScript (ES6+), HTML5, and CSS3.",
      es: "Stack core de frontend enfocado en Angular, Astro, TypeScript, JavaScript (ES6+), HTML5 y CSS3.",
    },
    backend: {
      en: "Backend development with Java (Spring Boot) and PHP for APIs and business logic.",
      es: "Desarrollo backend con Java (Spring Boot) y PHP para APIs y lógica de negocio.",
    },
    database: {
      en: "Data persistence with PostgreSQL, MySQL, SQL Server, and Firebase.",
      es: "Persistencia de datos con PostgreSQL, MySQL, SQL Server y Firebase.",
    },
  }

  const additionalCategoryNameMap: Record<string, { en: string; es: string }> = {
    "Plataformas & CMS": { en: "Platforms & CMS", es: "Plataformas & CMS" },
    "Calidad, Seguridad & Testing": { en: "Quality, Security & Testing", es: "Calidad, Seguridad & Testing" },
    "Infraestructura, Cloud & DevOps": { en: "Infrastructure, Cloud & DevOps", es: "Infraestructura, Cloud & DevOps" },
    "Diseño, Gestión & Entornos": { en: "Design, Management & Environments", es: "Diseño, Gestión & Entornos" },
  }

  const formatYears = (value: string) => {
    if (language === "es") return value

    const normalized = value.trim()
    if (normalized.endsWith("Año")) {
      return normalized.replace(/Año$/, pageText.year)
    }
    if (normalized.endsWith("Años")) {
      return normalized.replace(/Años$/, pageText.years)
    }

    return normalized
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{pageText.title}</h1>
        <p className="text-gray-600">{pageText.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {Object.entries(skillsData).map(([key, category]) => {
          const IconComponent = category.icon
          return (
            <div
              key={key}
              className={`bg-white rounded-lg shadow-sm border-2 ${category.borderColor} p-6 ${category.bgColor}`}
            >
              {/* Header */}
	              <div className="flex items-center mb-4">
	                <div className={`p-3 rounded-lg ${category.bgColor} mr-4`}>
	                  <IconComponent className={`w-6 h-6 ${category.color}`} />
	                </div>
	                <h2 className={`text-xl font-semibold ${category.color}`}>{categoryTitleMap[key]?.[language] ?? category.title}</h2>
	              </div>

	              {/* Description */}
	              <p className="text-gray-600 text-sm mb-6">{categoryDescriptionMap[key]?.[language] ?? category.description}</p>

              {/* Technologies Grid - Solo iconos */}
              <div className="grid grid-cols-3 gap-4">
                {category.technologies.map((tech) => renderTechItem(tech))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Sección adicional que ocupa todo el ancho */}
      <div className="mt-10 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 shadow-sm p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{pageText.additionalSkillsTitle}</h2>
          <p className="text-gray-600">{pageText.additionalSkillsDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {additionalSkills.categories.map((category) => {
            const CategoryIcon = category.icon

            return (
              <div key={category.name} className="rounded-xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-800 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <CategoryIcon className="w-4 h-4" />
                  </span>
                  <span>{additionalCategoryNameMap[category.name]?.[language] ?? category.name}</span>
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {category.technologies.map((tech) => renderTechItem(tech))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Technology Experience Modal */}
      {selectedTech && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center shrink-0">
                  {selectedTechIcon || <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>}
                </div>
	                <div className="min-w-0">
	                  <h2 className="text-2xl font-bold text-gray-900 truncate">{selectedTech}</h2>
	                  <p className="text-sm text-gray-500">{pageText.modalDetail}</p>
	                </div>
	              </div>

              <div className="flex items-center gap-3">
	                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-white text-xs font-semibold">
	                  <Briefcase className="w-3.5 h-3.5" />
	                  <span>{formatYears(techDetails[selectedTech!].years || `1 ${pageText.year}`)}</span>
	                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body - Accordion sections */}
            <div className="overflow-y-auto flex-1 p-4 bg-white space-y-3">
              {/* Fundamentos */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection("fundamentos")}
                >
	                  <span className="font-medium text-gray-800 flex items-center gap-2">
	                    <BookOpen className="w-4 h-4 text-teal-600" />
	                    {pageText.fundamentals}
	                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeSections.fundamentos ? "rotate-180" : ""}`}
                  />
                </button>
                {activeSections.fundamentos && (
                  <div className="px-4 pb-4">
	                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
	                      {techDetails[selectedTech]?.sections.fundamentos.map((item, index) => (
	                        <li key={index}>{item}</li>
	                      )) || <li>{pageText.noInfo}</li>}
	                    </ul>
	                  </div>
	                )}
	              </div>

              {/* Características Avanzadas */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection("caracteristicasAvanzadas")}
                >
	                  <span className="font-medium text-gray-800 flex items-center gap-2">
	                    <Sparkles className="w-4 h-4 text-violet-600" />
	                    {pageText.advanced}
	                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeSections.caracteristicasAvanzadas ? "rotate-180" : ""}`}
                  />
                </button>
                {activeSections.caracteristicasAvanzadas && (
                  <div className="px-4 pb-4">
	                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
	                      {techDetails[selectedTech]?.sections.caracteristicasAvanzadas.map((item, index) => (
	                        <li key={index}>{item}</li>
	                      )) || <li>{pageText.noInfo}</li>}
	                    </ul>
	                  </div>
	                )}
	              </div>

              {/* Ecosistema y otras herramientas */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection("ecosistema")}
                >
	                  <span className="font-medium text-gray-800 flex items-center gap-2">
	                    <Layers className="w-4 h-4 text-blue-600" />
	                    {pageText.ecosystem}
	                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeSections.ecosistema ? "rotate-180" : ""}`}
                  />
                </button>
                {activeSections.ecosistema && (
                  <div className="px-4 pb-4">
	                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
	                      {techDetails[selectedTech]?.sections.ecosistema.map((item, index) => (
	                        <li key={index}>{item}</li>
	                      )) || <li>{pageText.noInfo}</li>}
	                    </ul>
	                  </div>
	                )}
	              </div>

              {/* Proyecto y Aplicaciones prácticas */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-4 py-3.5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection("proyectos")}
                >
	                  <span className="font-medium text-gray-800 flex items-center gap-2">
	                    <FolderOpen className="w-4 h-4 text-orange-600" />
	                    {pageText.projects}
	                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeSections.proyectos ? "rotate-180" : ""}`}
                  />
                </button>
                {activeSections.proyectos && (
                  <div className="px-4 pb-4">
	                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
	                      {techDetails[selectedTech]?.sections.proyectos.map((item, index) => (
	                        <li key={index}>{item}</li>
	                      )) || <li>{pageText.noInfo}</li>}
	                    </ul>
	                  </div>
	                )}
	              </div>
            </div>

            {/* Modal Footer */}
	            <div className="border-t p-4 bg-slate-50 flex items-center justify-between gap-4">
	              <div className="text-gray-600 text-sm flex items-center gap-2">
	                <MessageSquare size={16} className="text-gray-500" />
	                {pageText.questions}
	              </div>
	              <div className="flex items-center space-x-3">
	                <span className="text-sm font-medium">{pageText.contactMe}</span>
                <a
                  href={`https://wa.link/gqwair`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  <MessageSquare size={16} />
                </a>
                <a
                  href={`mailto:joelpstudy10@gmail.com?subject=Consulta sobre ${selectedTech}`}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
