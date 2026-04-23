"use client"

import type { LucideIcon } from "lucide-react"
import { Award, Briefcase, Code2, ExternalLink, GraduationCap, Heart, Sparkles, Star, Target, User, Youtube } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/components/language-provider"

interface AboutSection {
  id: string
  title: { en: string; es: string }
  description: { en: string; es: string }
  icon: LucideIcon
  technologies?: string[]
}

interface LearningReference {
  name: string
  platform: string
  focus: string
  insight: string
  url: string
}

const profile = {
  name: "Alexis Poaquiza",
  role: {
    en: "Software Engineer",
    es: "Ingeniero de Software",
  },
  summary: {
    en: "Future software engineer focused on building modern digital solutions with measurable impact. I work with a practical mindset in frontend and DevOps, integrating backend foundations to deliver maintainable, secure, and scalable products. I am motivated by continuous learning, technical quality, and solving real-world problems through software.",
    es: "Futuro ingeniero de software enfocado en construir soluciones digitales modernas con impacto medible. Trabajo con un enfoque práctico en frontend y DevOps, integrando bases backend para entregar productos mantenibles, seguros y escalables. Me motiva el aprendizaje continuo, la calidad técnica y la resolución de problemas reales mediante software.",
  },
}

const aboutSections: AboutSection[] = [
  {
    id: "introduction",
    title: {
      en: "About Me",
      es: "Sobre mí",
    },
    description: {
      en: "I consider myself a creative, disciplined, and results-oriented person. I enjoy turning ideas into real products with a practical approach in every development stage, from planning and implementation to optimization and continuous improvement. I adapt quickly to new contexts and stay focused on delivering measurable value.",
      es: "Me considero una persona creativa, disciplinada y orientada a resultados. Disfruto convertir ideas en productos reales, manteniendo un enfoque práctico en cada etapa del desarrollo, desde la planificación e implementación hasta la optimización y mejora continua. Me adapto rápido a nuevos contextos y mantengo el foco en aportar valor medible.",
    },
    icon: User,
  },
  {
    id: "experience",
    title: {
      en: "Experience and Specialization",
      es: "Experiencia y especialización",
    },
    description: {
      en: "I specialize in Frontend and DevOps, with Backend knowledge to build end-to-end scalable solutions.",
      es: "Me especializo en Frontend y DevOps, con conocimientos en Backend para construir soluciones integrales y escalables de extremo a extremo.",
    },
    technologies: [
      "Angular",
      "Astro",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Spring Boot",
      "PHP",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Firebase",
    ],
    icon: Briefcase,
  },
  {
    id: "passion",
    title: {
      en: "Passion and Motivation",
      es: "Pasión y motivaciones",
    },
    description: {
      en: "Software engineering allows me to transform ideas into solutions with real impact. My main motivation is to keep learning and taking on technical challenges.",
      es: "La ingeniería de software me permite transformar ideas en soluciones con impacto real. Mi motivación principal es seguir aprendiendo y enfrentar retos técnicos que me impulsen a crecer.",
    },
    icon: Heart,
  },
  {
    id: "achievements",
    title: {
      en: "Relevant Achievements",
      es: "Logros relevantes",
    },
    description: {
      en: "I have worked on notable web development and automation projects, and collaborated in teams that strengthened my technical and leadership skills.",
      es: "He trabajado en proyectos destacados de desarrollo web y automatización, y he participado en entornos colaborativos que fortalecieron mis capacidades técnicas y de liderazgo.",
    },
    icon: Award,
  },
  {
    id: "focus",
    title: {
      en: "Current Focus",
      es: "Enfoque actual",
    },
    description: {
      en: "I am looking for opportunities to keep growing in roles where I can add value in frontend and DevOps while strengthening backend architecture foundations.",
      es: "Busco oportunidades para seguir creciendo en roles donde pueda aportar valor en frontend y DevOps, mientras consolido una base sólida en arquitectura backend.",
    },
    icon: Target,
  },
  {
    id: "hobbies",
    title: {
      en: "Hobbies",
      es: "Hobbies",
    },
    description: {
      en: "I enjoy hiking, hands-on activities like papercraft and origami, and artistic drawing. These activities strengthen my creativity and focus.",
      es: "Disfruto del senderismo, las actividades manuales como papercraft y origami, y el dibujo artístico. Estas actividades fortalecen mi creatividad y enfoque.",
    },
    icon: Star,
  },
]

