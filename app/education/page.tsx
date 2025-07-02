"use client"

import { useState, useEffect } from "react"
import { GraduationCap, MapPin, CalendarClock, Award, ExternalLink, RotateCw, Plus, Minus, BookOpen, Clock, Code, Presentation, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Education data
interface EducationItem {
  id: number
  institution: string
  degree: string
  logo: string
  location: string
  startDate: string
  endDate: string
  certificateUrl: string
  institutionUrl: string
}

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "Universidad Técnica de Ambato",
    degree: "Ingeniería de Software",
    logo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg", // Replace with actual logo path
    location: "Ambato, Ecuador",
    startDate: "Marzo 2020",
    endDate: "Diciembre 2025",
    certificateUrl: "/documents/certificate-uta.pdf", // Replace with actual document path
    institutionUrl: "https://www.uta.edu.ec/"
  },
  {
    id: 2,
    institution: "Pontificia Universidad Católica del Ecuador",
    degree: "Maestría en Sistemas de Información mención \"Data Science\"",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Logo_PUCESD.png", // Replace with actual logo path
    location: "Ambato, Ecuador",
    startDate: "Marzo 2020",
    endDate: "Diciembre 2025",
    certificateUrl: "/documents/certificate-puce.pdf", // Replace with actual document path
    institutionUrl: "https://www.pucesa.edu.ec/"
  }
]

// Course data structure - Updated with additional fields needed for the flip card back
interface Course {
  id: number;
  title: string;
  platform: string;
  platformLogo: string;
  modality: "Presencial" | "Hibrido" | "Virtual";
  technology: "Frontend" | "Backend" | "Bases de datos" | "Despliegue" | "Otros";
  type: "Curso" | "Diplomado";  // New field
  hours: string;
  certificateUrl: string;
  courseUrl: string;
}

// Mock data for courses - Updated with hours field
const coursesData: Course[] = [
  {
    id: 1,
    title: "SQL - Curso completo de Bases de Datos",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Bases de datos",
    type: "Curso",  // Added type
    hours: "25 Horas",
    certificateUrl: "https://drive.google.com/file/d/17uA0bEVQWsZDrYDYMGgPVww0T7ngm3XY/view?usp=drive_link",
    courseUrl: "https://www.udemy.com/course/sql-curso-completo/"
  },
  {
    id: 2,
    title: "Angular - The Complete Guide (2025 Edition)",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Frontend",
    type: "Curso",  // Added type
    hours: "32 Horas",
    certificateUrl: "/documents/certificate-angular.pdf",
    courseUrl: "https://drive.google.com/file/d/1adS7sk4GXfNoIQMs3RvsDyaqPdJJF0w4/view?usp=drive_link"
  },
  {
    id: 3,
    title: "Python Essential 2",
    platform: "CISCO",
    platformLogo: "https://www.netacad.com/sfa-assets/images/svg/netacad_logo_black.svg",
    modality: "Hibrido",
    technology: "Otros",
    type: "Curso",  // Added type
    hours: "20 Horas",
    certificateUrl: "https://drive.google.com/file/d/1Sq5KVEsOvKhUVm6kjSxN7cZFQnYk2Kds/view?usp=drive_link",
    courseUrl: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html"
  },
  {
    id: 4,
    title: "Diseño Web con HTML5 y CSS3",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Frontend",
    type: "Curso",  // Added type
    hours: "20 Horas",
    certificateUrl: "https://drive.google.com/file/d/17vK_nWoBhHQq81BGoC82P8uMxhGGHf9n/view?usp=drive_link",
    courseUrl: "https://www.udemy.com/course/diseno-web-con-html5-css3/"
  },
  {
    id: 5,
    title: "Curso De Jasperreports y Jaspersoft Studio",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Backend",
    type: "Curso",  // Added type
    hours: "20 Horas",
    certificateUrl: "https://drive.google.com/file/d/1Xp7nTh2T_2J8gGcmij4-A-8dKiYxGLwb/view?usp=drive_link",
    courseUrl: "https://aws.amazon.com/training/course-descriptions/cloud-practitioner-essentials/"
  },
  {
    id: 6,
    title: "SQL Server Analysis",
    platform: "UDEMY",
    platformLogo: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
    modality: "Virtual",
    technology: "Bases de datos",
    type: "Curso",  // Added type
    hours: "20 Horas",
    certificateUrl: "https://drive.google.com/file/d/1BWuNBOUtW1r1TQYlxt-deecLQpUE1OMs/view?usp=drive_link",
    courseUrl: "https://www.udemy.com/course/mongodb-the-complete-developers-guide/"
  }
];

