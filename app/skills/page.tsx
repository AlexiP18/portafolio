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
      fundamentos: [
        "Estructura básica de documentos HTML",
        "Uso de etiquetas semánticas como header, main, section y footer",
        "Creación de formularios simples con inputs, labels y botones",
        "Uso de listas, enlaces, imágenes y tablas básicas",
        "Buenas prácticas iniciales para ordenar contenido en una página",
      ],
      caracteristicasAvanzadas: [
        "Uso básico de atributos aria para mejorar accesibilidad",
        "Incorporación de audio, video e imágenes responsivas",
        "Validación HTML básica en formularios",
        "Uso inicial de meta tags para SEO y responsive design",
        "Integración de SVG o íconos simples dentro de la interfaz",
      ],
      ecosistema: [
        "Uso de VS Code y extensiones para escribir HTML más rápido",
        "Validadores HTML para revisar errores de estructura",
        "Buenas prácticas de accesibilidad con documentación MDN",
        "Integración con CSS y JavaScript en páginas estáticas",
        "Organización de assets como imágenes, íconos y documentos",
      ],
      proyectos: [
        "Landing page básica con secciones informativas",
        "Formulario de contacto con estructura accesible",
        "Página de presentación personal",
        "Maquetación de una página corporativa simple",
        "Plantilla HTML para practicar estructura semántica",
      ],
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
      fundamentos: [
        "Creación de componentes simples y reutilizables",
        "Uso de templates con interpolación y property binding",
        "Manejo básico de eventos con event binding",
        "Uso de directivas comunes como *ngIf y *ngFor",
        "Comunicación básica entre componentes con @Input y @Output",
      ],
      caracteristicasAvanzadas: [
        "Consumo de APIs con HttpClient siguiendo ejemplos guiados",
        "Creación de servicios para separar lógica de los componentes",
        "Uso inicial de rutas y navegación entre páginas",
        "Formularios reactivos básicos con validaciones simples",
        "Manejo inicial de observables y suscripciones con RxJS",
      ],
      ecosistema: [
        "Uso de Angular CLI para crear componentes, servicios y módulos",
        "Aplicación de Angular Material en formularios, botones y tablas",
        "Organización básica por carpetas: components, services y pages",
        "Uso de TypeScript para interfaces y tipado de datos",
        "Depuración con consola, DevTools y mensajes de error del framework",
      ],
      proyectos: [
        "CRUD básico conectado a una API REST",
        "Dashboard simple con cards, tablas y filtros",
        "Formulario de registro con validaciones de campos",
        "Catálogo de productos con listado y detalle",
        "Mini aplicación académica para practicar rutas, servicios y componentes",
      ],
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
      fundamentos: [
        "Creación de tablas con tipos de datos básicos",
        "Consultas SELECT, INSERT, UPDATE y DELETE",
        "Uso de filtros con WHERE y ordenamiento con ORDER BY",
        "Relaciones simples entre tablas con claves primarias y foráneas",
        "Consultas con JOIN en escenarios guiados",
      ],
      caracteristicasAvanzadas: [
        "Creación de vistas simples para consultas frecuentes",
        "Uso básico de procedimientos almacenados",
        "Aplicación inicial de transacciones en operaciones sensibles",
        "Revisión básica de errores en consultas SQL",
        "Uso inicial de índices en campos consultados con frecuencia",
      ],
      ecosistema: [
        "Uso de SQL Server Management Studio para administrar datos",
        "Diseño básico de diagramas de base de datos",
        "Conexión desde aplicaciones .NET o backend académico",
        "Exportación e importación básica de datos",
        "Consulta de documentación para sintaxis y funciones comunes",
      ],
      proyectos: [
        "Base de datos para sistema de reservas",
        "CRUD conectado a una aplicación backend",
        "Consultas para reportes básicos",
        "Modelo relacional para un sistema académico",
        "Práctica de joins entre clientes, pedidos y productos",
      ],
    },
  },
  MySQL: {
    years: "2 Años",
    sections: {
      fundamentos: [
        "Creación de bases de datos y tablas",
        "Consultas CRUD básicas",
        "Relaciones simples con claves primarias y foráneas",
        "Uso de JOIN para unir información de varias tablas",
        "Aplicación de restricciones básicas como NOT NULL y UNIQUE",
      ],
      caracteristicasAvanzadas: [
        "Creación de vistas simples",
        "Uso inicial de procedimientos almacenados",
        "Transacciones básicas para operaciones relacionadas",
        "Revisión de errores comunes en consultas SQL",
        "Organización de scripts para crear o poblar tablas",
      ],
      ecosistema: [
        "Uso de phpMyAdmin para administrar tablas",
        "Uso de MySQL Workbench para modelar y consultar datos",
        "Conexión con PHP, Java o Node.js en proyectos pequeños",
        "Backups y restauración básica de bases de datos",
        "Consulta de documentación para funciones SQL comunes",
      ],
      proyectos: [
        "CRUD de usuarios o productos",
        "Base de datos para tienda simple",
        "Registro de formularios de contacto",
        "Sistema académico básico con estudiantes y cursos",
        "Reportes simples con consultas filtradas",
      ],
    },
  },
  PostgreSQL: {
    years: "1.5 Años",
    sections: {
      fundamentos: [
        "Creación de tablas y columnas con tipos de datos comunes",
        "Consultas SELECT, INSERT, UPDATE y DELETE",
        "Uso de constraints básicos para cuidar la integridad",
        "Relaciones entre tablas con claves foráneas",
        "Consultas con JOIN para unir entidades relacionadas",
      ],
      caracteristicasAvanzadas: [
        "Uso básico de schemas para organizar tablas",
        "Consultas con funciones de agregación como COUNT y SUM",
        "Creación de vistas simples",
        "Uso inicial de JSON/JSONB cuando el modelo lo requiere",
        "Transacciones básicas en operaciones relacionadas",
      ],
      ecosistema: [
        "Uso de pgAdmin para explorar tablas y consultas",
        "Conexión desde backends Java, Node.js o herramientas como Supabase",
        "Uso básico de variables de entorno para credenciales",
        "Backups simples y restauración de datos",
        "Consulta de documentación oficial para tipos y funciones",
      ],
      proyectos: [
        "Base de datos para una API REST",
        "Sistema de gestión con usuarios y roles simples",
        "CRUD de productos, cursos o eventos",
        "Reportes básicos con filtros por fecha o categoría",
        "Práctica de relaciones uno a muchos y muchos a muchos",
      ],
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
      fundamentos: [
        "Navegación básica en Azure Portal",
        "Creación inicial de recursos como App Service o Storage",
        "Comprensión básica de grupos de recursos",
        "Publicación simple de una aplicación web",
        "Revisión de métricas y estado del servicio desde el portal",
      ],
      caracteristicasAvanzadas: [
        "Configuración básica de variables de entorno en App Service",
        "Uso inicial de Azure SQL en proyectos guiados",
        "Revisión de logs para encontrar errores de despliegue",
        "Configuración simple de permisos y accesos",
        "Uso básico de Azure Functions en ejemplos pequeños",
      ],
      ecosistema: [
        "Uso de Azure Portal como herramienta principal",
        "Uso inicial de Azure CLI para comandos sencillos",
        "Integración con GitHub para despliegues básicos",
        "Documentación oficial para crear recursos paso a paso",
        "Relación con .NET, Node.js o aplicaciones frontend",
      ],
      proyectos: [
        "Deploy básico de una aplicación web",
        "Prueba de almacenamiento de archivos en la nube",
        "API sencilla publicada en App Service",
        "Base de datos Azure SQL conectada a backend de práctica",
        "Pipeline simple de despliegue desde GitHub",
      ],
    },
  },
  // Tools
  Git: {
    years: "3 Años",
    sections: {
      fundamentos: [
        "Inicializar repositorios y revisar el estado con git status",
        "Agregar cambios con git add y crear commits descriptivos",
        "Crear y cambiar de ramas para trabajar funcionalidades",
        "Traer y subir cambios con pull y push",
        "Clonar repositorios existentes para trabajar localmente",
      ],
      caracteristicasAvanzadas: [
        "Resolución básica de conflictos de merge",
        "Uso de git stash para guardar cambios temporales",
        "Lectura de historial con git log",
        "Comparación de cambios con git diff",
        "Buenas prácticas para no mezclar cambios no relacionados",
      ],
      ecosistema: [
        "Uso de Git junto a GitHub",
        "Trabajo desde terminal y desde herramientas visuales del editor",
        "Flujo básico de ramas feature y main",
        "Uso de .gitignore para evitar archivos innecesarios",
        "Revisión de cambios antes de hacer commit",
      ],
      proyectos: [
        "Versionado de proyectos personales",
        "Trabajo colaborativo en prácticas académicas",
        "Ramas para nuevas secciones de una web",
        "Control de cambios en portafolios y APIs",
        "Resolución guiada de conflictos simples",
      ],
    },
  },
  GitHub: {
    years: "2.5 Años",
    sections: {
      fundamentos: [
        "Creación y administración básica de repositorios",
        "Subida de proyectos locales a GitHub",
        "Uso de README para documentar proyectos",
        "Revisión de commits, ramas y cambios desde la interfaz",
        "Uso básico de issues para registrar tareas o errores",
      ],
      caracteristicasAvanzadas: [
        "Creación de pull requests para revisar cambios",
        "Uso inicial de GitHub Pages para publicar sitios estáticos",
        "Organización básica de tareas con Projects o issues",
        "Revisión de archivos modificados antes de fusionar cambios",
        "Uso básico de releases o tags cuando el proyecto lo requiere",
      ],
      ecosistema: [
        "Integración con Git desde terminal",
        "Uso de GitHub Desktop o VS Code para flujos simples",
        "Relación con GitHub Actions para automatizaciones básicas",
        "Buenas prácticas de repositorios públicos de portafolio",
        "Uso de Markdown para documentación",
      ],
      proyectos: [
        "Publicación de portafolio personal",
        "Repositorio documentado para proyecto académico",
        "Gestión de tareas de una app pequeña con issues",
        "Colaboración básica mediante pull requests",
        "Hosting de una landing con GitHub Pages",
      ],
    },
  },
  Figma: {
    years: "1.5 Años",
    sections: {
      fundamentos: [
        "Creación de frames para pantallas web y móviles",
        "Uso básico de formas, texto, colores e imágenes",
        "Aplicación inicial de Auto Layout",
        "Organización de capas y grupos",
        "Uso de estilos simples para tipografía y color",
      ],
      caracteristicasAvanzadas: [
        "Creación de componentes reutilizables básicos",
        "Uso inicial de variantes para estados simples",
        "Prototipado de navegación entre pantallas",
        "Exportación de assets para desarrollo",
        "Revisión de medidas y espaciados para maquetación",
      ],
      ecosistema: [
        "Uso de Figma Community para referencias e inspiración",
        "Trabajo colaborativo con comentarios",
        "Uso básico de FigJam para ideas o flujos",
        "Consulta de Dev Mode para pasar diseños a código",
        "Organización de archivos por páginas y secciones",
      ],
      proyectos: [
        "Wireframe de landing page",
        "Mockup de portafolio personal",
        "Diseño básico de dashboard",
        "Prototipo simple de formulario o flujo de login",
        "UI kit pequeño con botones, cards e inputs",
      ],
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
      fundamentos: [
        "Uso de tipos básicos como string, number, boolean y arrays",
        "Creación de interfaces para describir objetos simples",
        "Tipado de props, funciones y respuestas de API",
        "Uso básico de tipos opcionales y union types",
        "Lectura de errores de TypeScript para corregir código",
      ],
      caracteristicasAvanzadas: [
        "Uso inicial de generics en funciones o componentes sencillos",
        "Aplicación básica de utility types como Partial y Pick",
        "Tipado de estados y eventos en componentes frontend",
        "Separación de tipos en archivos reutilizables",
        "Evitar el uso innecesario de any en datos conocidos",
      ],
      ecosistema: [
        "Configuración básica con tsconfig",
        "Uso de TypeScript junto a React, Next.js o Angular",
        "Autocompletado y revisión de tipos en VS Code",
        "Integración con ESLint cuando el proyecto lo requiere",
        "Consulta de documentación para entender errores comunes",
      ],
      proyectos: [
        "Componentes frontend con props tipadas",
        "Consumo de API usando interfaces para la respuesta",
        "Formulario con tipos para los datos enviados",
        "Pequeño dashboard con modelos de datos simples",
        "Refactor básico de JavaScript a TypeScript",
      ],
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
      fundamentos: [
        "Creación de proyectos en Firebase Console",
        "Uso básico de Firestore para guardar y leer documentos",
        "Configuración inicial de Authentication con email o proveedores simples",
        "Subida básica de archivos con Firebase Storage",
        "Publicación inicial de sitios con Firebase Hosting",
      ],
      caracteristicasAvanzadas: [
        "Reglas de seguridad simples para proteger colecciones",
        "Consultas básicas con filtros y ordenamiento",
        "Manejo inicial de estados de autenticación en el frontend",
        "Lectura y escritura en tiempo real en casos sencillos",
        "Organización de colecciones según necesidades del proyecto",
      ],
      ecosistema: [
        "Uso de Firebase SDK en aplicaciones frontend",
        "Configuración de variables de entorno para credenciales públicas",
        "Uso básico de Firebase CLI para deploy",
        "Consulta de logs y paneles desde Firebase Console",
        "Integración con React, Angular o proyectos web simples",
      ],
      proyectos: [
        "Login y registro básico de usuarios",
        "CRUD simple usando Firestore",
        "Formulario que guarda datos en la nube",
        "Galería básica con subida de imágenes",
        "Deploy de una landing o app frontend en Firebase Hosting",
      ],
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
      fundamentos: [
        "Navegación por archivos y carpetas del proyecto",
        "Uso del terminal integrado para ejecutar comandos",
        "Búsqueda de archivos, clases y textos dentro del proyecto",
        "Uso de extensiones básicas para mejorar productividad",
        "Edición de código con autocompletado y formato básico",
      ],
      caracteristicasAvanzadas: [
        "Uso inicial del debugger en JavaScript o TypeScript",
        "Integración básica con Git desde el editor",
        "Configuración simple de settings por proyecto",
        "Uso de snippets o atajos para escribir código repetitivo",
        "Revisión de problemas desde la pestaña Problems",
      ],
      ecosistema: [
        "Extensiones como ESLint, Prettier y GitLens",
        "Uso de Thunder Client o REST Client para probar APIs",
        "Integración con proyectos React, Next.js, Angular o Node",
        "Trabajo con terminal, Git y explorador de archivos en un solo entorno",
        "Consulta de errores y sugerencias del editor para aprender",
      ],
      proyectos: [
        "Desarrollo de portafolio personal",
        "Edición de componentes frontend",
        "Prueba básica de endpoints desde el editor",
        "Resolución de errores señalados por TypeScript o ESLint",
        "Organización de proyectos académicos y personales",
      ],
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
      fundamentos: [
        "Creación y edición de páginas y entradas",
        "Instalación y configuración básica de temas",
        "Uso de plugins comunes para formularios, SEO o seguridad",
        "Gestión básica de menús, widgets y multimedia",
        "Administración simple de usuarios y roles",
      ],
      caracteristicasAvanzadas: [
        "Personalización básica con CSS adicional",
        "Uso inicial de constructores visuales como Elementor",
        "Configuración de formularios de contacto",
        "Optimización básica de imágenes y rendimiento",
        "Mantenimiento inicial de plugins, temas y copias de seguridad",
      ],
      ecosistema: [
        "Uso del panel de administración de WordPress",
        "Integración básica con WooCommerce cuando el sitio lo requiere",
        "Trabajo con hosting y cPanel para gestionar archivos o base de datos",
        "Plugins como Yoast SEO, Contact Form 7 y herramientas de caché",
        "Consulta de documentación y soporte de plugins",
      ],
      proyectos: [
        "Sitio informativo para negocio local",
        "Blog básico con categorías y entradas",
        "Landing page editable desde WordPress",
        "Formulario de contacto para una institución",
        "Ajustes visuales y mantenimiento de sitio existente",
      ],
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
      fundamentos: [
        "Creación de páginas estáticas con archivos .astro",
        "Uso de rutas basadas en la estructura de carpetas",
        "Separación básica entre layouts, páginas y componentes",
        "Renderizado de contenido con props y variables simples",
        "Uso de Markdown para contenido estático como posts o secciones informativas",
      ],
      caracteristicasAvanzadas: [
        "Uso inicial de componentes interactivos con islands architecture",
        "Integración básica de componentes de React dentro de Astro",
        "Creación de layouts reutilizables para mantener consistencia visual",
        "Manejo básico de imágenes y assets dentro del proyecto",
        "Aplicación inicial de View Transitions en navegación simple",
      ],
      ecosistema: [
        "Uso de Astro CLI para crear y ejecutar proyectos",
        "Integración de Tailwind CSS para estilos responsivos",
        "Despliegue básico en Vercel o Netlify",
        "Organización de contenido en carpetas como pages, components y layouts",
        "Uso de documentación oficial para resolver errores y configurar integraciones",
      ],
      proyectos: [
        "Landing page personal o de producto",
        "Portafolio estático con secciones de proyectos y contacto",
        "Blog básico usando archivos Markdown",
        "Sitio corporativo simple con páginas informativas",
        "Página de documentación o presentación para un proyecto académico",
      ],
    },
  },
  Java: {
    years: "2 Años",
    sections: {
      fundamentos: [
        "Programación orientada a objetos (clases, objetos, herencia, encapsulación)",
        "Uso de tipos de datos, condicionales, ciclos y métodos",
        "Manejo básico de colecciones como ArrayList y HashMap",
        "Organización de código en paquetes y clases reutilizables",
        "Lectura y depuración de errores comunes de compilación y ejecución",
      ],
      caracteristicasAvanzadas: [
        "Uso inicial de interfaces y clases abstractas en ejercicios guiados",
        "Manejo básico de excepciones con try-catch",
        "Aplicación de principios básicos de clean code en proyectos académicos",
        "Lectura y escritura simple de archivos para persistencia local",
        "Práctica inicial de estructura por capas para preparar proyectos backend",
      ],
      ecosistema: [
        "Desarrollo con IntelliJ IDEA o NetBeans",
        "Uso de Maven o Gradle para dependencias en proyectos Java",
        "Control de versiones básico con Git y GitHub",
        "Pruebas manuales de lógica con clases de prueba simples",
        "Consulta de documentación oficial de Java y recursos de aprendizaje",
      ],
      proyectos: [
        "Aplicación de consola para gestión de registros simples",
        "Sistema académico básico con operaciones CRUD",
        "Prácticas de POO con entidades y reglas de negocio",
        "Módulo Java conectado a base de datos en proyecto universitario",
        "Refactor de código Java para mejorar legibilidad y orden",
      ],
    },
  },
  "Java (Spring Boot)": {
    years: "1.5 Años",
    sections: {
      fundamentos: [
        "Programación orientada a objetos en Java",
        "Creación de controladores REST básicos",
        "Uso de servicios para separar lógica de negocio",
        "Manejo de entidades simples con JPA",
        "Validación básica de datos recibidos desde formularios o APIs",
      ],
      caracteristicasAvanzadas: [
        "Creación de endpoints CRUD siguiendo ejemplos guiados",
        "Uso básico de repositorios con Spring Data JPA",
        "Manejo inicial de errores con respuestas HTTP claras",
        "Configuración simple de conexión a base de datos",
        "Documentación inicial de endpoints con Swagger/OpenAPI",
      ],
      ecosistema: [
        "Uso de Maven o Gradle para dependencias",
        "Desarrollo con IntelliJ IDEA o NetBeans",
        "Pruebas manuales de endpoints con Postman o Thunder Client",
        "Integración con MySQL o PostgreSQL en proyectos académicos",
        "Uso básico de Git para versionar el backend",
      ],
      proyectos: [
        "API REST CRUD para usuarios o productos",
        "Backend simple para un sistema académico",
        "Servicio de autenticación básico en práctica guiada",
        "API conectada a una base de datos relacional",
        "Integración de frontend Angular con endpoints Spring Boot",
      ],
    },
  },
  PHP: {
    years: "2 Años",
    sections: {
      fundamentos: [
        "Sintaxis básica, variables, funciones y arreglos",
        "Recepción de datos desde formularios HTML",
        "Conexión básica a MySQL para consultas simples",
        "Uso inicial de sesiones y manejo de datos del usuario",
        "Separación simple de archivos para organizar vistas y lógica",
      ],
      caracteristicasAvanzadas: [
        "Uso básico de programación orientada a objetos",
        "Validación y sanitización inicial de datos de formularios",
        "Consultas preparadas para evitar inyección SQL",
        "Organización sencilla con patrón MVC en proyectos pequeños",
        "Uso inicial de Composer cuando el proyecto lo requiere",
      ],
      ecosistema: [
        "Trabajo con PHP, MySQL y Apache en entorno local",
        "Uso de phpMyAdmin para revisar datos",
        "Integración con WordPress para ajustes o módulos simples",
        "Despliegue básico en hosting compartido o cPanel",
        "Depuración con errores de PHP y revisión de logs",
      ],
      proyectos: [
        "Formulario de contacto con guardado en base de datos",
        "CRUD básico de registros administrativos",
        "Módulo simple para sitio WordPress",
        "Panel básico de gestión con login",
        "Automatización sencilla de certificados o reportes",
      ],
    },
  },
  CSS3: {
    years: "3 Años",
    sections: {
      fundamentos: [
        "Uso de selectores, clases e IDs",
        "Comprensión del box model: margin, padding, border y width",
        "Diseño de layouts básicos con Flexbox",
        "Uso inicial de CSS Grid para estructuras simples",
        "Aplicación de media queries para diseño responsive",
      ],
      caracteristicasAvanzadas: [
        "Creación de transiciones y animaciones sencillas",
        "Uso de variables CSS para colores y espaciados",
        "Aplicación de pseudo-clases como hover, focus y active",
        "Uso básico de pseudo-elementos para detalles visuales",
        "Organización de estilos para evitar duplicación excesiva",
      ],
      ecosistema: [
        "Uso de DevTools para inspeccionar y corregir estilos",
        "Integración con Tailwind o Bootstrap cuando el proyecto lo usa",
        "Buenas prácticas de nombres de clases",
        "Uso inicial de SASS o PostCSS en proyectos guiados",
        "Consulta de documentación MDN para propiedades CSS",
      ],
      proyectos: [
        "Landing page responsive",
        "Tarjetas de contenido con hover y sombras",
        "Navbar adaptable a móvil",
        "Formulario estilizado y accesible",
        "Maquetación de dashboard básico",
      ],
    },
  },
  "JavaScript (ES6+)": {
    years: "2.5 Años",
    sections: {
      fundamentos: [
        "Variables, tipos de datos y operadores básicos",
        "Funciones, condicionales y ciclos",
        "Manipulación básica del DOM",
        "Manejo de eventos como click, submit y input",
        "Uso de arrays y objetos para organizar datos",
      ],
      caracteristicasAvanzadas: [
        "Consumo de APIs con fetch siguiendo ejemplos guiados",
        "Uso básico de promesas y async/await",
        "Destructuring y template literals en casos simples",
        "Separación de código en módulos cuando el proyecto lo necesita",
        "Validación de formularios desde el frontend",
      ],
      ecosistema: [
        "Uso básico de NPM para instalar paquetes",
        "Trabajo con Vite o frameworks frontend",
        "Depuración con consola y DevTools",
        "Lectura de errores comunes del navegador",
        "Integración con HTML, CSS y TypeScript en proyectos pequeños",
      ],
      proyectos: [
        "Formulario con validación en cliente",
        "Consumo y listado de datos desde una API pública",
        "Filtro o buscador de elementos",
        "Calculadora o simulador básico",
        "Componente interactivo para una landing page",
      ],
    },
  },
  WooCommerce: {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Creación de productos simples con precio, imagen y descripción",
        "Configuración básica de categorías y etiquetas",
        "Revisión de carrito, checkout y flujo de compra",
        "Gestión básica de pedidos desde el panel",
        "Configuración inicial de inventario y estados de producto",
      ],
      caracteristicasAvanzadas: [
        "Configuración simple de métodos de envío",
        "Creación de cupones básicos de descuento",
        "Ajustes iniciales de impuestos según el caso",
        "Personalización visual básica de páginas de tienda",
        "Revisión de correos automáticos de pedidos",
      ],
      ecosistema: [
        "Trabajo sobre WordPress y temas compatibles",
        "Uso de plugins de pasarelas de pago",
        "Integración con Elementor para páginas de tienda",
        "Consulta de reportes básicos de ventas",
        "Mantenimiento de productos y plugins relacionados",
      ],
      proyectos: [
        "Catálogo de productos para negocio pequeño",
        "Tienda simple con productos físicos",
        "Configuración de checkout básico",
        "Carga de productos, imágenes y categorías",
        "Ajustes de una tienda WooCommerce existente",
      ],
    },
  },
  BrowserStack: {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Pruebas manuales en navegadores y dispositivos diferentes",
        "Verificación visual de páginas responsive",
        "Revisión de errores básicos en consola del navegador",
        "Captura de evidencias para reportar fallos",
        "Comparación de comportamiento entre desktop y móvil",
      ],
      caracteristicasAvanzadas: [
        "Uso inicial de sesiones remotas para depurar problemas",
        "Revisión básica de logs de red cuando una página falla",
        "Validación de formularios y navegación en distintos navegadores",
        "Registro ordenado de bugs encontrados",
        "Pruebas guiadas antes de entregar cambios frontend",
      ],
      ecosistema: [
        "Uso de BrowserStack Live para pruebas manuales",
        "Relación con QA, issues y reportes de bugs",
        "Integración conceptual con Selenium, Cypress o Playwright",
        "Uso de Jira, GitHub Issues o herramientas similares para seguimiento",
        "Pruebas junto a DevTools del navegador",
      ],
      proyectos: [
        "Validación responsive de landing page",
        "Prueba cross-browser de formulario de contacto",
        "Revisión visual de portafolio en móvil y desktop",
        "Reporte de errores de UI encontrados en navegación",
        "Checklist básico antes de publicar una web",
      ],
    },
  },
  "Katalon Studio": {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Creación de casos de prueba simples",
        "Grabación básica de acciones en aplicaciones web",
        "Uso de Object Repository para identificar elementos",
        "Ejecución de pruebas funcionales guiadas",
        "Lectura de resultados de pruebas y errores",
      ],
      caracteristicasAvanzadas: [
        "Agrupación de pruebas en test suites",
        "Uso básico de datos de prueba en escenarios repetitivos",
        "Validaciones simples de textos, botones y formularios",
        "Generación de reportes básicos después de ejecutar pruebas",
        "Mantenimiento inicial cuando cambia un selector",
      ],
      ecosistema: [
        "Relación con Selenium como motor de automatización",
        "Uso junto a Git para versionar pruebas",
        "Integración conceptual con CI/CD en etapas más avanzadas",
        "Documentación de casos de prueba para QA",
        "Uso en aplicaciones web y APIs sencillas",
      ],
      proyectos: [
        "Automatización básica de login",
        "Prueba de formulario de registro",
        "Validación de navegación principal de una web",
        "Suite simple de regresión para páginas clave",
        "Prueba funcional guiada de una aplicación académica",
      ],
    },
  },
  "Burp Suite": {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Uso básico del proxy para interceptar peticiones",
        "Revisión de requests y responses HTTP",
        "Configuración inicial del navegador para trabajar con Burp",
        "Identificación de parámetros enviados por formularios",
        "Uso de Repeater para repetir y observar peticiones simples",
      ],
      caracteristicasAvanzadas: [
        "Pruebas manuales básicas de entradas de usuario",
        "Revisión inicial de headers de seguridad",
        "Uso guiado de Decoder para entender datos codificados",
        "Observación de cookies y tokens en aplicaciones de prueba",
        "Documentación responsable de hallazgos simples",
      ],
      ecosistema: [
        "Relación con OWASP Top 10 como guía de aprendizaje",
        "Uso en laboratorios o entornos autorizados",
        "Trabajo junto a navegador y DevTools",
        "Consulta de documentación para entender vulnerabilidades",
        "Buenas prácticas de ética y autorización en pruebas de seguridad",
      ],
      proyectos: [
        "Laboratorio básico de interceptación HTTP",
        "Revisión de formulario vulnerable en entorno de práctica",
        "Análisis inicial de cookies y headers",
        "Reporte simple de hallazgos en una app de prueba",
        "Checklist básico de seguridad para formulario web",
      ],
    },
  },
  "Google Cloud Platform (GCP)": {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Navegación básica en Google Cloud Console",
        "Creación inicial de proyectos y recursos",
        "Uso básico de Cloud Storage para archivos",
        "Deploy simple en servicios como Cloud Run o Firebase Hosting",
        "Comprensión inicial de permisos e IAM",
      ],
      caracteristicasAvanzadas: [
        "Configuración básica de variables de entorno",
        "Revisión de logs para detectar errores de despliegue",
        "Uso inicial de Cloud SQL en prácticas guiadas",
        "Prueba de funciones serverless simples",
        "Monitoreo básico del estado de servicios",
      ],
      ecosistema: [
        "Uso de Google Cloud Console como herramienta principal",
        "Relación con Firebase para apps web sencillas",
        "Uso inicial de gcloud CLI para comandos básicos",
        "Documentación oficial para despliegues paso a paso",
        "Integración con GitHub o repositorios de código",
      ],
      proyectos: [
        "Deploy básico de una app web",
        "Almacenamiento de archivos en Cloud Storage",
        "API sencilla desplegada en Cloud Run",
        "Proyecto web conectado a Firebase",
        "Práctica guiada con base de datos administrada",
      ],
    },
  },
  "GitHub Actions (CI/CD)": {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Creación de workflows básicos en archivos YAML",
        "Uso de triggers como push y pull_request",
        "Definición de jobs y steps simples",
        "Ejecución de comandos como install, build o test",
        "Lectura de logs para detectar fallos en el pipeline",
      ],
      caracteristicasAvanzadas: [
        "Uso básico de secrets para variables sensibles",
        "Configuración simple de caché de dependencias",
        "Separación de jobs para build y verificación",
        "Uso inicial de artifacts cuando se necesita guardar resultados",
        "Ajuste de workflows existentes siguiendo documentación",
      ],
      ecosistema: [
        "Integración directa con repositorios GitHub",
        "Uso con proyectos Node, Next.js o frontend estático",
        "Relación con despliegues en Vercel, Netlify o cloud",
        "Uso de marketplace actions en casos guiados",
        "Trabajo junto a Pull Requests como control de calidad",
      ],
      proyectos: [
        "Pipeline básico para instalar dependencias y compilar",
        "Verificación automática de TypeScript",
        "Deploy simple después de cambios en main",
        "Workflow para revisar pull requests",
        "Automatización pequeña para proyecto de portafolio",
      ],
    },
  },
  cPanel: {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Uso de File Manager para subir y organizar archivos",
        "Creación básica de cuentas de correo",
        "Gestión inicial de dominios y subdominios",
        "Creación de bases de datos MySQL",
        "Activación o revisión básica de certificados SSL",
      ],
      caracteristicasAvanzadas: [
        "Configuración simple de redirecciones",
        "Creación de backups desde el panel",
        "Uso básico de phpMyAdmin para revisar datos",
        "Configuración inicial de cron jobs sencillos",
        "Revisión de errores comunes en archivos o permisos",
      ],
      ecosistema: [
        "Relación con hosting compartido",
        "Trabajo con PHP, MySQL y WordPress",
        "Uso de Softaculous para instalaciones rápidas",
        "Administración básica de correo corporativo",
        "Consulta de logs y soporte del hosting cuando hay fallos",
      ],
      proyectos: [
        "Subida de sitio PHP o HTML a hosting",
        "Instalación básica de WordPress",
        "Configuración de correo para un dominio",
        "Migración simple de archivos y base de datos",
        "Mantenimiento básico de sitio institucional",
      ],
    },
  },
  Notion: {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Creación de páginas y organización por bloques",
        "Uso básico de tablas, listas y tableros kanban",
        "Creación de plantillas simples",
        "Documentación de tareas y notas técnicas",
        "Organización de información por secciones y enlaces internos",
      ],
      caracteristicasAvanzadas: [
        "Uso básico de bases de datos con filtros y vistas",
        "Relaciones simples entre tareas, proyectos o recursos",
        "Creación de calendarios para seguimiento",
        "Uso inicial de propiedades como estado, prioridad y fecha",
        "Estructuración de wikis personales o de equipo pequeño",
      ],
      ecosistema: [
        "Uso de plantillas de la comunidad",
        "Integración manual con flujos de trabajo de desarrollo",
        "Relación con GitHub, calendarios o herramientas de tareas",
        "Uso colaborativo con comentarios y menciones",
        "Documentación de proyectos técnicos y aprendizajes",
      ],
      proyectos: [
        "Roadmap de aprendizaje técnico",
        "Tablero de tareas para un proyecto web",
        "Wiki básica de documentación de proyecto",
        "Registro de bugs y mejoras pendientes",
        "Base de datos de cursos y certificaciones",
      ],
    },
  },
  Asana: {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Creación de proyectos y tareas",
        "Asignación de responsables y fechas de entrega",
        "Uso de subtareas para dividir trabajo",
        "Seguimiento básico de estados y prioridades",
        "Organización de tareas en lista o tablero",
      ],
      caracteristicasAvanzadas: [
        "Uso de campos personalizados simples",
        "Creación de dependencias entre tareas",
        "Revisión de timeline para planificación básica",
        "Uso inicial de reglas o automatizaciones sencillas",
        "Seguimiento de entregables por sprint o fase",
      ],
      ecosistema: [
        "Integración conceptual con Slack, correo o calendario",
        "Uso para coordinar trabajo técnico y no técnico",
        "Documentación de avances con comentarios",
        "Relación con metodologías ágiles básicas",
        "Organización de tareas personales y de equipo",
      ],
      proyectos: [
        "Planificación de una landing page",
        "Seguimiento de tareas de portafolio",
        "Organización de entregables académicos",
        "Kanban básico para bugs y mejoras",
        "Cronograma simple de desarrollo web",
      ],
    },
  },
  "Linux (Ubuntu, CentOS, Pop!_OS)": {
    years: "2 Años",
    sections: {
      fundamentos: [
        "Uso básico de terminal y navegación por carpetas",
        "Comandos comunes como ls, cd, mkdir, cp, mv y rm",
        "Gestión inicial de permisos con chmod y chown",
        "Instalación de paquetes con apt o gestores similares",
        "Comprensión básica de rutas, usuarios y procesos",
      ],
      caracteristicasAvanzadas: [
        "Conexión remota básica con SSH",
        "Lectura de logs simples para diagnosticar errores",
        "Creación de scripts shell pequeños",
        "Revisión de servicios con systemctl",
        "Configuración inicial de variables de entorno",
      ],
      ecosistema: [
        "Trabajo con Ubuntu, Pop!_OS o servidores Linux básicos",
        "Uso de Git y Node desde terminal",
        "Relación con Apache, Nginx o Docker en prácticas guiadas",
        "Uso de editores como VS Code conectado al entorno local",
        "Consulta de manuales y documentación para comandos",
      ],
      proyectos: [
        "Configuración de entorno de desarrollo web",
        "Deploy básico de aplicación en servidor Linux",
        "Script simple para automatizar una tarea repetitiva",
        "Configuración inicial de SSH para un servidor",
        "Diagnóstico básico de permisos y logs",
      ],
    },
  },
  "IntelliJ IDEA": {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Creación y apertura de proyectos Java",
        "Navegación básica entre clases, métodos y paquetes",
        "Ejecución de aplicaciones desde el IDE",
        "Uso del autocompletado y sugerencias del editor",
        "Configuración inicial de proyectos Maven o Gradle",
      ],
      caracteristicasAvanzadas: [
        "Uso básico del debugger con breakpoints",
        "Refactorizaciones simples como renombrar clases o métodos",
        "Integración básica con Git desde el IDE",
        "Configuración de run configurations sencillas",
        "Revisión de warnings e inspecciones de código",
      ],
      ecosistema: [
        "Desarrollo con Java y Spring Boot",
        "Uso de Maven o Gradle para dependencias",
        "Pruebas manuales de APIs con herramientas externas",
        "Relación con bases de datos en proyectos backend",
        "Plugins básicos para productividad y soporte del framework",
      ],
      proyectos: [
        "API REST sencilla con Spring Boot",
        "Proyecto académico en Java",
        "CRUD backend conectado a base de datos",
        "Depuración de errores en servicios simples",
        "Refactor básico de código Java existente",
      ],
    },
  },
  "Apache NetBeans": {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Creación de proyectos Java básicos",
        "Ejecución y compilación desde el IDE",
        "Navegación por paquetes, clases y archivos",
        "Uso inicial del editor y autocompletado",
        "Configuración básica con Ant o Maven",
      ],
      caracteristicasAvanzadas: [
        "Depuración básica con breakpoints",
        "Uso inicial del GUI Builder en prácticas de escritorio",
        "Refactorizaciones simples como renombrar clases",
        "Integración básica con Git",
        "Uso de plantillas para crear clases o formularios",
      ],
      ecosistema: [
        "Desarrollo académico con Java",
        "Relación con Maven para dependencias",
        "Trabajo con PHP o proyectos web sencillos cuando aplica",
        "Uso junto a bases de datos en prácticas guiadas",
        "Consulta de documentación y mensajes del IDE",
      ],
      proyectos: [
        "Aplicación Java de escritorio sencilla",
        "Proyecto académico con formularios",
        "CRUD básico conectado a base de datos",
        "Práctica de POO en Java",
        "Mantenimiento de código legacy o ejercicios universitarios",
      ],
    },
  },
  Antigravity: {
    years: "1 Año",
    sections: {
      fundamentos: [
        "Uso del entorno para apoyar tareas de desarrollo",
        "Navegación básica por archivos y estructura del proyecto",
        "Generación de ideas o borradores de código con revisión humana",
        "Lectura de explicaciones para comprender errores",
        "Organización de tareas pequeñas dentro del flujo de trabajo",
      ],
      caracteristicasAvanzadas: [
        "Uso responsable de asistencia con IA para refactorizaciones simples",
        "Revisión de sugerencias antes de aplicarlas al proyecto",
        "Apoyo en documentación y explicación de fragmentos de código",
        "Creación de prototipos rápidos para validar ideas",
        "Uso de prompts claros para obtener respuestas más útiles",
      ],
      ecosistema: [
        "Relación con IDEs, Git y documentación técnica",
        "Apoyo en flujos frontend, backend o QA según el contexto",
        "Uso junto a herramientas de gestión como Notion o Asana",
        "Complemento para aprendizaje y productividad Junior",
        "Buenas prácticas para no depender ciegamente de la herramienta",
      ],
      proyectos: [
        "Prototipo rápido de componente UI",
        "Documentación básica de una funcionalidad",
        "Análisis guiado de errores comunes",
        "Apoyo en checklist de pruebas manuales",
        "Mejora de pequeños fragmentos de código con revisión",
      ],
    },
  },
}

