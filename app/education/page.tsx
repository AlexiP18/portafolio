"use client"

import { useState, useEffect } from "react"
import { GraduationCap, MapPin, CalendarClock, Award, ExternalLink, RotateCw, BookOpen, Clock, Code, Presentation, ChevronLeft, ChevronRight, ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { coursesData, educationData, eventsData } from "./data"

const sortByYearFromCurrentDown = <T extends { year: number }>(items: T[]) => {
  const currentYear = new Date().getFullYear()
  return [...items].sort((a, b) => {
    const aIsCurrentOrPast = a.year <= currentYear
    const bIsCurrentOrPast = b.year <= currentYear

    if (aIsCurrentOrPast && !bIsCurrentOrPast) return -1
    if (!aIsCurrentOrPast && bIsCurrentOrPast) return 1
    return b.year - a.year
  })
}

export default function Education() {
  const { language } = useLanguage()
  const [isAccordionOpen, setIsAccordionOpen] = useState(true)
  const [isCoursesOpen, setIsCoursesOpen] = useState(true) // New state for courses accordion
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Filter states
  const [modalityFilter, setModalityFilter] = useState<string | null>(null)
  const [technologyFilter, setTechnologyFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [courseYearFilter, setCourseYearFilter] = useState<string | null>(null)
  const [courseSearchQuery, setCourseSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState(() => sortByYearFromCurrentDown(coursesData))

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  
  // Eventos Académicos states
  const [isEventsOpen, setIsEventsOpen] = useState(true);
  const [modalityEventFilter, setModalityEventFilter] = useState<string | null>(null)
  const [typeEventFilter, setTypeEventFilter] = useState<string | null>(null)
  const [eventYearFilter, setEventYearFilter] = useState<string | null>(null)
  const [eventSearchQuery, setEventSearchQuery] = useState("")
  const [filteredEvents, setFilteredEvents] = useState(() => sortByYearFromCurrentDown(eventsData))
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)
  
  // Event pagination state
  const [currentEventPage, setCurrentEventPage] = useState(1)
  const eventsPerPage = 6

  const courseYears = Array.from(new Set(coursesData.map((course) => course.year))).sort((a, b) => b - a)
  const eventYears = Array.from(new Set(eventsData.map((event) => event.year))).sort((a, b) => b - a)
  
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
    let result = [...coursesData]
    
    if (modalityFilter) {
      result = result.filter(course => course.modality === modalityFilter);
    }
    
    if (technologyFilter) {
      result = result.filter(course => course.technology === technologyFilter);
    }
    
    if (typeFilter) {
      result = result.filter(course => course.type === typeFilter);
    }

    if (courseYearFilter) {
      result = result.filter((course) => course.year === Number(courseYearFilter))
    }

    const normalizedSearch = courseSearchQuery.trim().toLowerCase()
    if (normalizedSearch) {
      result = result.filter((course) =>
        [course.title, course.platform, course.technology, course.type].some((field) =>
          field.toLowerCase().includes(normalizedSearch)
        )
      )
    }

    setFilteredCourses(sortByYearFromCurrentDown(result))
  }, [modalityFilter, technologyFilter, typeFilter, courseYearFilter, courseSearchQuery])

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
  }, [modalityFilter, technologyFilter, typeFilter, courseYearFilter, courseSearchQuery]);

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
    let result = [...eventsData]
    
    if (modalityEventFilter) {
      result = result.filter(event => event.modality === modalityEventFilter);
    }
    
    if (typeEventFilter) {
      result = result.filter(event => event.type === typeEventFilter);
    }

    if (eventYearFilter) {
      result = result.filter((event) => event.year === Number(eventYearFilter))
    }

    const normalizedSearch = eventSearchQuery.trim().toLowerCase()
    if (normalizedSearch) {
      result = result.filter((event) =>
        [event.title, event.organization, event.type, event.role].some((field) =>
          field.toLowerCase().includes(normalizedSearch)
        )
      )
    }

    setFilteredEvents(sortByYearFromCurrentDown(result))
  }, [modalityEventFilter, typeEventFilter, eventYearFilter, eventSearchQuery])
  
  // Reset to first page when event filters change
  useEffect(() => {
    setCurrentEventPage(1);
  }, [modalityEventFilter, typeEventFilter, eventYearFilter, eventSearchQuery]);

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
    setModalityFilter(null)
    setTechnologyFilter(null)
    setTypeFilter(null)
    setCourseYearFilter(null)
    setCourseSearchQuery("")
  }

  const resetEventFilters = () => {
    setModalityEventFilter(null)
    setTypeEventFilter(null)
    setEventYearFilter(null)
    setEventSearchQuery("")
  };

  const pageText = {
    title: language === "en" ? "Education" : "Educación",
    titleEyebrow: language === "en" ? "Academic Journey" : "Trayectoria Académica",
    titleSubtitle:
      language === "en"
        ? "Training, certifications and events that support my technical profile."
        : "Formación, certificaciones y eventos que respaldan mi perfil técnico.",
    professionalTraining: language === "en" ? "Professional Training" : "Formación Profesional",
    professionalTrainingSubtitle:
      language === "en" ? "Academic degree and institutional validation" : "Título académico y validación institucional",
    coursesAndDiplomas: language === "en" ? "Courses - Diplomas" : "Cursos - Diplomados",
    coursesAndDiplomasSubtitle:
      language === "en" ? "Specialization and continuous technical learning" : "Especialización y aprendizaje técnico continuo",
    academicEvents: language === "en" ? "Academic Events" : "Eventos Académicos",
    academicEventsSubtitle:
      language === "en" ? "Conferences and knowledge exchange participation" : "Participación en conferencias e intercambio de conocimiento",
    filterBy: language === "en" ? "Filter by:" : "Filtrar por:",
    clearFilters: language === "en" ? "Clear filters" : "Limpiar filtros",
    search: language === "en" ? "Search" : "Buscar",
    searchCoursesPlaceholder:
      language === "en" ? "Search by course, platform, type..." : "Buscar por curso, plataforma, tipo...",
    searchEventsPlaceholder:
      language === "en" ? "Search by event, organization, role..." : "Buscar por evento, organización, rol...",
    year: language === "en" ? "Year" : "Año",
    allYears: language === "en" ? "All years" : "Todos los años",
    modality: language === "en" ? "Modality" : "Modalidad",
    technology: language === "en" ? "Technology" : "Tecnología",
    type: language === "en" ? "Type" : "Tipo",
    choose: language === "en" ? "Choose..." : "Elija...",
    viewCertificate: language === "en" ? "View certificate" : "Ver certificado",
    noCourses:
      language === "en"
        ? "No courses found for the selected filters."
        : "No se encontraron cursos con los filtros seleccionados.",
    noEvents:
      language === "en"
        ? "No academic events found for the selected filters."
        : "No se encontraron eventos académicos con los filtros seleccionados.",
  }

  const modalityLabelMap: Record<string, { en: string; es: string }> = {
    Presencial: { en: "On-site", es: "Presencial" },
    Hibrido: { en: "Hybrid", es: "Híbrido" },
    Virtual: { en: "Virtual", es: "Virtual" },
  }

  const technologyLabelMap: Record<string, { en: string; es: string }> = {
    Frontend: { en: "Frontend", es: "Frontend" },
    Backend: { en: "Backend", es: "Backend" },
    "Bases de datos": { en: "Databases", es: "Bases de datos" },
    Despliegue: { en: "Deployment", es: "Despliegue" },
    Otros: { en: "Others", es: "Otros" },
  }

  const courseTypeLabelMap: Record<string, { en: string; es: string }> = {
    Curso: { en: "Course", es: "Curso" },
    Diplomado: { en: "Diploma", es: "Diplomado" },
  }

  const eventTypeLabelMap: Record<string, { en: string; es: string }> = {
    Seminario: { en: "Seminar", es: "Seminario" },
    Congreso: { en: "Congress", es: "Congreso" },
    Conferencia: { en: "Conference", es: "Conferencia" },
  }

  const eventRoleLabelMap: Record<string, { en: string; es: string }> = {
    Asistente: { en: "Attendee", es: "Asistente" },
    Expositor: { en: "Speaker", es: "Expositor" },
    Moderador: { en: "Moderator", es: "Moderador" },
  }

  const formatHours = (value: string) => {
    if (language === "es") return value
    return value.replace(/Horas?/g, "Hours").replace(/hora/g, "hour")
  }

  const getCourseFrontLogoSrc = (course: (typeof coursesData)[number]) => {
    const platform = course.platform.toLowerCase()
    if (platform.includes("udemy")) return "/images/education/udemy.svg"
    if (platform.includes("cisco")) return "/images/education/cisco.svg"
    return null
  }

  const getEventFrontLogoSrc = (event: (typeof eventsData)[number]) => {
    return educationData[0]?.logo ?? event.organizationLogo ?? null
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 md:p-8 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="hidden sm:block h-16 w-1 rounded-full bg-slate-800 mt-1" />
            <div>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">
                {pageText.titleEyebrow}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{pageText.title}</h1>
              <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">{pageText.titleSubtitle}</p>
            </div>
          </div>
          <div className="hidden sm:flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <GraduationCap className="h-7 w-7 md:h-8 md:w-8" />
          </div>
        </div>
        <div className="px-6 md:px-8 pb-4">
          <div className="h-px w-full bg-slate-200" />
        </div>
      </div>
      
      {/* Formación Profesional */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl w-full mb-8">
        {/* Accordion Header */}
        <div 
          className="flex items-center justify-between p-4 md:p-5 bg-white cursor-pointer border-b border-gray-200"
          onClick={toggleAccordion}
        >
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="h-10 w-1.5 rounded-full bg-teal-500" />
            <div className="p-1.5 md:p-2 bg-teal-50 border border-teal-100 rounded-lg">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">{pageText.professionalTraining}</h2>
              <p className="text-xs text-gray-500 truncate">{pageText.professionalTrainingSubtitle}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 hover:bg-teal-100 transition-all duration-300">
            <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-white border border-teal-200 text-xs font-bold">
              {educationData.length}
            </span>
            <GraduationCap size={14} />
            <ChevronDown size={16} className={`transition-transform duration-300 ${isAccordionOpen ? "rotate-180" : ""}`} />
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
                  className={`relative education-card h-[304px] w-full transform transition-all duration-700 ${
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
                  <div className="h-12 rounded-t-lg border border-gray-200 border-b-0 bg-gradient-to-r from-gray-50 to-white p-2 flex items-center justify-center">
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
                      <div className="absolute inset-0 backface-hidden bg-white border border-t-0 border-b-0 border-gray-200 overflow-hidden">
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
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-50 to-white border border-t-0 border-b-0 border-gray-200">
                        {/* External Link Icon */}
                        <a 
                          href={education.institutionUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-teal-500 transition-all duration-300 z-10 hover:shadow-md group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={24} className="text-gray-600 group-hover:text-white transition-all duration-300" />
                        </a>
                        
                        {/* Body with details - More compact spacing */}
                        <div className="p-3 flex flex-col justify-center h-full space-y-3">
                          <div className="flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                            <div className="p-1.5 bg-gray-100 rounded-full shadow-inner">
                              <MapPin className="w-4.5 h-4.5 text-gray-600" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{education.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <div className="p-1.5 bg-blue-100 rounded-full shadow-inner">
                              <CalendarClock className="w-4.5 h-4.5 text-blue-600" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{education.startDate}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                            <div className="p-1.5 bg-green-100 rounded-full shadow-inner">
                              <CalendarClock className="w-4.5 h-4.5 text-green-600" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{education.endDate}</span>
                          </div>
                          
                          <div className="animate-fadeIn text-center" style={{ animationDelay: '0.4s' }}>
                            <Link 
                              href={education.certificateUrl}
                              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all duration-300 hover:shadow group"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Award className="w-4.5 h-4.5 text-amber-500 group-hover:scale-110 transition-all duration-300" />
                              <span className="text-sm font-semibold">{pageText.viewCertificate}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Static Footer - Same height */}
                  <div className="h-[46px] bg-gradient-to-r from-gray-50 to-white rounded-b-lg border border-t-0 border-gray-200 p-2 flex items-center justify-center">
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
          className="flex items-center justify-between p-4 md:p-5 bg-white cursor-pointer border-b border-gray-200"
          onClick={toggleCoursesAccordion}
        >
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="h-10 w-1.5 rounded-full bg-blue-500" />
            <div className="p-1.5 md:p-2 bg-blue-50 border border-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-700" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">{pageText.coursesAndDiplomas}</h2>
              <p className="text-xs text-gray-500 truncate">{pageText.coursesAndDiplomasSubtitle}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 transition-all duration-300">
            <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-white border border-blue-200 text-xs font-bold">
              {coursesData.length}
            </span>
            <BookOpen size={14} />
            <ChevronDown size={16} className={`transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        
        {/* Courses Content - Added min-height for better vertical spacing */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isCoursesOpen ? 'min-h-[700px] max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 md:p-6 min-h-[860px] flex flex-col">
            {/* Filters section - Improved layout and clean filters button */}
            <div className="mb-6">
              <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4 md:p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-gray-700 font-semibold">
                    <RotateCw size={14} className="text-blue-600" />
                    {pageText.filterBy}
                  </div>
                  
                  {/* Reset Filters Button - Now with icon */}
                  {(modalityFilter || technologyFilter || typeFilter || courseYearFilter || courseSearchQuery.trim()) && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-300"
                    >
                      <RotateCw size={14} className="text-blue-600" />
                      <span className="text-sm font-medium">{pageText.clearFilters}</span>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
                  <div className="md:col-span-2">
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <Search className="w-3.5 h-3.5 text-blue-600" />
                      {pageText.search}
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={courseSearchQuery}
                        onChange={(e) => setCourseSearchQuery(e.target.value)}
                        placeholder={pageText.searchCoursesPlaceholder}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-gray-700 placeholder:text-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <Presentation className="w-3.5 h-3.5 text-blue-600" />
                      {pageText.modality}
                    </label>
                    <div className="relative">
                      <select
                        value={modalityFilter || ""}
                        onChange={(e) => setModalityFilter(e.target.value || null)}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm appearance-none"
                      >
                        <option value="">{pageText.choose}</option>
                        <option value="Presencial">{modalityLabelMap.Presencial[language]}</option>
                        <option value="Hibrido">{modalityLabelMap.Hibrido[language]}</option>
                        <option value="Virtual">{modalityLabelMap.Virtual[language]}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <Code className="w-3.5 h-3.5 text-blue-600" />
                      {pageText.technology}
                    </label>
                    <div className="relative">
                      <select
                        value={technologyFilter || ""}
                        onChange={(e) => setTechnologyFilter(e.target.value || null)}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm appearance-none"
                      >
                        <option value="">{pageText.choose}</option>
                        <option value="Frontend">{technologyLabelMap.Frontend[language]}</option>
                        <option value="Backend">{technologyLabelMap.Backend[language]}</option>
                        <option value="Bases de datos">{technologyLabelMap["Bases de datos"][language]}</option>
                        <option value="Despliegue">{technologyLabelMap.Despliegue[language]}</option>
                        <option value="Otros">{technologyLabelMap.Otros[language]}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      </svg>
                      {pageText.type}
                    </label>
                    <div className="relative">
                      <select
                        value={typeFilter || ""}
                        onChange={(e) => setTypeFilter(e.target.value || null)}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm appearance-none"
                      >
                        <option value="">{pageText.choose}</option>
                        <option value="Curso">{courseTypeLabelMap.Curso[language]}</option>
                        <option value="Diplomado">{courseTypeLabelMap.Diplomado[language]}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <CalendarClock className="w-3.5 h-3.5 text-blue-600" />
                      {pageText.year}
                    </label>
                    <div className="relative">
                      <select
                        value={courseYearFilter || ""}
                        onChange={(e) => setCourseYearFilter(e.target.value || null)}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm appearance-none"
                      >
                        <option value="">{pageText.allYears}</option>
                        {courseYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
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
            <div className="sm:block flex-1">
              {/* Scrollable container for mobile */}
              <div className="sm:block max-h-[500px] overflow-y-auto pb-4 sm:max-h-none sm:overflow-visible">
                {/* Courses Grid - Now using paginated courses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[550px]">
                  {currentCourses.length > 0 ? currentCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className={`relative h-[264px] transform transition-all duration-700 ${
                        isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <span className="absolute top-2 right-2 z-20 inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3.5 py-1.5 text-sm font-semibold">
                        {course.year}
                      </span>
                      <div className="h-12 rounded-t-lg border border-gray-200 border-b-0 bg-gray-50 p-2 flex items-center justify-center">
                        <h3 className="font-bold text-center text-gray-700">{course.platform}</h3>
                      </div>

                      <div
                        className="relative -mb-px h-[148px] w-full"
                        onMouseEnter={() => setHoveredCourse(course.id)}
                        onMouseLeave={() => setHoveredCourse(null)}
                      >
                        <div
                          className={`absolute inset-0 bg-white border border-t-0 border-b-0 border-gray-200 overflow-hidden transition-opacity duration-300 ${
                            hoveredCourse === course.id ? "opacity-0 pointer-events-none" : "opacity-100"
                          }`}
                        >
                          <div className="h-full w-full grid place-items-center p-3">
                            {(() => {
                              const courseLogoSrc = getCourseFrontLogoSrc(course)
                              return courseLogoSrc ? (
                                <img
                                  src={courseLogoSrc}
                                  alt={`${course.platform} logo`}
                                  className="h-auto w-[170px] object-contain"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-semibold px-2 text-center">
                                  {course.platform}
                                </div>
                              )
                            })()}
                          </div>
                        </div>

                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-white border border-t-0 border-b-0 border-gray-200 transition-opacity duration-300 ${
                            hoveredCourse === course.id ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <a
                            href={course.courseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={24} className="text-gray-600" />
                          </a>

                          <div className="p-3.5 flex flex-col justify-between h-full">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                  </svg>
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{courseTypeLabelMap[course.type]?.[language] ?? course.type}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <Presentation size={15} className="text-gray-700" />
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{modalityLabelMap[course.modality]?.[language] ?? course.modality}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <Code size={15} className="text-gray-700" />
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{technologyLabelMap[course.technology]?.[language] ?? course.technology}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <Clock size={15} className="text-gray-700" />
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{formatHours(course.hours)}</span>
                              </div>
                            </div>

                            <div className="mt-1.5 text-center">
                              <a
                                href={course.certificateUrl}
                                className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all duration-300 hover:shadow-md group"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Award size={17} className="text-amber-500 group-hover:scale-110 transition-all duration-300" />
                                <span className="font-bold text-[15px] leading-none">{pageText.viewCertificate}</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {isMobile && (
                          <div className="absolute top-2 left-2 z-30 bg-white/70 rounded-full p-1 shadow-sm animate-pulse">
                            <RotateCw size={14} className="text-gray-600 animate-spin-slow" />
                          </div>
                        )}
                      </div>

                      <div className="-mt-px h-[68px] bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-4 flex items-center justify-center">
                        <p className="font-medium text-gray-700 text-center text-sm line-clamp-2">{course.title}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center p-8 text-gray-500">
                      {pageText.noCourses}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Pagination Controls */}
            <div className="mt-auto pt-8 flex items-center justify-center">
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
          className="flex items-center justify-between p-4 md:p-5 bg-white cursor-pointer border-b border-gray-200"
          onClick={toggleEventsAccordion}
        >
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="h-10 w-1.5 rounded-full bg-purple-500" />
            <div className="p-1.5 md:p-2 bg-purple-50 border border-purple-100 rounded-lg">
              <Presentation className="w-5 h-5 md:w-6 md:h-6 text-purple-700" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">{pageText.academicEvents}</h2>
              <p className="text-xs text-gray-500 truncate">{pageText.academicEventsSubtitle}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 hover:bg-purple-100 transition-all duration-300">
            <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-white border border-purple-200 text-xs font-bold">
              {eventsData.length}
            </span>
            <Presentation size={14} />
            <ChevronDown size={16} className={`transition-transform duration-300 ${isEventsOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        
        {/* Events Content */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isEventsOpen ? 'min-h-[700px] max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 md:p-6 min-h-[860px] flex flex-col">
            {/* Events Filters section */}
            <div className="mb-6">
              <div className="rounded-xl border border-purple-100 bg-purple-50/30 p-4 md:p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-gray-700 font-semibold">
                    <RotateCw size={14} className="text-purple-600" />
                    {pageText.filterBy}
                  </div>
                  
                  {/* Reset Filters Button */}
                  {(modalityEventFilter || typeEventFilter || eventYearFilter || eventSearchQuery.trim()) && (
                    <button
                      onClick={resetEventFilters}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-300"
                    >
                      <RotateCw size={14} className="text-purple-600" />
                      <span className="text-sm font-medium">{pageText.clearFilters}</span>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                  <div className="md:col-span-2">
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <Search className="w-3.5 h-3.5 text-purple-600" />
                      {pageText.search}
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={eventSearchQuery}
                        onChange={(e) => setEventSearchQuery(e.target.value)}
                        placeholder={pageText.searchEventsPlaceholder}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-gray-700 placeholder:text-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <Presentation className="w-3.5 h-3.5 text-purple-600" />
                      {pageText.modality}
                    </label>
                    <div className="relative">
                      <select
                        value={modalityEventFilter || ""}
                        onChange={(e) => setModalityEventFilter(e.target.value || null)}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 text-sm appearance-none"
                      >
                        <option value="">{pageText.choose}</option>
                        <option value="Presencial">{modalityLabelMap.Presencial[language]}</option>
                        <option value="Hibrido">{modalityLabelMap.Hibrido[language]}</option>
                        <option value="Virtual">{modalityLabelMap.Virtual[language]}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                        <rect x="4" y="5" width="16" height="16" rx="2" />
                        <line x1="16" y1="3" x2="16" y2="7" />
                        <line x1="8" y1="3" x2="8" y2="7" />
                        <line x1="4" y1="11" x2="20" y2="11" />
                        <rect x="8" y="15" width="2" height="2" />
                      </svg>
                      {pageText.type}
                    </label>
                    <div className="relative">
                      <select
                        value={typeEventFilter || ""}
                        onChange={(e) => setTypeEventFilter(e.target.value || null)}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 text-sm appearance-none"
                      >
                        <option value="">{pageText.choose}</option>
                        <option value="Seminario">{eventTypeLabelMap.Seminario[language]}</option>
                        <option value="Congreso">{eventTypeLabelMap.Congreso[language]}</option>
                        <option value="Conferencia">{eventTypeLabelMap.Conferencia[language]}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1.5">
                      <CalendarClock className="w-3.5 h-3.5 text-purple-600" />
                      {pageText.year}
                    </label>
                    <div className="relative">
                      <select
                        value={eventYearFilter || ""}
                        onChange={(e) => setEventYearFilter(e.target.value || null)}
                        className="block w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 text-sm appearance-none"
                      >
                        <option value="">{pageText.allYears}</option>
                        {eventYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
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
            <div className="sm:block flex-1">
              {/* Scrollable container for mobile */}
              <div className="sm:block max-h-[500px] overflow-y-auto pb-4 sm:max-h-none sm:overflow-visible">
                {/* Events Grid - Using paginated events */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[550px]">
                  {currentEvents.length > 0 ? currentEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className={`relative h-[264px] transform transition-all duration-700 ${
                        isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <span className="absolute top-2 right-2 z-20 inline-flex items-center rounded-full bg-purple-100 text-purple-700 px-3.5 py-1.5 text-sm font-semibold">
                        {event.year}
                      </span>
                      <div className="h-12 rounded-t-lg border border-gray-200 border-b-0 bg-gray-50 p-2 flex items-center justify-center">
                        <h3 className="font-bold text-center text-gray-700">{event.organization}</h3>
                      </div>

                      <div
                        className="relative -mb-px h-[148px] w-full"
                        onMouseEnter={() => setHoveredEvent(event.id)}
                        onMouseLeave={() => setHoveredEvent(null)}
                      >
                        <div
                          className={`absolute inset-0 bg-white border border-t-0 border-b-0 border-gray-200 overflow-hidden transition-opacity duration-300 ${
                            hoveredEvent === event.id ? "opacity-0 pointer-events-none" : "opacity-100"
                          }`}
                        >
                          <div className="h-full w-full grid place-items-center p-3">
                            {(() => {
                              const eventLogoSrc = getEventFrontLogoSrc(event)
                              return eventLogoSrc ? (
                                <img
                                  src={eventLogoSrc}
                                  alt={`${event.organization} logo`}
                                  className="h-[108px] w-[108px] max-h-full max-w-full object-contain"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-semibold px-2 text-center">
                                  {event.organization}
                                </div>
                              )
                            })()}
                          </div>
                        </div>

                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-white border border-t-0 border-b-0 border-gray-200 transition-opacity duration-300 ${
                            hoveredEvent === event.id ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <a
                            href={event.eventUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={24} className="text-gray-600" />
                          </a>

                          <div className="p-3.5 flex flex-col justify-between h-full">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                    <rect x="4" y="5" width="16" height="16" rx="2" />
                                    <line x1="16" y1="3" x2="16" y2="7" />
                                    <line x1="8" y1="3" x2="8" y2="7" />
                                    <line x1="4" y1="11" x2="20" y2="11" />
                                    <rect x="8" y="15" width="2" height="2" />
                                  </svg>
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{eventTypeLabelMap[event.type]?.[language] ?? event.type}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <Presentation size={15} className="text-gray-700" />
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{modalityLabelMap[event.modality]?.[language] ?? event.modality}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                  </svg>
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{eventRoleLabelMap[event.role]?.[language] ?? event.role}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                </div>
                                <span className="text-gray-800 font-semibold text-sm">{event.duration}</span>
                              </div>
                            </div>

                            <div className="mt-1.5 text-center">
                              <a
                                href={event.certificateUrl}
                                className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all duration-300 hover:shadow-md group"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Award size={17} className="text-amber-500 group-hover:scale-110 transition-all duration-300" />
                                <span className="font-bold text-[15px] leading-none">{pageText.viewCertificate}</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        {isMobile && (
                          <div className="absolute top-2 left-2 z-30 bg-white/70 rounded-full p-1 shadow-sm animate-pulse">
                            <RotateCw size={14} className="text-gray-600 animate-spin-slow" />
                          </div>
                        )}
                      </div>

                      <div className="-mt-px h-[68px] bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-4 flex items-center justify-center">
                        <p className="font-medium text-gray-700 text-center text-sm line-clamp-2">{event.title}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full text-center p-8 text-gray-500">
                      {pageText.noEvents}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Event Pagination Controls */}
            <div className="mt-auto pt-8 flex items-center justify-center">
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
