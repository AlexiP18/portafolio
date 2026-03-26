"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Mail, Github, Linkedin, MessageCircle, FileText, MapPin, Briefcase, ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const contactLinks = {
  email: "mailto:alexispoaquiza.dev@gmail.com",
  github: "https://github.com/AlexiP18",
  linkedin: "https://www.linkedin.com/in/alexis-poaquiza/",
  whatsapp: "https://wa.link/gqwair",
  cv: "https://drive.google.com/",
}

const githubUser = "AlexiP18"

const linkedinCard = {
  name: "Alexis Poaquiza",
  role: {
    en: "Software Engineer | Frontend & DevOps",
    es: "Ingeniero de Software | Frontend & DevOps",
  },
  location: "Ambato, Ecuador",
  about: {
    en: "Passionate about building modern, accessible, and high-performance web experiences. Focused on React, Next.js, TypeScript, and cloud deployment.",
    es: "Apasionado por construir experiencias web modernas, accesibles y con buen rendimiento. Enfocado en React, Next.js, TypeScript y despliegue en la nube.",
  },
  avatar:
    "https://scontent.fatf6-1.fna.fbcdn.net/v/t39.30808-1/482063674_122098752290799599_4639200773569733832_n.jpg?stp=c219.0.864.864a_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=1cnEuO3TAx4Q7kNvwFadUFF&_nc_oc=Adn-kIeTUNzzJu8bMVLfUSHeTYF8b4MBbflKKqNLMqW5OU5KsUj1Tkn_Ieqip5swMbg&_nc_zt=24&_nc_ht=scontent.fatf6-1.fna&_nc_gid=1Rj8s84CAcqY-mEIEiC3vQ&oh=00_AfOdguSZAs2oXvotJXG7jP_3a8kI3Jf7w_xqQ7IlxUAEVQ&oe=686B5D55",
}

export default function ContactoPage() {
  const { language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  const pageText = {
    title: language === "en" ? "Contact" : "Contacto",
    subtitle:
      language === "en"
        ? "If you want to collaborate on a project, schedule an interview, or request my resume, reach out through any of these channels."
        : "Si quieres colaborar en un proyecto, agendar una entrevista o solicitar mi hoja de vida, puedes escribirme por cualquiera de estos canales.",
    emailAria: language === "en" ? "Email" : "Correo",
    cvAria: language === "en" ? "View CV" : "Ver CV",
    available: language === "en" ? "Available for opportunities" : "Disponible para oportunidades",
    viewProfile: language === "en" ? "View profile" : "Ver perfil",
    githubLive: language === "en" ? "Live GitHub" : "GitHub en vivo",
    githubLiveDescription:
      language === "en"
        ? `Widgets connected to @${githubUser}. They update automatically with your activity.`
        : `Widgets conectados a @${githubUser}. Se actualizan automáticamente con tu actividad.`,
  }

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const isGoingDown = currentY > lastScrollY.current

      if (isGoingDown && currentY > 40) {
        setIsScrolled(true)
      } else if (!isGoingDown) {
        setIsScrolled(false)
      }

      lastScrollY.current = currentY
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16 space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{pageText.title}</h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          {pageText.subtitle}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-center gap-6">
          <a
            href={contactLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-8 h-8" />
          </a>
          <a
            href={contactLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-8 h-8" />
          </a>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-700 transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
          <a
            href={contactLinks.email}
            className="text-gray-500 hover:text-red-700 transition-colors duration-200"
            aria-label={pageText.emailAria}
          >
            <Mail className="w-8 h-8" />
          </a>
          <a
            href={contactLinks.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200"
            aria-label={pageText.cvAria}
          >
            <FileText className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_minmax(0,1fr)] gap-6 items-start">
        <div
          className={`xl:sticky self-start rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 ${
            isScrolled ? "xl:top-1/2 xl:-translate-y-1/2" : "xl:top-6 xl:translate-y-0"
          }`}
        >

          <article className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
              <div className="h-24 bg-gradient-to-r from-blue-700 to-blue-500" />

              <div className="px-5 pb-5 -mt-10">
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm">
                  <Image
                    src={linkedinCard.avatar}
                    alt={linkedinCard.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-900 leading-tight">{linkedinCard.name}</h2>
                  <p className="mt-1 text-sm text-gray-700">{linkedinCard.role[language]}</p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{linkedinCard.location}</span>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{pageText.available}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">{linkedinCard.about[language]}</p>

                  <a
                    href={contactLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    {pageText.viewProfile}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
          </article>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">{pageText.githubLive}</h2>
          <p className="mt-2 text-gray-600 text-sm">
            {pageText.githubLiveDescription}
          </p>

          <div className="mt-5 flex flex-col gap-4">
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=transparent&hide_border=true&include_all_commits=true&count_private=true`}
                alt="GitHub stats"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUser}&layout=compact&theme=transparent&hide_border=true`}
                alt="Top lenguajes en GitHub"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://streak-stats.demolab.com?user=${githubUser}&theme=transparent&hide_border=true&date_format=j%20M%5B%20Y%5D`}
                alt="Racha de contribuciones en GitHub"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUser}&bg_color=ffffff&color=0f172a&line=0ea5e9&point=0284c7&area=true&hide_border=true`}
                alt="Gráfico de actividad en GitHub"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-profile-trophy.vercel.app/?username=${githubUser}&theme=flat&no-frame=true&column=4&margin-w=8&margin-h=8`}
                alt="Trofeos de GitHub"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${githubUser}&theme=default`}
                alt="Resumen detallado de perfil GitHub"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${githubUser}&theme=default`}
                alt="Repositorios por lenguaje"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${githubUser}&theme=default`}
                alt="Lenguaje con más commits"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${githubUser}&theme=default`}
                alt="Estadísticas de perfil GitHub"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${githubUser}&theme=default&utcOffset=-5`}
                alt="Tiempo productivo en GitHub"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-readme-stats.vercel.app/api/pin/?username=${githubUser}&repo=portafolio&theme=transparent&hide_border=true`}
                alt="Repositorio destacado: portafolio"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-readme-stats.vercel.app/api/pin/?username=${githubUser}&repo=FlightBookings&theme=transparent&hide_border=true`}
                alt="Repositorio destacado: FlightBookings"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-readme-stats.vercel.app/api/pin/?username=${githubUser}&repo=Ecommerce-Spring-Boot&theme=transparent&hide_border=true`}
                alt="Repositorio destacado: Ecommerce-Spring-Boot"
                className="w-full h-auto"
              />
            </a>

            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-3 hover:border-gray-300 transition-colors"
            >
              <img
                src={`https://github-readme-stats.vercel.app/api/pin/?username=${githubUser}&repo=sign-language-prediction&theme=transparent&hide_border=true`}
                alt="Repositorio destacado: sign-language-prediction"
                className="w-full h-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