type TechDetailSections = {
  fundamentos: string[]
  caracteristicasAvanzadas: string[]
  ecosistema: string[]
  proyectos: string[]
}

const techDetailsEn: Partial<Record<keyof typeof techDetails, { sections: TechDetailSections }>> = {
  HTML5: {
    sections: {
      fundamentos: ["Basic HTML document structure", "Semantic tags such as header, main, section, and footer", "Simple forms with inputs, labels, and buttons", "Lists, links, images, and basic tables", "Initial best practices for organizing page content"],
      caracteristicasAvanzadas: ["Basic aria attributes to improve accessibility", "Audio, video, and responsive image usage", "Basic HTML validation in forms", "Initial meta tags for SEO and responsive design", "Simple SVG or icon integration inside the interface"],
      ecosistema: ["VS Code and extensions for faster HTML work", "HTML validators to review structure errors", "Accessibility best practices using MDN documentation", "Integration with CSS and JavaScript in static pages", "Asset organization for images, icons, and documents"],
      proyectos: ["Basic landing page with information sections", "Contact form with accessible structure", "Personal presentation page", "Simple corporate page layout", "HTML template to practice semantic structure"],
    },
  },
  Angular: {
    sections: {
      fundamentos: ["Creating simple reusable components", "Using templates with interpolation and property binding", "Basic event handling with event binding", "Using common directives such as *ngIf and *ngFor", "Basic component communication with @Input and @Output"],
      caracteristicasAvanzadas: ["API consumption with HttpClient following guided examples", "Creating services to separate component logic", "Initial routing and page navigation", "Basic reactive forms with simple validations", "Initial observable and subscription handling with RxJS"],
      ecosistema: ["Using Angular CLI to create components, services, and modules", "Applying Angular Material in forms, buttons, and tables", "Basic folder organization: components, services, and pages", "Using TypeScript for interfaces and typed data", "Debugging with console, DevTools, and framework error messages"],
      proyectos: ["Basic CRUD connected to a REST API", "Simple dashboard with cards, tables, and filters", "Registration form with field validations", "Product catalog with list and detail views", "Academic mini app to practice routes, services, and components"],
    },
  },
  Astro: {
    sections: {
      fundamentos: ["Creating static pages with .astro files", "Using file-based routing", "Basic separation between layouts, pages, and components", "Rendering content with props and simple variables", "Using Markdown for static content such as posts or information sections"],
      caracteristicasAvanzadas: ["Initial use of interactive components with islands architecture", "Basic integration of React components inside Astro", "Creating reusable layouts for visual consistency", "Basic image and asset handling inside the project", "Initial use of View Transitions in simple navigation"],
      ecosistema: ["Using Astro CLI to create and run projects", "Tailwind CSS integration for responsive styles", "Basic deployment to Vercel or Netlify", "Content organization in folders such as pages, components, and layouts", "Using official documentation to solve errors and configure integrations"],
      proyectos: ["Personal or product landing page", "Static portfolio with project and contact sections", "Basic blog using Markdown files", "Simple corporate website with information pages", "Documentation or presentation page for an academic project"],
    },
  },
  TypeScript: {
    sections: {
      fundamentos: ["Using basic types such as string, number, boolean, and arrays", "Creating interfaces to describe simple objects", "Typing props, functions, and API responses", "Basic use of optional types and union types", "Reading TypeScript errors to fix code"],
      caracteristicasAvanzadas: ["Initial use of generics in simple functions or components", "Basic use of utility types such as Partial and Pick", "Typing state and events in frontend components", "Separating reusable types into dedicated files", "Avoiding unnecessary any when data is known"],
      ecosistema: ["Basic tsconfig setup", "Using TypeScript with React, Next.js, or Angular", "Autocomplete and type checking in VS Code", "ESLint integration when the project requires it", "Using documentation to understand common errors"],
      proyectos: ["Frontend components with typed props", "API consumption using interfaces for responses", "Form with types for submitted data", "Small dashboard with simple data models", "Basic refactor from JavaScript to TypeScript"],
    },
  },
  "JavaScript (ES6+)": {
    sections: {
      fundamentos: ["Variables, data types, and basic operators", "Functions, conditionals, and loops", "Basic DOM manipulation", "Handling events such as click, submit, and input", "Using arrays and objects to organize data"],
      caracteristicasAvanzadas: ["Consuming APIs with fetch by following guided examples", "Basic use of promises and async/await", "Destructuring and template literals in simple cases", "Separating code into modules when the project needs it", "Frontend form validation"],
      ecosistema: ["Basic NPM usage to install packages", "Working with Vite or frontend frameworks", "Debugging with console and DevTools", "Reading common browser errors", "Integration with HTML, CSS, and TypeScript in small projects"],
      proyectos: ["Client-side form validation", "Fetching and listing data from a public API", "Filter or search feature for a list", "Basic calculator or simulator", "Interactive component for a landing page"],
    },
  },
  Java: {
    sections: {
      fundamentos: ["Object-oriented programming (classes, objects, inheritance, encapsulation)", "Using data types, conditionals, loops, and methods", "Basic collection handling with ArrayList and HashMap", "Organizing code into reusable packages and classes", "Reading and debugging common compile and runtime errors"],
      caracteristicasAvanzadas: ["Initial usage of interfaces and abstract classes in guided exercises", "Basic exception handling with try-catch", "Applying basic clean code principles in academic projects", "Simple file read/write for local persistence", "Initial layered-structure practice to prepare backend projects"],
      ecosistema: ["Development with IntelliJ IDEA or NetBeans", "Using Maven or Gradle for dependencies in Java projects", "Basic version control with Git and GitHub", "Manual logic testing with simple test classes", "Using official Java documentation and learning resources"],
      proyectos: ["Console app for simple record management", "Basic academic system with CRUD operations", "OOP practice with entities and business rules", "Java module connected to a database in a university project", "Refactor of Java code to improve readability and structure"],
    },
  },
  CSS3: {
    sections: {
      fundamentos: ["Using selectors, classes, and IDs", "Understanding the box model: margin, padding, border, and width", "Building basic layouts with Flexbox", "Initial use of CSS Grid for simple structures", "Applying media queries for responsive design"],
      caracteristicasAvanzadas: ["Creating simple transitions and animations", "Using CSS variables for colors and spacing", "Applying pseudo-classes such as hover, focus, and active", "Basic use of pseudo-elements for visual details", "Organizing styles to avoid excessive duplication"],
      ecosistema: ["Using DevTools to inspect and fix styles", "Integration with Tailwind or Bootstrap when the project uses them", "Class naming best practices", "Initial use of SASS or PostCSS in guided projects", "Using MDN documentation for CSS properties"],
      proyectos: ["Responsive landing page", "Content cards with hover effects and shadows", "Mobile-friendly navbar", "Styled and accessible form", "Basic dashboard layout"],
    },
  },
  "Java (Spring Boot)": {
    sections: {
      fundamentos: ["Object-oriented programming in Java", "Creating basic REST controllers", "Using services to separate business logic", "Handling simple entities with JPA", "Basic validation of data received from forms or APIs"],
      caracteristicasAvanzadas: ["Creating CRUD endpoints by following guided examples", "Basic repository usage with Spring Data JPA", "Initial error handling with clear HTTP responses", "Simple database connection setup", "Initial endpoint documentation with Swagger/OpenAPI"],
      ecosistema: ["Using Maven or Gradle for dependencies", "Development with IntelliJ IDEA or NetBeans", "Manual endpoint testing with Postman or Thunder Client", "Integration with MySQL or PostgreSQL in academic projects", "Basic Git usage to version backend code"],
      proyectos: ["REST CRUD API for users or products", "Simple backend for an academic system", "Basic authentication service in guided practice", "API connected to a relational database", "Angular frontend integration with Spring Boot endpoints"],
    },
  },
  PHP: {
    sections: {
      fundamentos: ["Basic syntax, variables, functions, and arrays", "Receiving data from HTML forms", "Basic MySQL connection for simple queries", "Initial use of sessions and user data handling", "Simple file separation to organize views and logic"],
      caracteristicasAvanzadas: ["Basic object-oriented programming usage", "Initial validation and sanitization of form data", "Prepared statements to avoid SQL injection", "Simple MVC organization in small projects", "Initial Composer usage when the project requires it"],
      ecosistema: ["Working with PHP, MySQL, and Apache in a local environment", "Using phpMyAdmin to review data", "Integration with WordPress for small adjustments or modules", "Basic deployment to shared hosting or cPanel", "Debugging with PHP errors and log review"],
      proyectos: ["Contact form that stores data in a database", "Basic CRUD for administrative records", "Simple module for a WordPress site", "Basic management panel with login", "Simple automation for certificates or reports"],
    },
  },
  PostgreSQL: {
    sections: {
      fundamentos: ["Creating tables and columns with common data types", "SELECT, INSERT, UPDATE, and DELETE queries", "Using basic constraints to protect data integrity", "Relationships between tables using foreign keys", "JOIN queries to combine related entities"],
      caracteristicasAvanzadas: ["Basic use of schemas to organize tables", "Queries with aggregate functions such as COUNT and SUM", "Creating simple views", "Initial use of JSON/JSONB when the model requires it", "Basic transactions in related operations"],
      ecosistema: ["Using pgAdmin to explore tables and queries", "Connecting from Java or Node.js backends and tools like Supabase", "Basic use of environment variables for credentials", "Simple backups and data restoration", "Using official documentation for types and functions"],
      proyectos: ["Database for a REST API", "Management system with simple users and roles", "CRUD for products, courses, or events", "Basic reports with date or category filters", "Practice with one-to-many and many-to-many relationships"],
    },
  },
  MySQL: {
    sections: {
      fundamentos: ["Creating databases and tables", "Basic CRUD queries", "Simple relationships with primary and foreign keys", "Using JOIN to combine information from multiple tables", "Applying basic constraints such as NOT NULL and UNIQUE"],
      caracteristicasAvanzadas: ["Creating simple views", "Initial use of stored procedures", "Basic transactions for related operations", "Reviewing common SQL query errors", "Organizing scripts to create or seed tables"],
      ecosistema: ["Using phpMyAdmin to manage tables", "Using MySQL Workbench to model and query data", "Connecting with PHP, Java, or Node.js in small projects", "Basic database backup and restore", "Using documentation for common SQL functions"],
      proyectos: ["User or product CRUD", "Database for a simple store", "Contact form records", "Basic academic system with students and courses", "Simple reports with filtered queries"],
    },
  },
  "SQL Server": {
    sections: {
      fundamentos: ["Creating tables with basic data types", "SELECT, INSERT, UPDATE, and DELETE queries", "Filtering with WHERE and ordering with ORDER BY", "Simple table relationships using primary and foreign keys", "JOIN queries in guided scenarios"],
      caracteristicasAvanzadas: ["Creating simple views for frequent queries", "Basic use of stored procedures", "Initial use of transactions in sensitive operations", "Basic SQL query error review", "Initial use of indexes on frequently queried fields"],
      ecosistema: ["Using SQL Server Management Studio to manage data", "Basic database diagram design", "Connecting from .NET apps or academic backends", "Basic data import and export", "Using documentation for syntax and common functions"],
      proyectos: ["Database for a reservation system", "CRUD connected to a backend application", "Queries for basic reports", "Relational model for an academic system", "Join practice between customers, orders, and products"],
    },
  },
  Firebase: {
    sections: {
      fundamentos: ["Creating projects in Firebase Console", "Basic Firestore usage to save and read documents", "Initial Authentication setup with email or simple providers", "Basic file upload with Firebase Storage", "Initial site publishing with Firebase Hosting"],
      caracteristicasAvanzadas: ["Simple security rules to protect collections", "Basic queries with filters and ordering", "Initial authentication state handling in the frontend", "Realtime reading and writing in simple cases", "Organizing collections according to project needs"],
      ecosistema: ["Using Firebase SDK in frontend applications", "Environment variable setup for public credentials", "Basic Firebase CLI usage for deployment", "Reviewing logs and dashboards from Firebase Console", "Integration with React, Angular, or simple web projects"],
      proyectos: ["Basic user login and registration", "Simple CRUD using Firestore", "Form that stores data in the cloud", "Basic gallery with image upload", "Landing page or frontend app deployment with Firebase Hosting"],
    },
  },
  WordPress: {
    sections: {
      fundamentos: ["Creating and editing pages and posts", "Installing and basic theme configuration", "Using common plugins for forms, SEO, or security", "Basic management of menus, widgets, and media", "Simple user and role administration"],
      caracteristicasAvanzadas: ["Basic customization with additional CSS", "Initial use of visual builders such as Elementor", "Contact form configuration", "Basic image and performance optimization", "Initial maintenance of plugins, themes, and backups"],
      ecosistema: ["Using the WordPress admin dashboard", "Basic WooCommerce integration when the site requires it", "Working with hosting and cPanel to manage files or databases", "Plugins such as Yoast SEO, Contact Form 7, and cache tools", "Using plugin documentation and support resources"],
      proyectos: ["Information site for a local business", "Basic blog with categories and posts", "Editable landing page in WordPress", "Contact form for an institution", "Visual adjustments and maintenance for an existing site"],
    },
  },
  WooCommerce: {
    sections: {
      fundamentos: ["Creating simple products with price, image, and description", "Basic category and tag setup", "Reviewing cart, checkout, and purchase flow", "Basic order management from the dashboard", "Initial inventory and product status setup"],
      caracteristicasAvanzadas: ["Simple shipping method configuration", "Creating basic discount coupons", "Initial tax settings depending on the case", "Basic visual customization of shop pages", "Reviewing automatic order emails"],
      ecosistema: ["Working on WordPress and compatible themes", "Using payment gateway plugins", "Integration with Elementor for shop pages", "Reviewing basic sales reports", "Maintaining products and related plugins"],
      proyectos: ["Product catalog for a small business", "Simple store with physical products", "Basic checkout configuration", "Uploading products, images, and categories", "Adjustments to an existing WooCommerce store"],
    },
  },
  BrowserStack: {
    sections: {
      fundamentos: ["Manual testing across different browsers and devices", "Visual verification of responsive pages", "Reviewing basic browser console errors", "Capturing evidence to report bugs", "Comparing behavior between desktop and mobile"],
      caracteristicasAvanzadas: ["Initial use of remote sessions to debug issues", "Basic network log review when a page fails", "Validating forms and navigation across browsers", "Organized tracking of discovered bugs", "Guided testing before delivering frontend changes"],
      ecosistema: ["Using BrowserStack Live for manual testing", "Connection with QA, issues, and bug reports", "Conceptual integration with Selenium, Cypress, or Playwright", "Using Jira, GitHub Issues, or similar tracking tools", "Testing together with browser DevTools"],
      proyectos: ["Responsive validation of a landing page", "Cross-browser testing for a contact form", "Visual review of a portfolio on mobile and desktop", "Reporting UI errors found during navigation", "Basic checklist before publishing a website"],
    },
  },
  "Katalon Studio": {
    sections: {
      fundamentos: ["Creating simple test cases", "Basic recording of actions in web applications", "Using Object Repository to identify elements", "Running guided functional tests", "Reading test results and errors"],
      caracteristicasAvanzadas: ["Grouping tests into test suites", "Basic test data usage for repeated scenarios", "Simple validations for texts, buttons, and forms", "Generating basic reports after running tests", "Initial maintenance when a selector changes"],
      ecosistema: ["Relationship with Selenium as an automation engine", "Using Git to version tests", "Conceptual integration with CI/CD in more advanced stages", "Documenting test cases for QA", "Usage in web applications and simple APIs"],
      proyectos: ["Basic login automation", "Registration form test", "Validation of a website's main navigation", "Simple regression suite for key pages", "Guided functional test for an academic application"],
    },
  },
  "Burp Suite": {
    sections: {
      fundamentos: ["Basic proxy usage to intercept requests", "Reviewing HTTP requests and responses", "Initial browser configuration to work with Burp", "Identifying parameters sent by forms", "Using Repeater to resend and observe simple requests"],
      caracteristicasAvanzadas: ["Basic manual testing of user inputs", "Initial review of security headers", "Guided Decoder usage to understand encoded data", "Observing cookies and tokens in practice applications", "Responsible documentation of simple findings"],
      ecosistema: ["Relationship with OWASP Top 10 as a learning guide", "Use in labs or authorized environments", "Working together with the browser and DevTools", "Using documentation to understand vulnerabilities", "Ethics and authorization best practices in security testing"],
      proyectos: ["Basic HTTP interception lab", "Review of a vulnerable form in a practice environment", "Initial analysis of cookies and headers", "Simple findings report for a test app", "Basic security checklist for a web form"],
    },
  },
  Azure: {
    sections: {
      fundamentos: ["Basic navigation in Azure Portal", "Initial resource creation such as App Service or Storage", "Basic understanding of resource groups", "Simple deployment of a web application", "Reviewing service metrics and status from the portal"],
      caracteristicasAvanzadas: ["Basic environment variable setup in App Service", "Initial use of Azure SQL in guided projects", "Reviewing logs to find deployment errors", "Simple permissions and access configuration", "Basic Azure Functions usage in small examples"],
      ecosistema: ["Using Azure Portal as the main tool", "Initial Azure CLI usage for simple commands", "GitHub integration for basic deployments", "Official documentation for step-by-step resource creation", "Relationship with .NET, Node.js, or frontend applications"],
      proyectos: ["Basic web application deployment", "Cloud file storage practice", "Simple API published in App Service", "Azure SQL database connected to a practice backend", "Simple deployment pipeline from GitHub"],
    },
  },
  "Google Cloud Platform (GCP)": {
    sections: {
      fundamentos: ["Basic navigation in Google Cloud Console", "Initial project and resource creation", "Basic Cloud Storage usage for files", "Simple deployment to services such as Cloud Run or Firebase Hosting", "Initial understanding of permissions and IAM"],
      caracteristicasAvanzadas: ["Basic environment variable configuration", "Reviewing logs to detect deployment errors", "Initial Cloud SQL usage in guided practice", "Testing simple serverless functions", "Basic service status monitoring"],
      ecosistema: ["Using Google Cloud Console as the main tool", "Relationship with Firebase for simple web apps", "Initial gcloud CLI usage for basic commands", "Official documentation for step-by-step deployments", "Integration with GitHub or code repositories"],
      proyectos: ["Basic web app deployment", "File storage in Cloud Storage", "Simple API deployed to Cloud Run", "Web project connected to Firebase", "Guided practice with a managed database"],
    },
  },
  Git: {
    sections: {
      fundamentos: ["Initializing repositories and checking status with git status", "Adding changes with git add and creating descriptive commits", "Creating and switching branches for features", "Pulling and pushing changes", "Cloning existing repositories to work locally"],
      caracteristicasAvanzadas: ["Basic merge conflict resolution", "Using git stash to save temporary changes", "Reading history with git log", "Comparing changes with git diff", "Best practices to avoid mixing unrelated changes"],
      ecosistema: ["Using Git together with GitHub", "Working from the terminal and visual editor tools", "Basic feature and main branch workflow", "Using .gitignore to avoid unnecessary files", "Reviewing changes before committing"],
      proyectos: ["Versioning personal projects", "Collaborative academic practice work", "Branches for new website sections", "Change control in portfolios and APIs", "Guided resolution of simple conflicts"],
    },
  },
  GitHub: {
    sections: {
      fundamentos: ["Creating and basic management of repositories", "Uploading local projects to GitHub", "Using README files to document projects", "Reviewing commits, branches, and changes from the interface", "Basic use of issues to track tasks or bugs"],
      caracteristicasAvanzadas: ["Creating pull requests to review changes", "Initial GitHub Pages usage to publish static sites", "Basic task organization with Projects or issues", "Reviewing modified files before merging changes", "Basic use of releases or tags when the project requires it"],
      ecosistema: ["Integration with Git from the terminal", "Using GitHub Desktop or VS Code for simple workflows", "Relationship with GitHub Actions for basic automation", "Best practices for public portfolio repositories", "Using Markdown for documentation"],
      proyectos: ["Publishing a personal portfolio", "Documented repository for an academic project", "Task management for a small app with issues", "Basic collaboration through pull requests", "Hosting a landing page with GitHub Pages"],
    },
  },
  "GitHub Actions (CI/CD)": {
    sections: {
      fundamentos: ["Creating basic workflows in YAML files", "Using triggers such as push and pull_request", "Defining simple jobs and steps", "Running commands such as install, build, or test", "Reading logs to detect pipeline failures"],
      caracteristicasAvanzadas: ["Basic use of secrets for sensitive variables", "Simple dependency cache setup", "Separating jobs for build and verification", "Initial artifact usage when results need to be saved", "Adjusting existing workflows by following documentation"],
      ecosistema: ["Direct integration with GitHub repositories", "Usage with Node, Next.js, or static frontend projects", "Relationship with deployments on Vercel, Netlify, or cloud platforms", "Using marketplace actions in guided cases", "Working with Pull Requests as quality control"],
      proyectos: ["Basic pipeline to install dependencies and build", "Automatic TypeScript verification", "Simple deploy after changes on main", "Workflow to review pull requests", "Small automation for a portfolio project"],
    },
  },
  cPanel: {
    sections: {
      fundamentos: ["Using File Manager to upload and organize files", "Basic email account creation", "Initial domain and subdomain management", "Creating MySQL databases", "Activating or basic review of SSL certificates"],
      caracteristicasAvanzadas: ["Simple redirect configuration", "Creating backups from the panel", "Basic phpMyAdmin usage to review data", "Initial setup of simple cron jobs", "Reviewing common file or permission errors"],
      ecosistema: ["Relationship with shared hosting", "Working with PHP, MySQL, and WordPress", "Using Softaculous for quick installations", "Basic corporate email administration", "Checking logs and hosting support when issues happen"],
      proyectos: ["Uploading a PHP or HTML site to hosting", "Basic WordPress installation", "Email setup for a domain", "Simple file and database migration", "Basic maintenance of an institutional website"],
    },
  },
  Figma: {
    sections: {
      fundamentos: ["Creating frames for web and mobile screens", "Basic use of shapes, text, colors, and images", "Initial Auto Layout usage", "Organizing layers and groups", "Using simple typography and color styles"],
      caracteristicasAvanzadas: ["Creating basic reusable components", "Initial use of variants for simple states", "Prototyping navigation between screens", "Exporting assets for development", "Reviewing measurements and spacing for layout work"],
      ecosistema: ["Using Figma Community for references and inspiration", "Collaborative work with comments", "Basic FigJam usage for ideas or flows", "Using Dev Mode to move designs into code", "Organizing files by pages and sections"],
      proyectos: ["Landing page wireframe", "Personal portfolio mockup", "Basic dashboard design", "Simple prototype for a form or login flow", "Small UI kit with buttons, cards, and inputs"],
    },
  },
  Notion: {
    sections: {
      fundamentos: ["Creating pages and organizing content with blocks", "Basic use of tables, lists, and kanban boards", "Creating simple templates", "Documenting tasks and technical notes", "Organizing information with sections and internal links"],
      caracteristicasAvanzadas: ["Basic database usage with filters and views", "Simple relationships between tasks, projects, or resources", "Creating calendars for tracking", "Initial use of properties such as status, priority, and date", "Structuring personal or small-team wikis"],
      ecosistema: ["Using community templates", "Manual integration with development workflows", "Relationship with GitHub, calendars, or task tools", "Collaborative use with comments and mentions", "Documentation of technical projects and learning"],
      proyectos: ["Technical learning roadmap", "Task board for a web project", "Basic project documentation wiki", "Bug and pending improvements log", "Database for courses and certifications"],
    },
  },
  Asana: {
    sections: {
      fundamentos: ["Creating projects and tasks", "Assigning owners and due dates", "Using subtasks to break down work", "Basic status and priority tracking", "Organizing tasks in list or board views"],
      caracteristicasAvanzadas: ["Using simple custom fields", "Creating dependencies between tasks", "Reviewing timeline for basic planning", "Initial use of simple rules or automations", "Tracking deliverables by sprint or phase"],
      ecosistema: ["Conceptual integration with Slack, email, or calendar", "Usage to coordinate technical and non-technical work", "Documenting progress with comments", "Relationship with basic agile methods", "Organization of personal and team tasks"],
      proyectos: ["Landing page planning", "Portfolio task tracking", "Academic deliverable organization", "Basic kanban for bugs and improvements", "Simple web development schedule"],
    },
  },
  "Linux (Ubuntu, CentOS, Pop!_OS)": {
    sections: {
      fundamentos: ["Basic terminal usage and folder navigation", "Common commands such as ls, cd, mkdir, cp, mv, and rm", "Initial permission management with chmod and chown", "Installing packages with apt or similar package managers", "Basic understanding of paths, users, and processes"],
      caracteristicasAvanzadas: ["Basic remote connection with SSH", "Reading simple logs to diagnose errors", "Creating small shell scripts", "Reviewing services with systemctl", "Initial environment variable configuration"],
      ecosistema: ["Working with Ubuntu, Pop!_OS, or basic Linux servers", "Using Git and Node from the terminal", "Relationship with Apache, Nginx, or Docker in guided practice", "Using editors such as VS Code connected to the local environment", "Using manuals and documentation for commands"],
      proyectos: ["Web development environment setup", "Basic app deployment on a Linux server", "Simple script to automate a repetitive task", "Initial SSH setup for a server", "Basic diagnosis of permissions and logs"],
    },
  },
  "IntelliJ IDEA": {
    sections: {
      fundamentos: ["Creating and opening Java projects", "Basic navigation between classes, methods, and packages", "Running applications from the IDE", "Using autocomplete and editor suggestions", "Initial Maven or Gradle project setup"],
      caracteristicasAvanzadas: ["Basic debugger usage with breakpoints", "Simple refactors such as renaming classes or methods", "Basic Git integration from the IDE", "Simple run configuration setup", "Reviewing code warnings and inspections"],
      ecosistema: ["Development with Java and Spring Boot", "Using Maven or Gradle for dependencies", "Manual API testing with external tools", "Relationship with databases in backend projects", "Basic plugins for productivity and framework support"],
      proyectos: ["Simple REST API with Spring Boot", "Academic Java project", "CRUD backend connected to a database", "Debugging errors in simple services", "Basic refactor of existing Java code"],
    },
  },
  "VS Code": {
    sections: {
      fundamentos: ["Navigating project files and folders", "Using the integrated terminal to run commands", "Searching files, classes, and text inside the project", "Using basic extensions to improve productivity", "Editing code with autocomplete and basic formatting"],
      caracteristicasAvanzadas: ["Initial debugger usage in JavaScript or TypeScript", "Basic Git integration from the editor", "Simple project-level settings configuration", "Using snippets or shortcuts for repeated code", "Reviewing issues from the Problems tab"],
      ecosistema: ["Extensions such as ESLint, Prettier, and GitLens", "Using Thunder Client or REST Client to test APIs", "Integration with React, Next.js, Angular, or Node projects", "Working with terminal, Git, and file explorer in one environment", "Using editor errors and suggestions to learn"],
      proyectos: ["Personal portfolio development", "Frontend component editing", "Basic endpoint testing from the editor", "Fixing issues reported by TypeScript or ESLint", "Organizing academic and personal projects"],
    },
  },
  "Apache NetBeans": {
    sections: {
      fundamentos: ["Creating basic Java projects", "Running and compiling from the IDE", "Navigating packages, classes, and files", "Initial editor and autocomplete usage", "Basic setup with Ant or Maven"],
      caracteristicasAvanzadas: ["Basic debugging with breakpoints", "Initial GUI Builder usage in desktop practice", "Simple refactors such as renaming classes", "Basic Git integration", "Using templates to create classes or forms"],
      ecosistema: ["Academic development with Java", "Relationship with Maven for dependencies", "Working with PHP or simple web projects when applicable", "Usage with databases in guided practice", "Using documentation and IDE messages"],
      proyectos: ["Simple Java desktop application", "Academic project with forms", "Basic CRUD connected to a database", "OOP practice in Java", "Maintenance of legacy code or university exercises"],
    },
  },
  Antigravity: {
    sections: {
      fundamentos: ["Using the environment to support development tasks", "Basic navigation through project files and structure", "Generating ideas or code drafts with human review", "Reading explanations to understand errors", "Organizing small tasks within the workflow"],
      caracteristicasAvanzadas: ["Responsible AI assistance for simple refactors", "Reviewing suggestions before applying them to the project", "Support for documentation and code snippet explanations", "Creating quick prototypes to validate ideas", "Using clear prompts to get more useful answers"],
      ecosistema: ["Relationship with IDEs, Git, and technical documentation", "Support for frontend, backend, or QA workflows depending on context", "Use alongside management tools such as Notion or Asana", "Complement for Junior learning and productivity", "Best practices to avoid depending blindly on the tool"],
      proyectos: ["Quick UI component prototype", "Basic documentation of a feature", "Guided analysis of common errors", "Support for a manual testing checklist", "Improving small code snippets with review"],
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
        name: "Java",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" className="w-12 h-12" alt="Java" />,
      },
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
    closeModal: language === "en" ? "Close modal" : "Cerrar modal",
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

  const selectedTechDetails = selectedTech ? techDetails[selectedTech] : null
  const selectedTechSections =
    selectedTech && language === "en"
      ? techDetailsEn[selectedTech]?.sections ?? selectedTechDetails?.sections
      : selectedTechDetails?.sections

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
            className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              aria-label={pageText.closeModal}
              className="absolute -top-3 -right-3 z-30 w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg hover:text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <X size={20} />
            </button>

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

              <div className="flex items-center gap-3 shrink-0">
		                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-white text-xs font-semibold">
		                  <Briefcase className="w-3.5 h-3.5" />
		                  <span>{formatYears(selectedTechDetails?.years || `1 ${pageText.year}`)}</span>
		                </div>
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
	                      {selectedTechSections?.fundamentos.map((item, index) => (
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
	                      {selectedTechSections?.caracteristicasAvanzadas.map((item, index) => (
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
	                      {selectedTechSections?.ecosistema.map((item, index) => (
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
	                      {selectedTechSections?.proyectos.map((item, index) => (
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
