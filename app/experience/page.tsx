"use client"

import { useState } from "react"
import { MapPin, Globe, Plus, Minus, MessageSquare, Mail } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

// Experience data structure
interface Technology {
  name: string
  color: string
}

interface ExperienceItem {
  id: number
  position: string
  company: string
  logo: string
  location: string
  locationUrl: string
  websiteUrl: string
  dateRange: string
  description: string
  technologies: Technology[]
  whatsappContact: string
  emailContact: string
}

// Experience data
const experienceData: ExperienceItem[] = [
  {
    id: 1,
    position: "Web Developer",
    company: "Casa de la Cultura (Núcleo Tungurahua)",
    logo: "",
    location: "Ambato, Tungurahua - Ecuador",
    locationUrl: "https://maps.google.com/?q=Ambato,Tungurahua,Ecuador",
    websiteUrl: "https://casadelacultura.gob.ec/",
    dateRange: "2024 - Actualidad",
    description:
      "Desarrollo y mantenimiento de soluciones web para procesos institucionales y culturales. Participación en páginas informativas, módulos de certificados y mejoras continuas de la experiencia digital para usuarios y administradores.",
    technologies: [
      { name: "WordPress", color: "#21759b" },
      { name: "PHP", color: "#777bb4" },
      { name: "CSS", color: "#264de4" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "MySQL", color: "#4479a1" },
    ],
    whatsappContact: "https://wa.link/gqwair",
    emailContact: "mailto:alexispoaquiza.dev@gmail.com",
  },
  {
    id: 2,
    position: "Freelancer (Web, Soporte y IA)",
    company: "Freelancer",
    logo: "",
    location: "Ambato, Tungurahua - Ecuador",
    locationUrl: "https://maps.google.com/?q=Ambato,Tungurahua,Ecuador",
    websiteUrl: "https://github.com/AlexiP18",
    dateRange: "2022 - Actualidad",
    description:
      "Servicios freelance enfocados en desarrollo de páginas web, mantenimiento de software y hardware, montaje y optimización de PCs, e implementación de agentes de IA para automatización de tareas y asistencia operativa.",
    technologies: [
      { name: "React", color: "#61dafb" },
      { name: "Next.js", color: "#111827" },
      { name: "WordPress", color: "#21759b" },
      { name: "Soporte SW/HW", color: "#4b5563" },
      { name: "Montaje de PCs", color: "#2563eb" },
      { name: "Agentes de IA", color: "#8b5cf6" },
    ],
    whatsappContact: "https://wa.link/gqwair",
    emailContact: "mailto:alexispoaquiza.dev@gmail.com",
  },
]

const experienceLocaleContent: Record<
  number,
  {
    position: { en: string; es: string }
    dateRange: { en: string; es: string }
    description: { en: string; es: string }
  }
> = {
  1: {
    position: {
      en: "Web Developer",
      es: "Web Developer",
    },
    dateRange: {
      en: "2024 - Present",
      es: "2024 - Actualidad",
    },
    description: {
      en: "Development and maintenance of web solutions for institutional and cultural processes. Involved in informational pages, certificate modules, and continuous UX improvements for users and administrators.",
      es: "Desarrollo y mantenimiento de soluciones web para procesos institucionales y culturales. Participación en páginas informativas, módulos de certificados y mejoras continuas de la experiencia digital para usuarios y administradores.",
    },
  },
  2: {
    position: {
      en: "Freelancer (Web, Support, and AI)",
      es: "Freelancer (Web, Soporte y IA)",
    },
    dateRange: {
      en: "2022 - Present",
      es: "2022 - Actualidad",
    },
    description: {
      en: "Freelance services focused on website development, software and hardware maintenance, PC assembly and optimization, and AI agents implementation for task automation and operational support.",
      es: "Servicios freelance enfocados en desarrollo de páginas web, mantenimiento de software y hardware, montaje y optimización de PCs, e implementación de agentes de IA para automatización de tareas y asistencia operativa.",
    },
  },
}

