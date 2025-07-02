"use client"

import { useState } from "react"
import { Server, Database, Monitor, X, Mail, MessageSquare } from "lucide-react"

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
}

const skillsData = {
  frontend: {
    title: "Frontend",
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    bgColor: "bg-blue-400/10",
    icon: Monitor,
    description:
      "Especializado en crear interfaces de usuario modernas y responsivas. Experiencia sólida en React, Next.js, TypeScript y herramientas de desarrollo frontend.",
    technologies: [
      {
        name: "React",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-12 h-12" alt="React" />,
      },
      {
        name: "Next.js",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="w-12 h-12" alt="Next.js" />,
      },
      {
        name: "TypeScript",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className="w-12 h-12" alt="TypeScript" />,
      },
      {
        name: "Tailwind CSS",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" className="w-12 h-12" alt="Tailwind CSS" />,
      },
      {
        name: "JavaScript",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-12 h-12" alt="JavaScript" />,
      },
      {
        name: "HTML5",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-12 h-12" alt="HTML5" />,
      },
      {
        name: "CSS",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-12 h-12" alt="CSS" />,
      },
      {
        name: "Angular",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" className="w-12 h-12" alt="Angular" />,
      },
      {
        name: "Bootstrap",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" className="w-12 h-12" alt="Bootstrap" />,
      },
      {
        name: "jQuery",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" className="w-12 h-12" alt="jQuery" />,
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
      "Desarrollo de APIs robustas y escalables. Experiencia en Node.js, Python, bases de datos y arquitecturas de microservicios para aplicaciones empresariales.",
    technologies: [
      {
        name: "Node.js",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-12 h-12" alt="Node.js" />,
      },
      {
        name: "NestJS",
        icon: <img src="https://nestjs.com/img/logo_text.svg" className="w-12 h-12" alt="NestJS" />,
      },
      {
        name: "Spring Boot",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" className="w-12 h-12" alt="Spring Boot" />,
      },
      {
        name: "Express",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="w-12 h-12" alt="Express" />,
      },
      {
        name: "Python",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-12 h-12" alt="Python" />,
      },
      {
        name: "FastAPI",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" className="w-12 h-12" alt="FastAPI" />,
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
      "Gestión y diseño de bases de datos relacionales y NoSQL. Optimización de consultas y arquitectura de datos para aplicaciones de alto rendimiento.",
    technologies: [
      {
        name: "PostgreSQL",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" className="w-12 h-12" alt="PostgreSQL" />,
      },
      {
        name: "MongoDB",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-12 h-12" alt="MongoDB" />,
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
        name: "SQLite",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" className="w-12 h-12" alt="SQLite" />,
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
      name: "DevOps & Cloud",
      technologies: [
        {
          name: "Docker",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className="w-12 h-12" alt="Docker" />,
        },
        {
          name: "AWS",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" className="w-12 h-12" alt="AWS" />,
        },
        {
          name: "Google Cloud",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" className="w-12 h-12" alt="Google Cloud" />,
        },
        {
          name: "Azure",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" className="w-12 h-12" alt="Azure" />,
        },
      ],
    },
    {
      name: "Herramientas",
      technologies: [
        {
          name: "Git",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" className="w-12 h-12" alt="Git" />,
        },
        {
          name: "GitHub",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-12 h-12" alt="GitHub" />,
        },
        {
          name: "VS Code",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" className="w-12 h-12" alt="VS Code" />,
        },
        {
          name: "Figma",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" className="w-12 h-12" alt="Figma" />,
        },
      ],
    },
    {
      name: "Testing & Otros",
      technologies: [
        {
          name: "Jest",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" className="w-12 h-12" alt="Jest" />,
        },
        {
          name: "Jenkins",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" className="w-12 h-12" alt="Jenkins" />,
        },
        {
          name: "Grafana",
          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" className="w-12 h-12" alt="Grafana" />,
        },
        {
          name: "OWASP Top Ten",
          icon: <img src="https://owasp.org/assets/images/logo.svg" className="w-12 h-12" alt="OWASP" />,
        },
        {
          name: "Burpsuite",
          icon: <img src="https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg" className="w-12 h-12" alt="Burp Suite" />,
        },
      ],
    },
  ],
}

export default function Skills() {
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

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Skills Técnicas</h1>
        <p className="text-gray-600">Tecnologías y herramientas que domino para crear soluciones digitales completas</p>
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
                <h2 className={`text-xl font-semibold ${category.color}`}>{category.title}</h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">{category.description}</p>

              {/* Technologies Grid - Solo iconos */}
              <div className="grid grid-cols-3 gap-4">
                {category.technologies.map((tech) => renderTechItem(tech))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Sección adicional que ocupa todo el ancho */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border-2 border-gray-200/50 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{additionalSkills.title}</h2>
          <p className="text-gray-600">{additionalSkills.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalSkills.categories.map((category) => (
            <div key={category.name} className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200 pb-2">{category.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {category.technologies.map((tech) => renderTechItem(tech))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Experience Modal */}
      {selectedTech && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                {Object.values(skillsData)
                  .flatMap((category) => category.technologies)
                  .concat(...additionalSkills.categories.flatMap((cat) => cat.technologies))
                  .find((tech) => tech.name === selectedTech)?.icon || <div className="w-12 h-12 bg-gray-200 rounded-full"></div>}
                <h2 className="text-xl font-bold">{selectedTech}</h2>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-800 rounded-full p-1">
                    <span className="text-white text-xs font-bold px-1">XP</span>
                  </div>
                  <span className="text-sm font-medium">
                    {techDetails[selectedTech!].years || "1 Año"}
                  </span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body - Accordion sections */}
            <div className="overflow-y-auto flex-1">
              {/* Fundamentos */}
              <div className="border-b">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection("fundamentos")}
                >
                  <span className="font-medium">Fundamentos</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeSections.fundamentos ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {activeSections.fundamentos && (
                  <div className="px-4 py-2">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {techDetails[selectedTech]?.sections.fundamentos.map((item, index) => (
                        <li key={index}>{item}</li>
                      )) || <li>Información no disponible</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Características Avanzadas */}
              <div className="border-b">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection("caracteristicasAvanzadas")}
                >
                  <span className="font-medium">Características Avanzadas</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeSections.caracteristicasAvanzadas ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {activeSections.caracteristicasAvanzadas && (
                  <div className="px-4 py-2">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {techDetails[selectedTech]?.sections.caracteristicasAvanzadas.map((item, index) => (
                        <li key={index}>{item}</li>
                      )) || <li>Información no disponible</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Ecosistema y otras herramientas */}
              <div className="border-b">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection("ecosistema")}
                >
                  <span className="font-medium">Ecosistema y otras herramientas</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeSections.ecosistema ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {activeSections.ecosistema && (
                  <div className="px-4 py-2">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {techDetails[selectedTech]?.sections.ecosistema.map((item, index) => (
                        <li key={index}>{item}</li>
                      )) || <li>Información no disponible</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Proyecto y Aplicaciones prácticas */}
              <div className="border-b">
                <button
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleSection("proyectos")}
                >
                  <span className="font-medium">Proyecto y Aplicaciones prácticas</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeSections.proyectos ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {activeSections.proyectos && (
                  <div className="px-4 py-2">
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {techDetails[selectedTech]?.sections.proyectos.map((item, index) => (
                        <li key={index}>{item}</li>
                      )) || <li>Información no disponible</li>}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 flex items-center justify-between">
              <div className="text-gray-600 text-sm">Tiene dudas?...</div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium mr-2">Contáctame</span>
                <a
                  href={`https://wa.me/+1234567890?text=Hola,%20tengo%20una%20pregunta%20sobre%20${selectedTech}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                >
                  <MessageSquare size={16} />
                </a>
                <a
                  href={`mailto:tu@email.com?subject=Consulta sobre ${selectedTech}`}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
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
