"use client"

import type React from "react"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string[]
  technologies: {
    name: string
    icon: React.ReactNode
  }[]
  link: string
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
    link: "https://github.com/AlexiP18/Ecommerce-Spring-Boot",
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
    link: "https://github.com/AlexiP18/FlightBookings",
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
    link: "https://github.com/AlexiP18/sistemaEventosFrontend",
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
    link: "https://github.com/AlexiP18/Simulador_Banco",
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
    link: "https://github.com/AlexiP18/sign-language-prediction",
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
]

const filterOptions = ["All", "Code", "Frameworks", "CMS", "AI"]

export default function Proyectos() {
  const [activeFilter, setActiveFilter] = useState("All")

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
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-white text-gray-700 border-gray-300 hover:border-teal-300 hover:text-teal-600"
              }`}
            >
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
            className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3]"
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

                {/* Botón de enlace */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors group/link"
                >
                  <ExternalLink className="w-5 h-5 text-white group-hover/link:scale-110 transition-transform" />
                </a>
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
    </div>
  )
}
      