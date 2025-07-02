"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, TrendingUp, FolderOpen, BarChart3, GraduationCap, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface NavPoint {
  id: string
  name: string
  href: string
  icon: React.ElementType
  position: { x: number; y: number }
  color: string
  description: string
}

const navPoints: NavPoint[] = [
  {
    id: "sobre-mi",
    name: "Sobre mí",
    href: "/sobre-mi",
    icon: User,
    position: { x: 15, y: 25 },
    color: "from-blue-400 to-blue-600",
    description: "Conoce mi historia y experiencia",
  },
  {
    id: "experiencia",
    name: "Experiencia",
    href: "/experience",
    icon: TrendingUp,
    position: { x: 85, y: 20 },
    color: "from-green-400 to-green-600",
    description: "Mi trayectoria profesional",
  },
  {
    id: "proyectos",
    name: "Proyectos",
    href: "/proyectos",
    icon: FolderOpen,
    position: { x: 80, y: 75 },
    color: "from-purple-400 to-purple-600",
    description: "Trabajos y creaciones destacadas",
  },
  {
    id: "skills",
    name: "Skills",
    href: "/skills",
    icon: BarChart3,
    position: { x: 20, y: 80 },
    color: "from-orange-400 to-orange-600",
    description: "Tecnologías y habilidades",
  },
  {
    id: "education",
    name: "Educacion",
    href: "/education",
    icon: GraduationCap,
    position: { x: 50, y: 15 },
    color: "from-teal-400 to-teal-600",
    description: "Formación académica",
  },
]