const techIconMap: Record<string, string> = {
  Angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  Astro: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  AWS: "https://cdn.simpleicons.org/amazonaws/FF9900",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
}

const learningReferences: LearningReference[] = [
  {
    name: "midudev",
    platform: "YouTube",
    focus: "JavaScript, React y tendencias de desarrollo web",
    insight: "Me ayuda a mantenerme actualizado y a aterrizar conceptos complejos en soluciones prácticas.",
    url: "https://www.youtube.com/@midulive",
  },
  {
    name: "MoureDev",
    platform: "YouTube",
    focus: "Python, desarrollo móvil y buenas prácticas de programación",
    insight: "Aporta enfoque práctico para consolidar fundamentos y aplicar conceptos en proyectos reales.",
    url: "https://www.youtube.com/@mouredev",
  },
  {
    name: "TodoCode",
    platform: "YouTube",
    focus: "Java, backend y estructura de proyectos",
    insight: "Refuerza la comprensión de lógica, arquitectura y desarrollo orientado a objetivos.",
    url: "https://www.youtube.com/@TodoCode",
  },
  {
    name: "freeCodeCamp en Español",
    platform: "YouTube",
    focus: "Cursos completos de programación y tecnologías full stack",
    insight: "Permite profundizar temas de forma estructurada y con una ruta de aprendizaje extensa.",
    url: "https://www.youtube.com/@freecodecampes",
  },
  {
    name: "Adrià Solà Pastor",
    platform: "YouTube",
    focus: "Ingeniería de software, arquitectura y enfoque profesional",
    insight: "Ayuda a elevar criterio técnico para tomar mejores decisiones en proyectos reales.",
    url: "https://www.youtube.com/@Adri%C3%A0Sol%C3%A0Pastor",
  },
  {
    name: "Robot de Platón",
    platform: "YouTube",
    focus: "Ciencia, tecnología e inteligencia artificial",
    insight: "Amplía la perspectiva tecnológica y motiva a explorar el impacto de la IA.",
    url: "https://www.youtube.com/@ElRobotdePlaton",
  },
  {
    name: "Soy Dalto",
    platform: "YouTube",
    focus: "Fundamentos de programación, desarrollo web y buenas prácticas",
    insight: "Refuerza conceptos base y acelera aprendizaje aplicado para construir proyectos sólidos.",
    url: "https://www.youtube.com/@soydalto",
  },
  {
    name: "Fazt",
    platform: "YouTube",
    focus: "Full Stack, Node.js y buenas prácticas de implementación",
    insight: "Me aporta enfoque de productividad y forma estructurada de construir proyectos reales.",
    url: "https://www.youtube.com/@FaztTech",
  },
  {
    name: "HolaMundo",
    platform: "YouTube",
    focus: "Fundamentos de programación, backend y arquitectura",
    insight: "Refuerza base técnica y criterio para diseñar soluciones limpias y mantenibles.",
    url: "https://www.youtube.com/@HolaMundoDev",
  },
  {
    name: "The Primeagen",
    platform: "YouTube",
    focus: "Performance, pensamiento crítico y enfoque senior",
    insight: "Me impulsa a cuestionar decisiones técnicas y priorizar impacto real en producto.",
    url: "https://www.youtube.com/@ThePrimeagen",
  },
]

