"use client"

import { useState } from "react"
import { MapPin, Globe, Plus, Minus, MessageSquare, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

// Mock data for experiences
const experienceData: ExperienceItem[] = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "Google",
    logo: "https://crystalpng.com/wp-content/uploads/2025/05/google-logo-png.png", // Replace with actual logo path
    location: "Ambato, Tungurahua - Ecuador",
    locationUrl: "https://maps.google.com/?q=Ambato,Tungurahua,Ecuador",
    websiteUrl: "https://www.google.com",
    dateRange: "Enero 2025 - Act.",
    description: `Improving ads ranking models on the core TikTok product. Experience working on modeling two-tower architectures like DeepFM, Wide & deep learning, etc. Working on Large Language Models (LLM) pretraining and Large Multi-modal Model (LMM) finetuning strategies.`,
    technologies: [
      { name: "HTML", color: "#e34c26" },
      { name: "CSS", color: "#264de4" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "React", color: "#61dafb" },
      { name: "Angular", color: "#dd0031" }
    ],
    whatsappContact: "https://wa.link/gqwair",
    emailContact: "mailto:contacto@google.com"
  },
  {
    id: 2,
    position: "Backend Developer",
    company: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/2048px-Facebook_icon_%28black%29.svg.png", // Replace with actual logo path
    location: "Ambato, Tungurahua - Ecuador",
    locationUrl: "https://maps.google.com/?q=Ambato,Tungurahua,Ecuador",
    websiteUrl: "https://www.facebook.com",
    dateRange: "Marzo 2023 - Febrero 2024",
    description: `Desarrollo de APIs RESTful y GraphQL para aplicaciones de alto rendimiento. Implementación de microservicios y optimización de bases de datos para mejorar la escalabilidad y el rendimiento de las aplicaciones.`,
    technologies: [
      { name: "Node.js", color: "#339933" },
      { name: "Python", color: "#3776ab" },
      { name: "Express", color: "#000000" },
      { name: "MongoDB", color: "#47a248" },
      { name: "GraphQL", color: "#e535ab" }
    ],
    whatsappContact: "https://wa.link/gqwair",
    emailContact: "mailto:contacto@facebook.com"
  },
  {
    id: 3,
    position: "DevOps Engineer",
    company: "Instagram",
    logo: "https://static.vecteezy.com/system/resources/previews/042/148/632/non_2x/instagram-logo-instagram-social-media-icon-free-png.png", // Replace with actual logo path
    location: "Ambato, Tungurahua - Ecuador",
    locationUrl: "https://maps.google.com/?q=Ambato,Tungurahua,Ecuador",
    websiteUrl: "https://www.kavak.com",
    dateRange: "Septiembre 2022 - Febrero 2023",
    description: `Implementación y gestión de infraestructura como código utilizando Terraform y CloudFormation. Configuración de pipelines CI/CD para automatizar el despliegue de aplicaciones. Monitoreo y optimización del rendimiento de sistemas en la nube.`,
    technologies: [
      { name: "Docker", color: "#2496ed" },
      { name: "Kubernetes", color: "#326ce5" },
      { name: "AWS", color: "#ff9900" },
      { name: "Terraform", color: "#7b42bc" },
      { name: "Jenkins", color: "#d33833" }
    ],
    whatsappContact: "https://wa.link/gqwair",
    emailContact: "mailto:contacto@kavak.com"
  },
  {
    id: 4,
    position: "Wordpress Designer",
    company: "Freelancer",
    logo: "https://cdn-icons-png.flaticon.com/512/9495/9495859.png", // Replace with actual logo path
    location: "Ambato, Tungurahua - Ecuador",
    locationUrl: "https://maps.google.com/?q=Ambato,Tungurahua,Ecuador",
    websiteUrl: "https://www.microsoft.com",
    dateRange: "Abril 2022 - Agosto 2022",
    description: `Diseño y prototipado de interfaces de usuario para aplicaciones web y móviles. Investigación de usuarios y pruebas de usabilidad para mejorar la experiencia de usuario de los productos.`,
    technologies: [
      { name: "Figma", color: "#f24e1e" },
      { name: "Adobe XD", color: "#ff61f6" },
      { name: "Sketch", color: "#fa6400" },
      { name: "InVision", color: "#ff3366" },
      { name: "Zeplin", color: "#fdbd39" }
    ],
    whatsappContact: "https://wa.link/gqwair",
    emailContact: "mailto:contacto@microsoft.com"
  },
  {
    id: 5,
    position: "Técnico en Mantenimiento de PCs",
    company: "Freelancer",
    logo: "https://cdn-icons-png.flaticon.com/512/9495/9495859.png", // Replace with actual logo path
    location: "Ambato, Tungurahua - Ecuador",
    locationUrl: "https://maps.google.com/?q=Ambato,Tungurahua,Ecuador",
    websiteUrl: "https://www.amazon.com",
    dateRange: "Enero 2022 - Marzo 2022",
    description: `Responsable del diagnóstico, reparación y mantenimiento integral de equipos informáticos, garantizando la continuidad operativa y la máxima productividad para los usuarios. Proporcioné soporte técnico especializado tanto a nivel de hardware como de software, aplicando una metodología de resolución de problemas para identificar y solucionar incidencias de manera eficiente.`,
    technologies: [
      { name: "PCs", color: "#02569b" }
    ],
    whatsappContact: "https://wa.link/gqwair",
    emailContact: "mailto:contacto@amazon.com"
  }
]

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Experiencia Laboral</h1>
      
      <div className="relative">
        {/* Timeline center line - Fixed positioning for all screen sizes */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300 z-0"></div>
        
        {/* Experience items */}
        <div className="relative">
          {experienceData.map((item, index) => {
            const isOdd = index % 2 === 1; // Use odd index for right placement on desktop
            const isActive = expandedId === item.id;
            
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
                      <h3 className="font-bold text-lg text-gray-800">{item.position}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-600 text-sm mr-3">{item.dateRange}</span>
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
                          {item.description}
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
                      <div className="text-gray-600 text-sm">Referencias</div>
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