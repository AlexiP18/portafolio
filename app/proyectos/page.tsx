"use client"

import type React from "react"

import { useState } from "react"
import { ExternalLink, Code2, Globe, Layers, Zap, BrainCircuit, X, Github, BookOpen, FileText } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface Project {
  id: string
  title: string
  description: string
  image: string
  images?: string[]
  category: string[]
  technologies: {
    name: string
    icon: React.ReactNode
  }[]
  link?: string
  github?: string
  documentation?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: "ecommerce",
    title: "Ecommerce Platform",
    description: "Plataforma completa de comercio electrónico con gestión de productos, carrito de compras, pasarela de pagos y panel administrativo.",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2787&auto=format&fit=crop",
    category: ["Code", "Frameworks"],
    technologies: [
      {
        name: "Angular",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" className="w-5 h-5" alt="Angular" />,
      },
      {
        name: "Tailwind CSS",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" className="w-5 h-5" alt="Tailwind CSS" />,
      },
      {
        name: "Spring Boot",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" className="w-5 h-5" alt="Spring Boot" />,
      },
    ],
    link: "https://ecommerce-demo.com",
    github: "https://github.com/AlexiP18/Ecommerce-Spring-Boot",
    documentation: "https://docs.ecommerce-demo.com",
    featured: true,
  },
  {
    id: "flight-system",
    title: "Sistema de Vuelos",
    description: "Aplicación para reserva y gestión de vuelos con búsqueda avanzada, comparación de precios y sistema de notificaciones para ofertas.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2874&auto=format&fit=crop",
    category: ["Code", "Frameworks"],
    technologies: [
      {
        name: "Angular",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" className="w-5 h-5" alt="Angular" />,
      },
      {
        name: "C#",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" className="w-5 h-5" alt="C#" />,
      },
      {
        name: "SQL Server",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" className="w-5 h-5" alt="SQL Server" />,
      },
    ],
    github: "https://github.com/AlexiP18/FlightBookings",
  },
  {
    id: "event-management",
    title: "Gestión de Eventos",
    description: "Sistema para planificación y gestión de eventos con calendario interactivo, registro de participantes y análisis de estadísticas.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    category: ["Code", "Frameworks"],
    technologies: [
      {
        name: "Angular",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" className="w-5 h-5" alt="Angular" />,
      },
      {
        name: "Spring Boot",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" className="w-5 h-5" alt="Spring Boot" />,
      },
      {
        name: "MySQL",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-5 h-5" alt="MySQL" />,
      },
    ],
    github: "https://github.com/AlexiP18/sistemaEventosFrontend",
  },
  {
    id: "credit-simulator",
    title: "Simulador de Crédito",
    description: "Herramienta financiera para simular préstamos con cálculo de tasas de interés, plazos de pago y generación de planes de amortización.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    category: ["Code", "Frameworks"],
    technologies: [
      {
        name: "Angular",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" className="w-5 h-5" alt="Angular" />,
      },
      {
        name: "MySQL",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-5 h-5" alt="MySQL" />,
      },
    ],
    github: "https://github.com/AlexiP18/Simulador_Banco",
  },
  {
    id: "sign-language",
    title: "Predicción de Lenguaje de Señas",
    description: "Aplicación de inteligencia artificial que reconoce y traduce gestos de lenguaje de señas a texto en tiempo real mediante aprendizaje automático.",
    image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=2074&auto=format&fit=crop",
    category: ["Code", "AI"],
    technologies: [
      {
        name: "Python",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-5 h-5" alt="Python" />,
      },
    ],
    github: "https://github.com/AlexiP18/sign-language-prediction",
    featured: true,
  },
  {
    id: "law-firm",
    title: "Buffet de Abogados",
    description: "Sitio web corporativo para despacho de abogados con información de servicios legales, sistema de citas en línea y blog especializado.",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=2070&auto=format&fit=crop",
    category: ["CMS", "Code"],
    technologies: [
      {
        name: "WordPress",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" className="w-5 h-5" alt="WordPress" />,
      },
      {
        name: "PHP",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" className="w-5 h-5" alt="PHP" />,
      },
    ],
    link: "https://portal.azure.com/",
  },
  {
    id: "carpio-constructora",
    title: "Carpio-Constructora",
    description: "Sitio web moderno para empresa constructora con showcase de proyectos, galería de obras realizadas, servicios especializados y formulario de contacto integrado.",
    image: "https://images.unsplash.com/photo-1487958449943-2f6bffe50e00?q=80&w=2070&auto=format&fit=crop",
    category: ["Web"],
    technologies: [
      {
        name: "Astro",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg" className="w-5 h-5" alt="Astro" />,
      },
      {
        name: "TypeScript",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className="w-5 h-5" alt="TypeScript" />,
      },
      {
        name: "JavaScript",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-5 h-5" alt="JavaScript" />,
      },
    ],
    link: "#",
  },
  {
    id: "casa-cultura-web",
    title: "Página web - Casa de la Cultura Núcleo de Tungurahua",
    description: "Portal institucional con gestión de eventos culturales, calendario de actividades educativas, galerías multimedia de exposiciones y sistema de inscripción para talleres y programas.",
    image: "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?q=80&w=2070&auto=format&fit=crop",
    category: ["CMS"],
    technologies: [
      {
        name: "WordPress",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" className="w-5 h-5" alt="WordPress" />,
      },
      {
        name: "PHP",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" className="w-5 h-5" alt="PHP" />,
      },
      {
        name: "CSS",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-5 h-5" alt="CSS" />,
      },
    ],
    link: "#",
  },
  {
    id: "casa-cultura-certificados",
    title: "Certificados - Casa de la Cultura Núcleo de Tungurahua",
    description: "Sistema de generación, administración y validación de certificados digitales con plantillas personalizables, descarga automatizada y verificación de autenticidad integrada.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    category: ["Code"],
    technologies: [
      {
        name: "PHP",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" className="w-5 h-5" alt="PHP" />,
      },
      {
        name: "JavaScript",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-5 h-5" alt="JavaScript" />,
      },
      {
        name: "CSS",
        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-5 h-5" alt="CSS" />,
      },
    ],
    link: "#",
  },
]