export default function Experience() {
  const { language } = useLanguage()
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const pageText = {
    title: language === "en" ? "Work Experience" : "Experiencia Laboral",
    references: language === "en" ? "References" : "Referencias",
  }
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">{pageText.title}</h1>
      
      <div className="relative">
        {/* Timeline center line - Fixed positioning for all screen sizes */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300 z-0"></div>
        
        {/* Experience items */}
        <div className="relative">
	          {experienceData.map((item, index) => {
	            const isOdd = index % 2 === 1; // Use odd index for right placement on desktop
	            const isActive = expandedId === item.id;
              const localizedItem = experienceLocaleContent[item.id]
	            
	            return (
              <div key={item.id} className="mb-16 relative">
                {/* Timeline circle with logo - Middle z-index */}
                <div className={`absolute left-8 transform -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10`}>
                  <div 
                    className={`w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden timeline-circle
                      ${isActive ? 'border-4 border-blue-500 shadow-lg shadow-blue-400/30' : 'border-4 border-gray-300'}
                      ${isActive ? 'timeline-active-point' : ''}`}
                  >
                    <div className="w-10 h-10 relative">
                      {/* Company logo */}
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                        {item.logo ? (
                          <Image 
                            src={item.logo} 
                            alt={`${item.company} logo`} 
                            width={40} 
                            height={40}
                            className="object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLElement;
                              target.textContent = item.company.charAt(0);
                              target.classList.add("bg-blue-500", "text-white", "font-bold", "flex", "items-center", "justify-center");
                            }}
                          />
                        ) : (
                          <span className="text-xl font-bold">{item.company.charAt(0)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle glow effect instead of ping animations */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md z-0 timeline-glow"></div>
                  )}
                </div>
                
                {/* Card positioning - Highest z-index */}
                <div className={`
                  relative z-20
                  ${isOdd ? 
                    'ml-16 md:ml-[55%] md:mr-0 md:w-[43%]' : 
                    'ml-16 md:ml-0 md:mr-[52%] md:w-[45%]'}
                `}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    {/* Card Header */}
                    <div 
                      className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleExpand(item.id)}
                    >
	                      <h3 className="font-bold text-lg text-gray-800">{localizedItem?.position[language] ?? item.position}</h3>
	                      <div className="flex items-center">
	                        <span className="text-gray-600 text-sm mr-3">{localizedItem?.dateRange[language] ?? item.dateRange}</span>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                          {isActive ? (
                            <Minus size={16} className="text-gray-600" />
                          ) : (
                            <Plus size={16} className="text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Card Body (expandable) */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="p-4 max-h-60 overflow-y-auto">
                        {/* Location and Website */}
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center text-sm">
                            <MapPin size={14} className="mr-1 text-gray-500" />
                            <a 
                              href={item.locationUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {item.location}
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <Globe size={14} className="mr-1 text-gray-500" />
                            <a 
                              href={item.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {item.websiteUrl}
                            </a>
                          </div>
                        </div>
                        
	                        {/* Description */}
	                        <p className="text-gray-600 text-sm mb-4">
	                          {localizedItem?.description[language] ?? item.description}
	                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <span 
                              key={tech.name} 
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full transition-colors duration-300 hover:text-white"
                              style={{ 
                                "--hover-bg": tech.color 
                              } as React.CSSProperties}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = tech.color;
                                e.currentTarget.style.color = '#ffffff';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '';
                                e.currentTarget.style.color = '';
                              }}
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
	                    {/* Card Footer */}
	                    <div className="flex items-center justify-between p-3 bg-gray-50 border-t">
	                      <div className="text-gray-600 text-sm">{pageText.references}</div>
                      <div className="flex items-center space-x-2">
                        <a 
                          href={item.whatsappContact}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600"
                        >
                          <MessageSquare size={14} />
                        </a>
                        <a 
                          href={item.emailContact}
                          className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                          <Mail size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