// Add this interface for academic events
interface AcademicEvent {
  id: number;
  title: string;
  organization: string;
  organizationLogo: string;
  modality: "Presencial" | "Hibrido" | "Virtual";
  type: "Seminario" | "Congreso" | "Conferencia";
  role: string;
  duration: string;
  certificateUrl: string;
  eventUrl: string;
}

// Add this mock data before the export default function
const eventsData: AcademicEvent[] = [
  {
    id: 1,
    title: "Nuevas Tendencias en Desarrollo Web",
    organization: "Universidad Técnica de Ambato",
    organizationLogo: "https://univercimas.com/wp-content/uploads/2021/04/Universidad-Tecnica-de-Ambato.jpg",
    modality: "Virtual",
    type: "Seminario",
    role: "Asistente",
    duration: "8 horas - 1 semana",
    certificateUrl: "/documents/certificate-seminar-web.pdf",
    eventUrl: "https://www.uta.edu.ec/eventos/desarrollo-web"
  },
  {
    id: 2,
    title: "Congreso Internacional de Ingeniería de Software",
    organization: "IEEE",
    organizationLogo: "https://entrepreneurship.ieee.org/wp-content/uploads/2024/09/ieee-logo.png",
    modality: "Hibrido",
    type: "Congreso",
    role: "Expositor",
    duration: "16 horas - 2 días",
    certificateUrl: "/documents/certificate-ieee.pdf",
    eventUrl: "https://www.ieee.org/eventos"
  },
  {
    id: 3,
    title: "Inteligencia Artificial para Desarrolladores",
    organization: "Microsoft",
    organizationLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    modality: "Virtual",
    type: "Conferencia",
    role: "Asistente",
    duration: "4 horas - 1 día",
    certificateUrl: "/documents/certificate-ms-ai.pdf",
    eventUrl: "https://www.microsoft.com/eventos/ai"
  },
  {
    id: 4,
    title: "DevOps y CI/CD para Equipos Ágiles",
    organization: "GitLab",
    organizationLogo: "https://about.gitlab.com/images/press/logo/svg/gitlab-logo-500.svg",
    modality: "Virtual",
    type: "Seminario",
    role: "Asistente",
    duration: "10 horas - 3 días",
    certificateUrl: "/documents/certificate-gitlab-devops.pdf",
    eventUrl: "https://gitlab.com/eventos/devops"
  },
  {
    id: 5,
    title: "Arquitectura de Microservicios",
    organization: "Amazon Web Services",
    organizationLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png",
    modality: "Presencial",
    type: "Conferencia",
    role: "Moderador",
    duration: "6 horas - 1 día",
    certificateUrl: "/documents/certificate-aws-microservices.pdf",
    eventUrl: "https://aws.amazon.com/eventos/microservicios"
  },
  {
    id: 6,
    title: "Seguridad en Aplicaciones Web",
    organization: "OWASP",
    organizationLogo: "https://owasp.org/assets/images/logo.png",
    modality: "Hibrido",
    type: "Congreso",
    role: "Asistente",
    duration: "12 horas - 2 días",
    certificateUrl: "/documents/certificate-owasp.pdf",
    eventUrl: "https://owasp.org/eventos/seguridad"
  }
];