export default function AboutMePage() {
  const { language } = useLanguage()
  const techStack = aboutSections.find((section) => section.id === "experience")?.technologies ?? []
  const overviewSections = aboutSections.filter((section) => section.id !== "introduction")

  const referenceTranslation: Record<string, { focus: string; insight: string }> = {
    midudev: {
      focus: "JavaScript, React, and web development trends",
      insight: "Helps me stay up to date and turn complex concepts into practical solutions.",
    },
    MoureDev: {
      focus: "Python, mobile development, and programming best practices",
      insight: "Provides a practical approach to strengthen fundamentals and apply concepts in real projects.",
    },
    TodoCode: {
      focus: "Java, backend, and project structure",
      insight: "Strengthens understanding of logic, architecture, and goal-driven development.",
    },
    "freeCodeCamp en Español": {
      focus: "Complete programming courses and full-stack technologies",
      insight: "Allows deep and structured learning with a broad learning path.",
    },
    "Adrià Solà Pastor": {
      focus: "Software engineering, architecture, and professional mindset",
      insight: "Helps improve technical judgment for better real-world decisions.",
    },
    "Robot de Platón": {
      focus: "Science, technology, and artificial intelligence",
      insight: "Expands my tech perspective and motivates exploration of AI impact.",
    },
    "Soy Dalto": {
      focus: "Programming fundamentals, web development, and best practices",
      insight: "Reinforces core concepts and speeds up applied learning.",
    },
    Fazt: {
      focus: "Full Stack, Node.js, and implementation best practices",
      insight: "Brings a productivity mindset and structured way to build real products.",
    },
    HolaMundo: {
      focus: "Programming fundamentals, backend, and architecture",
      insight: "Strengthens technical foundations and clean design criteria.",
    },
    "The Primeagen": {
      focus: "Performance, critical thinking, and senior engineering mindset",
      insight: "Pushes me to question technical choices and prioritize product impact.",
    },
  }

  const getReferenceFallbackAvatar = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=ffffff&size=128`

  const getReferenceAvatar = (reference: LearningReference) => {
    const handleMatch = reference.url.match(/@([^/?]+)/)
    const handle = handleMatch?.[1]
    if (!handle) return getReferenceFallbackAvatar(reference.name)
    return `https://unavatar.io/youtube/${decodeURIComponent(handle)}`
  }

  const aboutPageText = {
    profileBadge: language === "en" ? "Professional Profile" : "Perfil Profesional",
    summaryTitle: language === "en" ? "Summary" : "Resumen",
    stackTitle: language === "en" ? "Core Stack" : "Stack Principal",
    moreAboutTitle: language === "en" ? "More About Me" : "Más Sobre Mí",
    moreAboutSubtitle:
      language === "en" ? "Experience, focus, and areas of interest." : "Experiencia, enfoque y áreas de interés.",
    referencesTitle: language === "en" ? "Mentors and Learning Sources" : "Referentes y Fuentes de Aprendizaje",
    referencesSubtitle:
      language === "en"
        ? "Channels and profiles I consistently follow to improve technical criteria and stay current."
        : "Canales y perfiles que sigo de forma constante para fortalecer criterio técnico y mantenerme actualizado.",
    focusLabel: language === "en" ? "Focus:" : "Enfoque:",
    viewChannel: language === "en" ? "View channel" : "Ver canal",
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10 space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] gap-6 items-center">
          <div className="relative mx-auto md:mx-0 w-full max-w-[210px] aspect-square">
            <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-2xl animate-pulse" />

            <svg
              viewBox="0 0 220 220"
              className="relative w-full h-full drop-shadow-[0_0_20px_rgba(45,212,191,0.35)]"
              aria-hidden
            >
              <defs>
                <linearGradient id="profileRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>

              <circle cx="110" cy="110" r="88" fill="none" stroke="url(#profileRing)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.75" />
              <g
                className="origin-center animate-[spin_9s_linear_infinite]"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <circle cx="110" cy="110" r="74" fill="none" stroke="#67e8f9" strokeWidth="1.5" opacity="0.65" />
                <circle cx="110" cy="36" r="4.5" fill="#5eead4" />
                <circle cx="184" cy="110" r="4.5" fill="#22d3ee" />
                <circle cx="110" cy="184" r="4.5" fill="#5eead4" />
                <circle cx="36" cy="110" r="4.5" fill="#22d3ee" />
              </g>

              <g
                className="origin-center animate-[spin_6s_linear_infinite] [animation-direction:reverse]"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <path d="M52 110h116" stroke="#99f6e4" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
                <path d="M110 52v116" stroke="#a5f3fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
              </g>

              <g
                className="origin-center animate-[spin_4s_linear_infinite]"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <circle cx="110" cy="58" r="3.5" fill="#2dd4bf" />
                <circle cx="154" cy="110" r="3.5" fill="#2dd4bf" />
                <circle cx="110" cy="162" r="3.5" fill="#2dd4bf" />
                <circle cx="66" cy="110" r="3.5" fill="#2dd4bf" />
              </g>

              <circle cx="110" cy="110" r="23" fill="#0f172a" stroke="#2dd4bf" strokeWidth="2.2" />
              <circle cx="110" cy="110" r="7" fill="#2dd4bf" className="animate-ping" />
              <circle cx="110" cy="110" r="4.5" fill="#67e8f9" className="animate-pulse" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="translate-y-[36px] rounded-md border border-white/20 bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-teal-200">
                BUILD
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {aboutPageText.profileBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{profile.name}</h1>
            <p className="mt-2 text-teal-200 font-medium">{profile.role[language]}</p>
            <p className="mt-4 text-slate-200 max-w-3xl">{profile.summary[language]}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
        <aside className="lg:col-span-5 flex flex-col gap-4 lg:h-full">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm flex-1">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-900">{aboutPageText.summaryTitle}</h2>
            </div>
            <p className="text-gray-600 text-sm">{aboutSections[0].description[language]}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">{aboutPageText.stackTitle}</h2>
            </div>
            <div className="flex flex-1 items-center">
              <div className="flex w-full flex-wrap justify-center gap-2.5 content-center">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-100 hover:text-teal-950 hover:shadow-sm"
                  >
                    {techIconMap[tech] ? (
                      <img src={techIconMap[tech]} alt={`${tech} icon`} className="w-4 h-4 object-contain shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    ) : (
                      <Code2 className="w-3.5 h-3.5 text-teal-700 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    )}
                    <span className="leading-none">{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm h-full">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">{aboutPageText.moreAboutTitle}</h2>
          <p className="text-sm text-gray-500 mb-5">{aboutPageText.moreAboutSubtitle}</p>

          <Accordion type="single" collapsible className="w-full">
            {overviewSections.map((section) => {
              const SectionIcon = section.icon

              return (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3 pr-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <SectionIcon className="w-4 h-4" />
                      </span>
                      <span className="text-base font-semibold text-gray-800">{section.title[language]}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 leading-relaxed">{section.description[language]}</p>
                    {section.technologies && section.technologies.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {section.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                          >
                            {techIconMap[tech] ? (
                              <img src={techIconMap[tech]} alt={`${tech} icon`} className="w-4 h-4 object-contain" />
                            ) : (
                              <Code2 className="w-4 h-4 text-gray-500" />
                            )}
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </section>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-5">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{aboutPageText.referencesTitle}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {aboutPageText.referencesSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningReferences.map((reference) => (
            <article key={reference.name} className="rounded-xl border border-gray-200 bg-slate-50/70 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-14 w-14 shrink-0 rounded-full border-2 border-white bg-slate-200 shadow-sm overflow-hidden">
                  <img
                    src={getReferenceAvatar(reference)}
                    alt={`${reference.name} avatar`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = getReferenceFallbackAvatar(reference.name)
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col-reverse sm:flex-row sm:items-start gap-2">
                    <h3 className="text-base font-semibold text-gray-900 leading-snug">{reference.name}</h3>
                    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 text-xs font-medium sm:ml-auto shrink-0">
                      <Youtube className="w-3.5 h-3.5" />
                      {reference.platform}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mt-3">
                    <span className="font-medium text-gray-900">{aboutPageText.focusLabel}</span>{" "}
                    {language === "en" ? (referenceTranslation[reference.name]?.focus ?? reference.focus) : reference.focus}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === "en" ? (referenceTranslation[reference.name]?.insight ?? reference.insight) : reference.insight}
                  </p>

                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-800"
                  >
                    {aboutPageText.viewChannel}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
