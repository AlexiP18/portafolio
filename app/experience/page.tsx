"use client"

import { useState } from "react"
import { MapPin, Globe, Plus, Minus, MessageSquare, Mail, Briefcase, Building2, CalendarClock, Cpu, Wrench, BrainCircuit, Sparkles } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

const techIconMap: Record<string, string> = {
  Angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  WordPress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
}

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
    logo: "/images/experience/cce_logo.svg",
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
    logo: "/images/experience/freelancer_logo.svg",
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
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const currentYear = new Date().getFullYear()
  const startYears = experienceData
    .map((item) => Number.parseInt(item.dateRange.slice(0, 4), 10))
    .filter((year) => Number.isFinite(year))
  const minStartYear = startYears.length > 0 ? Math.min(...startYears) : null
  const yearsOfExperience = minStartYear ? Math.max(1, currentYear - minStartYear + 1) : experienceData.length

  const pageText = {
    title: language === "en" ? "Work Experience" : "Experiencia Laboral",
    eyebrow: language === "en" ? "Career Path" : "Trayectoria Profesional",
    subtitle:
      language === "en"
        ? "Experience in institutional and freelance projects, building digital products with practical impact."
        : "Experiencia en proyectos institucionales y freelance, construyendo productos digitales con impacto práctico.",
    references: language === "en" ? "References" : "Referencias",
    roles: language === "en" ? "Roles" : "Roles",
    activeYears: language === "en" ? "Active Years" : "Años Activo",
    timeline: language === "en" ? "Timeline" : "Línea de tiempo",
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-12">
      <section className="mb-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                <Briefcase className="h-3.5 w-3.5" />
                {pageText.eyebrow}
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">{pageText.title}</h1>
              <p className="mt-3 max-w-3xl text-sm md:text-base text-slate-600">{pageText.subtitle}</p>
            </div>
            <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
              <Building2 className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{pageText.roles}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{experienceData.length}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{pageText.activeYears}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{yearsOfExperience}+</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{pageText.timeline}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {minStartYear ?? currentYear} - {currentYear}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <div className="absolute left-7 md:left-1/2 md:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-teal-200 via-slate-300 to-teal-200 z-0"></div>

        <div className="relative space-y-12 md:space-y-14">
          {experienceData.map((item, index) => {
            const isOdd = index % 2 === 1
            const isActive = expandedId === item.id
            const localizedItem = experienceLocaleContent[item.id]

            return (
              <div key={item.id} className="relative timeline-item">
                <div className="absolute left-7 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                  <div
                    className={`w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden timeline-circle ${
                      isActive
                        ? "border-4 border-teal-500 shadow-lg shadow-teal-300/40 timeline-active-point"
                        : "border-4 border-slate-300"
                    }`}
                  >
                    <div className="w-11 h-11 relative">
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-full text-slate-700">
                        {item.logo ? (
                          <Image
                            src={item.logo}
                            alt={`${item.company} logo`}
                            width={44}
                            height={44}
                            className="object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLElement
                              target.textContent = item.company.charAt(0)
                              target.classList.add(
                                "bg-teal-500",
                                "text-white",
                                "font-bold",
                                "flex",
                                "items-center",
                                "justify-center"
                              )
                            }}
                          />
                        ) : (
                          <span className="text-lg font-bold">{item.company.charAt(0)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isActive && <div className="absolute inset-0 rounded-full bg-teal-300/30 blur-md z-0 timeline-glow"></div>}
                </div>

                <div
                  className={`relative z-20 ml-16 ${
                    isOdd ? "md:ml-[54%] md:w-[43%]" : "md:ml-0 md:mr-[54%] md:w-[43%]"
                  }`}
                >
                  <article
                    className={`overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300 ${
                      isActive ? "border-teal-200 shadow-teal-100/70" : "border-slate-200 hover:shadow-lg"
                    }`}
                  >
                    <div
                      className="flex flex-wrap items-start justify-between gap-3 border-b bg-gradient-to-r from-slate-50 to-white p-4 md:p-5 cursor-pointer"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.company}</p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900 leading-tight">
                          {localizedItem?.position[language] ?? item.position}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          <CalendarClock className="h-3.5 w-3.5" />
                          {localizedItem?.dateRange[language] ?? item.dateRange}
                        </span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
                          {isActive ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </div>
                    </div>

                    <div className={`grid transition-[grid-template-rows] duration-300 ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="space-y-4 p-4 md:p-5 max-h-72 overflow-y-auto">
                          <div className="flex flex-col gap-2.5">
                            <a
                              href={item.locationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-teal-200 hover:text-teal-700 transition-colors"
                            >
                              <MapPin size={14} className="mt-0.5 shrink-0" />
                              <span>{item.location}</span>
                            </a>
                            <a
                              href={item.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-blue-200 hover:text-blue-700 transition-colors"
                            >
                              <Globe size={14} className="mt-0.5 shrink-0" />
                              <span className="break-all">{item.websiteUrl}</span>
                            </a>
                          </div>

                          <p className="text-sm text-slate-600 leading-relaxed">{localizedItem?.description[language] ?? item.description}</p>

                          <div className="flex flex-wrap items-center gap-2">
                            {item.technologies.map((tech) => {
                              const iconUrl = techIconMap[tech.name]
                              return (
                                <span
                                  key={tech.name}
                                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium h-fit"
                                  style={{
                                    color: tech.color,
                                    borderColor: `${tech.color}66`,
                                    backgroundColor: `${tech.color}1a`,
                                  }}
                                >
                                  {iconUrl ? (
                                    <img src={iconUrl} alt={tech.name} className="w-3.5 h-3.5 object-contain" />
                                  ) : tech.name.includes("Soporte") ? (
                                    <Wrench className="w-3.5 h-3.5" />
                                  ) : tech.name.includes("Montaje") ? (
                                    <Cpu className="w-3.5 h-3.5" />
                                  ) : tech.name.includes("IA") ? (
                                    <BrainCircuit className="w-3.5 h-3.5" />
                                  ) : (
                                    <Sparkles className="w-3.5 h-3.5" />
                                  )}
                                  <span>{tech.name}</span>
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t bg-slate-50/80 px-4 py-3">
                      <div className="text-sm font-medium text-slate-600">{pageText.references}</div>
                      <div className="flex items-center gap-2">
                        <a
                          href={item.whatsappContact}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                        >
                          <MessageSquare size={14} />
                        </a>
                        <a
                          href={item.emailContact}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                          <Mail size={14} />
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