const filterOptions = ["All", "Code", "Frameworks", "CMS", "Web", "AI"]

const filterIcons: Record<string, React.ReactNode> = {
  All: <Layers className="w-4 h-4" />,
  Code: <Code2 className="w-4 h-4" />,
  Frameworks: <Zap className="w-4 h-4" />,
  CMS: <Globe className="w-4 h-4" />,
  Web: <Globe className="w-4 h-4" />,
  AI: <BrainCircuit className="w-4 h-4" />,
}

const isUrlAvailable = (url?: string) => Boolean(url && url !== "#")

export default function Proyectos() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true
    return project.category.includes(activeFilter)
  })

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mis Proyectos</h1>
        <p className="text-gray-600">Una colección de proyectos que demuestran mis habilidades y experiencia</p>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-gray-700 font-medium">Filter:</span>
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 flex items-center gap-2 ${
                activeFilter === filter
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-teal-300 hover:text-teal-600"
              }`}
            >
              {filterIcons[filter]}
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3] cursor-pointer"
            onClick={() => {
              setSelectedProject(project)
              setIsModalOpen(true)
            }}
          >
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Badge circular de categoría (siempre visible) */}
            {activeFilter === "All" && project.category.length > 0 && (
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                <div className="h-32 w-32 rounded-full border border-white/30 bg-white/15 backdrop-blur-md shadow-xl flex flex-col items-center justify-center gap-1 text-white transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-90">
                  <span className="[&_svg]:w-10 [&_svg]:h-10 leading-none">
                    {filterIcons[project.category[0]] ?? <Layers className="w-10 h-10" />}
                  </span>
                  <span className="text-base font-semibold uppercase tracking-normal leading-none">
                    {project.category[0]}
                  </span>
                </div>
              </div>
            )}

            {/* Overlay que aparece en hover */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
              {/* Contenido principal */}
              <div className="flex-1">
                <h3 className="text-white text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-200 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Tecnologías y enlace */}
              <div className="flex items-end justify-between">
                {/* Iconos de tecnologías */}
                <div className="flex gap-2">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="relative bg-white/20 backdrop-blur-sm rounded p-1.5 hover:bg-white/30 transition-colors group/tech"
                      title={tech.name}
                    >
                      {tech.icon}
                      {/* Tooltip que aparece en hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {tech.name}
                        {/* Flecha del tooltip */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Accesos rápidos */}
                <div className="flex gap-2">
                  {isUrlAvailable(project.documentation) && (
                    <a
                      href={project.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors group/link"
                      onClick={(e) => e.stopPropagation()}
                      title="Ver documentación"
                    >
                      <BookOpen className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform" />
                    </a>
                  )}

                  {isUrlAvailable(project.github) && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors group/link"
                      onClick={(e) => e.stopPropagation()}
                      title="Ver código"
                    >
                      <Github className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform" />
                    </a>
                  )}

                  {isUrlAvailable(project.link) && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors group/link"
                      onClick={(e) => e.stopPropagation()}
                      title="Ver proyecto"
                    >
                      <ExternalLink className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Indicador de proyecto destacado */}
            {project.featured && (
              <div className="absolute top-4 left-4 bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium">
                Destacado
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mensaje cuando no hay proyectos */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron proyectos para el filtro seleccionado.</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-6xl w-[95vw] h-[85vh] max-h-[90vh] overflow-y-auto overflow-x-visible lg:overflow-visible p-4 sm:p-5"
        >
          <DialogClose
            className="absolute right-0 top-0 z-10 inline-flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-gray-900 text-white shadow-lg transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </DialogClose>

          <DialogTitle className="sr-only">Detalles del Proyecto</DialogTitle>

          {selectedProject && (
            <div className="h-full">
              <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full h-full py-2">
                  <Carousel
                    opts={{ loop: true }}
                    className="w-full h-[260px] sm:h-[320px] lg:h-full lg:min-h-0 [&>div:first-child]:h-full [&>div:first-child>div]:h-full"
                  >
                    <CarouselContent className="h-full">
                      {(selectedProject.images && selectedProject.images.length > 0
                        ? selectedProject.images
                        : [selectedProject.image]
                      ).map((img, idx) => (
                        <CarouselItem key={idx} className="h-[260px] sm:h-[320px] lg:h-full">
                          <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                            <Image
                              src={img || "/placeholder.svg"}
                              alt={`${selectedProject.title} ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 95vw, 48vw"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 bg-white/80 hover:bg-white text-gray-800 border-none shadow-md" />
                    <CarouselNext className="right-2 bg-white/80 hover:bg-white text-gray-800 border-none shadow-md" />
                  </Carousel>
                </div>

                <div className="flex flex-col h-full py-2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{selectedProject.title}</h2>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tecnologías</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProject.technologies.map((tech) => (
                        <div
                          key={tech.name}
                          className="flex items-center gap-2 bg-teal-50 hover:bg-teal-100 transition-colors border border-teal-100 rounded-lg px-3 py-2 text-sm font-medium text-teal-800"
                        >
                          {tech.icon}
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Acerca del Proyecto</h3>
                    <div className="max-h-44 lg:max-h-56 overflow-y-auto pr-2">
                      <p className="text-gray-600 text-base leading-relaxed">{selectedProject.description}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                    {isUrlAvailable(selectedProject.documentation) ? (
                      <a
                        href={selectedProject.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                      >
                        <FileText className="w-5 h-5 shrink-0" />
                        Documentación
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gray-100 text-gray-500 border border-gray-200 font-medium py-3.5 px-6 rounded-xl cursor-not-allowed"
                      >
                        <FileText className="w-5 h-5 shrink-0" />
                        Documentación
                      </button>
                    )}

                    {isUrlAvailable(selectedProject.github) ? (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                      >
                        <Github className="w-5 h-5" />
                        Código
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gray-100 text-gray-400 border border-gray-200 font-medium py-3.5 px-6 rounded-xl cursor-not-allowed"
                      >
                        <Github className="w-5 h-5" />
                        Código
                      </button>
                    )}

                    {isUrlAvailable(selectedProject.link) ? (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Ver proyecto
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gray-100 text-gray-400 border border-gray-200 font-medium py-3.5 px-6 rounded-xl cursor-not-allowed"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Ver proyecto
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
      