export default function Home() {
  const [displayText, setDisplayText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)
  const [pulseAnimation, setPulseAnimation] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Palabras diferentes para móvil (más cortas) y desktop
  const desktopWords = [
    "Ingeniero de Software",
    "Desarrollador Full Stack",
    "Creador Digital",
    "Solucionador de Problemas",
  ]
  const mobileWords = ["Ingeniero", "Desarrollador", "Creador", "Innovador"]

  const words = isMobile ? mobileWords : desktopWords

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Reiniciar animación typewriter cuando cambia el dispositivo
      if (mobile !== isMobile) {
        setDisplayText("")
        setCurrentCharIndex(0)
        setCurrentWordIndex(0)
        setIsDeleting(false)
        setIsPaused(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [isMobile])

  // Función para determinar la posición del tooltip
  const getTooltipPosition = (point: NavPoint) => {
    const { y } = point.position
    // Si el punto está en la mitad inferior (y > 50), mostrar tooltip arriba
    return y > 50 ? "top" : "bottom"
  }

  // Animación typewriter
  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const typewriterTimeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false)
          setIsDeleting(true)
          return
        }

        if (!isDeleting) {
          if (currentCharIndex < currentWord.length) {
            setDisplayText(currentWord.slice(0, currentCharIndex + 1))
            setCurrentCharIndex((prev) => prev + 1)
          } else {
            setIsPaused(true)
          }
        } else {
          if (currentCharIndex > 0) {
            setDisplayText(currentWord.slice(0, currentCharIndex - 1))
            setCurrentCharIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isPaused ? 2000 : isDeleting ? 50 : 100,
    )

    return () => clearTimeout(typewriterTimeout)
  }, [currentCharIndex, currentWordIndex, isDeleting, isPaused, words])

  // Efecto de pulso para los círculos
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 z-0">
        {/* Círculos de fondo animados */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Grid de puntos sutil */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 gap-8 h-full p-8">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-500 rounded-full opacity-30"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Radar central - SIN PADDING en móvil/tablet, ocupa toda la pantalla */}
      <div className="relative w-full h-full md:max-w-4xl md:mx-auto md:px-8 z-10 overflow-hidden">
        {/* Círculos concéntricos del radar - Centrados y escalados para pantalla completa */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Círculo más grande - Ocupa casi toda la pantalla en móvil */}
          <div
            className={`rounded-full border border-teal-400/30 ${pulseAnimation ? "animate-ping" : ""} ${
              isMobile ? "w-[85vw] h-[85vw] max-w-[85vh] max-h-[85vh]" : "w-96 h-96"
            }`}
          ></div>
          {/* Círculo mediano */}
          <div
            className={`absolute rounded-full border border-teal-400/40 ${pulseAnimation ? "animate-ping" : ""} delay-300 ${
              isMobile ? "w-[65vw] h-[65vw] max-w-[65vh] max-h-[65vh]" : "w-72 h-72"
            }`}
          ></div>
          {/* Círculo pequeño */}
          <div
            className={`absolute rounded-full border border-teal-400/50 ${pulseAnimation ? "animate-ping" : ""} delay-500 ${
              isMobile ? "w-[45vw] h-[45vw] max-w-[45vh] max-h-[45vh]" : "w-48 h-48"
            }`}
          ></div>
          {/* Centro del radar */}
          <div
            className={`bg-teal-400 rounded-full animate-pulse shadow-lg shadow-teal-400/50 ${
              isMobile ? "w-4 h-4" : "w-6 h-6"
            }`}
          ></div>
        </div>

        {/* Puntos de navegación */}
        {navPoints.map((point) => {
          const Icon = point.icon
          const isHovered = hoveredPoint === point.id && !isMobile
          const tooltipPosition = getTooltipPosition(point)

          return (
            <div
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-50"
              style={{
                left: `${point.position.x}%`,
                top: `${point.position.y}%`,
              }}
            >
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => !isMobile && setHoveredPoint(point.id)}
                onMouseLeave={() => !isMobile && setHoveredPoint(null)}
              >
                {/* Link que envuelve solo el círculo principal */}
                <Link href={point.href} className="block relative z-50">
                  {/* Círculo principal del punto - Tamaños responsivos */}
                  <div
                    className={`rounded-full bg-gradient-to-r ${point.color} shadow-lg transform transition-all duration-300 flex items-center justify-center relative z-50 ${
                      isMobile
                        ? "w-10 h-10 hover:scale-105" // Móvil: un poco más grande para mejor touch
                        : isHovered
                          ? "w-16 h-16 scale-110 shadow-2xl" // Desktop hover: grande
                          : "w-10 h-10 hover:scale-105" // Desktop normal
                    }`}
                  >
                    <Icon
                      className={`text-white transition-all duration-300 ${
                        isMobile
                          ? "w-4 h-4" // Móvil: icono más visible
                          : isHovered
                            ? "w-7 h-7" // Desktop hover: icono grande
                            : "w-4 h-4" // Desktop normal
                      }`}
                    />
                  </div>
                </Link>

                {/* Ondas de expansión en hover - Solo desktop */}
                {isHovered && !isMobile && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 animate-ping z-40"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/5 animate-ping delay-150 z-40"></div>
                  </>
                )}

                {/* Tooltip expandido - Solo desktop */}
                {isHovered && !isMobile && (
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-64 z-60 ${
                      tooltipPosition === "top" ? "bottom-full mb-4" : "top-full mt-4"
                    }`}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50 p-4 animate-fade-in-fast">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-r ${point.color} flex items-center justify-center`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-800">{point.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{point.description}</p>
                      <div className="flex items-center text-teal-600 text-sm font-medium">
                        <span>Explorar</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                      {/* Flecha del tooltip - Posición dinámica */}
                      <div
                        className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${
                          tooltipPosition === "top"
                            ? "top-full border-t-4 border-t-white/95"
                            : "bottom-full border-b-4 border-b-white/95"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Indicador de punto activo */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 z-40">
                  <div
                    className={`rounded-full bg-gradient-to-r ${point.color} animate-pulse opacity-60 ${
                      isMobile ? "w-1.5 h-1.5" : "w-1.5 h-1.5"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Contenido central - SIN PADDING en móvil */}
        <div className="relative z-20 text-center h-full flex flex-col justify-center px-4 md:px-0 md:py-16">
          {/* Icono decorativo */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="relative">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-teal-400 animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-teal-400/50" />
              </div>
            </div>
          </div>

          {/* Subtítulo superior */}
          <p className="text-gray-400 text-xs md:text-sm lg:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 font-light animate-fade-in">
            Desarrollador Full Stack
          </p>

          {/* Título principal con animación typewriter - Altura fija y sin wrap */}
          <div className="mb-4 md:mb-6">
            <h1
              className={`text-white font-bold leading-tight ${
                isMobile
                  ? "text-3xl sm:text-4xl min-h-[3rem] whitespace-nowrap overflow-hidden"
                  : "text-4xl md:text-5xl lg:text-6xl min-h-[1.2em]"
              }`}
            >
              <span className="inline-block">
                {displayText}
                <span className="text-teal-400 ml-2 animate-blink">|</span>
              </span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-gray-300 text-sm md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 animate-fade-in-delay">
            Creando soluciones digitales innovadoras con tecnologías modernas y diseño centrado en el usuario
          </p>

          {/* Botón CTA */}
          <div className="mt-6 md:mt-8 animate-fade-in-delay-2">
            <Link href="https://wa.link/gqwair">
              <button className="group bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-teal-500/25 hover:scale-105 transform flex items-center space-x-2 mx-auto text-sm md:text-base">
                <span>Contáctame</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Indicador de scroll - Solo desktop */}
          {!isMobile && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