export default function Education() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true)
  const [isCoursesOpen, setIsCoursesOpen] = useState(true) // New state for courses accordion
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Filter states
  const [modalityFilter, setModalityFilter] = useState<string | null>(null)
  const [technologyFilter, setTechnologyFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = useState(coursesData)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  
  // Eventos Académicos states
  const [isEventsOpen, setIsEventsOpen] = useState(true);
  const [modalityEventFilter, setModalityEventFilter] = useState<string | null>(null);
  const [typeEventFilter, setTypeEventFilter] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  
  // Event pagination state
  const [currentEventPage, setCurrentEventPage] = useState(1);
  const eventsPerPage = 6;
  
  // Check if device is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter courses when filters change
  useEffect(() => {
    let result = coursesData;
    
    if (modalityFilter) {
      result = result.filter(course => course.modality === modalityFilter);
    }
    
    if (technologyFilter) {
      result = result.filter(course => course.technology === technologyFilter);
    }
    
    if (typeFilter) {
      result = result.filter(course => course.type === typeFilter);
    }
    
    setFilteredCourses(result);
  }, [modalityFilter, technologyFilter, typeFilter]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCourses.length / cardsPerPage);
  
  // Get current courses to display
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCard, indexOfLastCard);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [modalityFilter, technologyFilter, typeFilter]);

  // Calculate total pages for events
  const totalEventPages = Math.ceil(filteredEvents.length / eventsPerPage);
  
  // Get current events to display
  const indexOfLastEvent = currentEventPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  
  // Events pagination functions
  const paginateEvents = (pageNumber: number) => setCurrentEventPage(pageNumber);
  const nextEventPage = () => setCurrentEventPage(prev => Math.min(prev + 1, totalEventPages));
  const prevEventPage = () => setCurrentEventPage(prev => Math.max(prev - 1, 1));
  
  // Filter events when filters change
  useEffect(() => {
    let result = eventsData;
    
    if (modalityEventFilter) {
      result = result.filter(event => event.modality === modalityEventFilter);
    }
    
    if (typeEventFilter) {
      result = result.filter(event => event.type === typeEventFilter);
    }
    
    setFilteredEvents(result);
  }, [modalityEventFilter, typeEventFilter]);
  
  // Reset to first page when event filters change
  useEffect(() => {
    setCurrentEventPage(1);
  }, [modalityEventFilter, typeEventFilter]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }
  
  const toggleCoursesAccordion = () => {
    setIsCoursesOpen(!isCoursesOpen)
  }

  const toggleEventsAccordion = () => {
    setIsEventsOpen(!isEventsOpen);
  };

  // Animation to stagger the appearance of cards
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Reset filters
  const resetFilters = () => {
    setModalityFilter(null);
    setTechnologyFilter(null);
    setTypeFilter(null);
  }

  const resetEventFilters = () => {
    setModalityEventFilter(null);
    setTypeEventFilter(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-10 text-center">
        Educación
      </h1>
      
      {/* Formación Profesional */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl w-full mb-8">
        {/* Accordion Header */}
        <div 
          className="flex items-center justify-between p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white cursor-pointer border-b border-gray-200"
          onClick={toggleAccordion}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-teal-500/10 rounded-lg shadow-inner">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-gray-800">Formación Profesional</h2>
          </div>
          <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-100 transition-all duration-300">
            {isAccordionOpen ? (
              <Minus size={16} className="text-gray-600" />
            ) : (
              <Plus size={16} className="text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Accordion Content with vertical scroll on mobile when needed */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isAccordionOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {/* Added max-height and overflow for mobile */}
          <div className="p-3 md:p-4 max-h-[70vh] overflow-y-auto">
            {/* 3-column grid with wider cards and smaller gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {educationData.map((education, index) => (
                <div 
                  key={education.id} 
                  className={`relative education-card h-[320px] w-full transform transition-all duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(education.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Mobile flip hint animation - Adjusted position */}
                  {isMobile && (
                    <div className="absolute top-[120px] right-4 z-30 bg-white/70 rounded-full p-2 shadow-md animate-pulse">
                      <RotateCw size={16} className="text-teal-600 animate-spin-slow" />
                    </div>
                  )}
                  
                  {/* Static Header - Same height */}
                  <div className="h-12 rounded-t-lg shadow-md border border-gray-200 border-b-0 bg-gradient-to-r from-gray-50 to-white p-2 flex items-center justify-center">
                    <h3 className="font-semibold text-base text-gray-800 text-center line-clamp-2">{education.institution}</h3>
                  </div>
                  
                  {/* Flipping Body - Reduced height */}
                  <div className="perspective-1000">
                    <div 
                      className={`relative h-[210px] w-full transition-all duration-500 transform-style-3d ${
                        hoveredCard === education.id ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Body Front */}
                      <div className="absolute inset-0 backface-hidden bg-white shadow-md border border-t-0 border-b-0 border-gray-200 overflow-hidden">
                        {/* Body - Logo with subtle animation */}
                        <div className="p-3 flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-transparent">
                          <div className="w-36 h-36 relative transition-all duration-500">
                            <Image 
                              src={education.logo} 
                              alt={`${education.institution} logo`}
                              fill
                              className="object-contain drop-shadow-md"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://via.placeholder.com/150?text=Logo";
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Body Back - More compact */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-50 to-white border border-t-0 border-b-0 border-gray-200 shadow-md">
                        {/* External Link Icon */}
                        <a 
                          href={education.institutionUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:bg-teal-500 transition-all duration-300 z-10 hover:shadow-md group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-all duration-300" />
                        </a>
                        
                        {/* Body with details - More compact spacing */}
                        <div className="p-3 flex flex-col justify-center h-full space-y-3">
                          <div className="flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                            <div className="p-1 bg-gray-100 rounded-full shadow-inner">
                              <MapPin className="w-4 h-4 text-gray-600" />
                            </div>
                            <span className="text-gray-700 text-xs">{education.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <div className="p-1 bg-blue-100 rounded-full shadow-inner">
                              <CalendarClock className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-700 text-xs">{education.startDate}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                            <div className="p-1 bg-green-100 rounded-full shadow-inner">
                              <CalendarClock className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700 text-xs">{education.endDate}</span>
                          </div>
                          
                          <div className="animate-fadeIn text-center" style={{ animationDelay: '0.4s' }}>
                            <Link 
                              href={education.certificateUrl}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all duration-300 hover:shadow group"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Award className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-all duration-300" />
                              <span className="text-xs">Ver certificado</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Static Footer - Same height */}
                  <div className="h-[46px] bg-gradient-to-r from-gray-50 to-white rounded-b-lg border border-t-0 border-gray-200 p-2 flex items-center justify-center shadow-md">
                    <p className="font-medium text-gray-700 text-center text-xs line-clamp-2">{education.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cursos - Diplomados Section - Increased height */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl w-full">
        {/* Courses Accordion Header */}
        <div 
          className="flex items-center justify-between p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white cursor-pointer border-b border-gray-200"
          onClick={toggleCoursesAccordion}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-blue-500/10 rounded-lg shadow-inner">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-gray-800">Cursos - Diplomados</h2>
          </div>
          <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-all duration-300">
            {isCoursesOpen ? (
              <Minus size={16} className="text-gray-600" />
            ) : (
              <Plus size={16} className="text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Courses Content - Added min-height for better vertical spacing */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isCoursesOpen ? 'min-h-[700px] max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 md:p-6">
            {/* Filters section - Improved layout and clean filters button */}
            <div className="mb-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-700 font-medium">Filtrar por:</div>
                  
                  {/* Reset Filters Button - Now with icon */}
                  {(modalityFilter || technologyFilter || typeFilter) && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300"
                    >
                      <RotateCw size={14} className="text-blue-600" />
                      <span className="text-sm font-medium">Limpiar filtros</span>
                    </button>
                  )}
                </div>
                
                {/* Filters row - All filters in one row on both mobile and desktop */}
                <div className="flex items-center gap-3">
                  {/* Modality Filter - Equal width on all screens */}
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Modalidad</label>
                    <div className="relative">
                      <select
                        value={modalityFilter || ''}
                        onChange={(e) => setModalityFilter(e.target.value || null)}
                        className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm appearance-none"
                      >
                        <option value="">Elija...</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Hibrido">Híbrido</option>
                        <option value="Virtual">Virtual</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Technology Filter - Equal width on all screens */}
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tecnología</label>
                    <div className="relative">
                      <select
                        value={technologyFilter || ''}
                        onChange={(e) => setTechnologyFilter(e.target.value || null)}
                        className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm appearance-none"
                      >
                        <option value="">Elija...</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Bases de datos">Bases de datos</option>
                        <option value="Despliegue">Despliegue</option>
                        <option value="Otros">Otros</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Type Filter - Equal width on all screens */}
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tipo</label>
                    <div className="relative">
                      <select
                        value={typeFilter || ''}
                        onChange={(e) => setTypeFilter(e.target.value || null)}
                        className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm appearance-none"
                      >
                        <option value="">Elija...</option>
                        <option value="Curso">Curso</option>
                        <option value="Diplomado">Diplomado</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile-only scrollable container for course cards */}
            <div className="sm:block">
              {/* Scrollable container for mobile */}
              <div className="sm:block max-h-[500px] overflow-y-auto pb-4 sm:max-h-none sm:overflow-visible">
                {/* Courses Grid - Now using paginated courses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[550px] sm:min-h-0">
                  {currentCourses.length > 0 ? currentCourses.map((course, index) => (
                    <div 
                      key={course.id} 
                      className={`relative h-72 transform transition-all duration-700 ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Static Header - Always visible */}
                      <div className="h-12 rounded-t-lg shadow-md border border-gray-200 border-b-0 bg-gray-50 p-2 flex items-center justify-center">
                        <h3 className="font-bold text-center text-gray-700">{course.platform}</h3>
                      </div>
                      
                      {/* Flipping Body for Course Cards */}
                      <div className="perspective-1000">
                        <div 
                          className={`relative h-[140px] w-full transition-all duration-500 transform-style-3d ${
                            hoveredCourse === course.id ? 'rotate-y-180' : ''
                          }`}
                          onMouseEnter={() => setHoveredCourse(course.id)}
                          onMouseLeave={() => setHoveredCourse(null)}
                        >
                          {/* Body Front */}
                          <div className="absolute inset-0 backface-hidden bg-white shadow-md border border-t-0 border-b-0 border-gray-200 overflow-hidden">
                            {/* Logo */}
                            <div className="p-6 flex items-center justify-center h-full">
                              <div className="w-40 h-20 relative">
                                <Image 
                                  src={course.platformLogo} 
                                  alt={`${course.platform} logo`}
                                  fill
                                  className="object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://via.placeholder.com/150?text=Logo";
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* Body Back - Updated with course type and repositioned button */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-50 to-white border border-t-0 border-b-0 border-gray-200 shadow-md">
                            {/* External Link Icon */}
                            <a 
                              href={course.courseUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:bg-gray-100 transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} className="text-gray-600" />
                            </a>
                            
                            {/* Content - With optimized spacing */}
                            <div className="p-3 flex flex-col justify-between h-full">
                              <div className="space-y-2">
                                {/* Added Type field */}
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                    </svg>
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{course.type}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <Presentation size={14} className="text-gray-700" />
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{course.modality}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <Code size={14} className="text-gray-700" />
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{course.technology}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <Clock size={14} className="text-gray-700" />
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{course.hours}</span>
                                </div>
                              </div>
                              
                              {/* Certificate button - Positioned at boundary like in Events section */}
                              <div className="mt-1 -mb-1.5 text-center">
                                <a 
                                  href={course.certificateUrl}
                                  className="inline-flex items-center justify-center space-x-1 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all duration-300 hover:shadow-md group"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Award size={14} className="text-amber-500 group-hover:scale-110 transition-all duration-300" />
                                  <span className="font-medium text-xs">Ver certificado</span>
                                </a>
                              </div>
                            </div>
                          </div>
                          
                          {/* Mobile flip indicator - inside flipping body */}
                          {isMobile && (
                            <div className="absolute top-2 left-2 z-30 bg-white/70 rounded-full p-1 shadow-sm animate-pulse">
                              <RotateCw size={14} className="text-gray-600 animate-spin-slow" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Static Footer - Always visible - Increased height */}
                      <div className="h-[68px] bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-4 flex items-center justify-center shadow-md">
                        <p className="font-medium text-gray-700 text-center text-sm line-clamp-2">{course.title}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center p-8 text-gray-500">
                      No se encontraron cursos con los filtros seleccionados.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Pagination Controls */}
            <div className="mt-8 flex items-center justify-center">
              <nav className="flex items-center space-x-1">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1 || filteredCourses.length <= cardsPerPage}
                  className={`p-2 rounded-full ${currentPage === 1 || filteredCourses.length <= cardsPerPage ? 
                    'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                    'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      disabled={filteredCourses.length <= cardsPerPage}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                        currentPage === index + 1 ? 
                        'bg-blue-600 text-white' : 
                        filteredCourses.length <= cardsPerPage ? 
                        'bg-gray-100 text-gray-400 cursor-not-allowed' :
                        'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages || filteredCourses.length <= cardsPerPage}
                  className={`p-2 rounded-full ${currentPage === totalPages || filteredCourses.length <= cardsPerPage ? 
                    'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                    'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Eventos Académicos Section - New section */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl w-full mt-8">
        {/* Events Accordion Header */}
        <div 
          className="flex items-center justify-between p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white cursor-pointer border-b border-gray-200"
          onClick={toggleEventsAccordion}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-purple-500/10 rounded-lg shadow-inner">
              <Presentation className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-gray-800">Eventos Académicos</h2>
          </div>
          <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-purple-100 transition-all duration-300">
            {isEventsOpen ? (
              <Minus size={16} className="text-gray-600" />
            ) : (
              <Plus size={16} className="text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Events Content */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isEventsOpen ? 'min-h-[700px] max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 md:p-6">
            {/* Events Filters section */}
            <div className="mb-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-700 font-medium">Filtrar por:</div>
                  
                  {/* Reset Filters Button */}
                  {(modalityEventFilter || typeEventFilter) && (
                    <button
                      onClick={resetEventFilters}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all duration-300"
                    >
                      <RotateCw size={14} className="text-purple-600" />
                      <span className="text-sm font-medium">Limpiar filtros</span>
                    </button>
                  )}
                </div>
                
                {/* Filters row - Side by side on all screen sizes */}
                <div className="flex flex-row items-center gap-3">
                  {/* Modality Filter */}
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Modalidad</label>
                    <div className="relative">
                      <select
                        value={modalityEventFilter || ''}
                        onChange={(e) => setModalityEventFilter(e.target.value || null)}
                        className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-sm appearance-none"
                      >
                        <option value="">Elija...</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Hibrido">Híbrido</option>
                        <option value="Virtual">Virtual</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Type Filter - New options for events */}
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tipo</label>
                    <div className="relative">
                      <select
                        value={typeEventFilter || ''}
                        onChange={(e) => setTypeEventFilter(e.target.value || null)}
                        className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-purple-500 text-sm appearance-none"
                      >
                        <option value="">Elija...</option>
                        <option value="Seminario">Seminario</option>
                        <option value="Congreso">Congreso</option>
                        <option value="Conferencia">Conferencia</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Events Cards */}
            <div className="sm:block">
              {/* Scrollable container for mobile */}
              <div className="sm:block max-h-[500px] overflow-y-auto pb-4 sm:max-h-none sm:overflow-visible">
                {/* Events Grid - Using paginated events */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[550px] sm:min-h-0">
                  {currentEvents.length > 0 ? currentEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      className={`relative h-72 transform transition-all duration-700 ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Static Header - Always visible */}
                      <div className="h-12 rounded-t-lg shadow-md border border-gray-200 border-b-0 bg-gray-50 p-2 flex items-center justify-center">
                        <h3 className="font-bold text-center text-gray-700">{event.organization}</h3>
                      </div>
                      
                      {/* Flipping Body for Event Cards */}
                      <div className="perspective-1000">
                        <div 
                          className={`relative h-[140px] w-full transition-all duration-500 transform-style-3d ${
                            hoveredEvent === event.id ? 'rotate-y-180' : ''
                          }`}
                          onMouseEnter={() => setHoveredEvent(event.id)}
                          onMouseLeave={() => setHoveredEvent(null)}
                        >
                          {/* Body Front */}
                          <div className="absolute inset-0 backface-hidden bg-white shadow-md border border-t-0 border-b-0 border-gray-200 overflow-hidden">
                            {/* Logo */}
                            <div className="p-6 flex items-center justify-center h-full">
                              <div className="w-40 h-20 relative">
                                <Image 
                                  src={event.organizationLogo} 
                                  alt={`${event.organization} logo`}
                                  fill
                                  className="object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://via.placeholder.com/150?text=Logo";
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* Body Back - Based on the provided image */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-50 to-white border border-t-0 border-b-0 border-gray-200 shadow-md">
                            {/* External Link Icon */}
                            <a 
                              href={event.eventUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:bg-gray-100 transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} className="text-gray-600" />
                            </a>
                            
                            {/* Content based on the provided image - Optimized spacing */}
                            <div className="p-3 flex flex-col justify-between h-full">
                              <div className="space-y-2">
                                {/* Added Event Type with icon */}
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                      <rect x="4" y="5" width="16" height="16" rx="2" />
                                      <line x1="16" y1="3" x2="16" y2="7" />
                                      <line x1="8" y1="3" x2="8" y2="7" />
                                      <line x1="4" y1="11" x2="20" y2="11" />
                                      <rect x="8" y="15" width="2" height="2" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{event.type}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <Presentation size={14} className="text-gray-700" />
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{event.modality}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="9" cy="7" r="4"></circle>
                                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{event.role}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{event.duration}</span>
                                </div>
                              </div>
                              
                              {/* Certificate button - Positioned at bottom boundary */}
                              <div className="mt-1 -mb-1.5 text-center">
                                <a 
                                  href={event.certificateUrl}
                                  className="inline-flex items-center justify-center space-x-1 px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all duration-300 hover:shadow-md group"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Award size={14} className="text-amber-500 group-hover:scale-110 transition-all duration-300" />
                                  <span className="font-medium text-xs">Ver certificado</span>
                                </a>
                              </div>
                            </div>
                          </div>
                          
                          {/* Mobile flip indicator */}
                          {isMobile && (
                            <div className="absolute top-2 left-2 z-30 bg-white/70 rounded-full p-1 shadow-sm animate-pulse">
                              <RotateCw size={14} className="text-gray-600 animate-spin-slow" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Static Footer */}
                      <div className="h-[68px] bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-4 flex items-center justify-center shadow-md">
                        <p className="font-medium text-gray-700 text-center text-sm line-clamp-2">{event.title}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center p-8 text-gray-500">
                      No se encontraron eventos académicos con los filtros seleccionados.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Event Pagination Controls */}
            <div className="mt-8 flex items-center justify-center">
              <nav className="flex items-center space-x-1">
                <button 
                  onClick={prevEventPage}
                  disabled={currentEventPage === 1 || filteredEvents.length <= eventsPerPage}
                  className={`p-2 rounded-full ${currentEventPage === 1 || filteredEvents.length <= eventsPerPage ? 
                    'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                    'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalEventPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginateEvents(index + 1)}
                      disabled={filteredEvents.length <= eventsPerPage}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                        currentEventPage === index + 1 ? 
                        'bg-purple-600 text-white' : 
                        filteredEvents.length <= eventsPerPage ? 
                        'bg-gray-100 text-gray-400 cursor-not-allowed' :
                        'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={nextEventPage}
                  disabled={currentEventPage === totalEventPages || filteredEvents.length <= eventsPerPage}
                  className={`p-2 rounded-full ${currentEventPage === totalEventPages || filteredEvents.length <= eventsPerPage ? 
                    'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                    'bg-purple-50 text-purple-600 hover:bg-purple-100'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
