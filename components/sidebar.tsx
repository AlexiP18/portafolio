"use client"

import { User, TrendingUp, FolderOpen, BarChart3, GraduationCap, Mail, Menu, X, Github, Linkedin, MessageCircle, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage, type AppLanguage } from "@/components/language-provider"
import profileImageUrl from "@/images/foto_perfil.jpg"

const menuItems = [
  {
    name: {
      en: "About Me",
      es: "Sobre mí",
    },
    href: "/sobre-mi",
    icon: User,
  },
  {
    name: {
      en: "Experience",
      es: "Experiencia",
    },
    href: "/experience",
    icon: TrendingUp,
  },
  {
    name: {
      en: "Projects",
      es: "Proyectos",
    },
    href: "/proyectos",
    icon: FolderOpen,
  },
  {
    name: {
      en: "Skills",
      es: "Skills",
    },
    href: "/skills",
    icon: BarChart3,
  },
  {
    name: {
      en: "Education",
      es: "Educación",
    },
    href: "/education",
    icon: GraduationCap,
  },
  {
    name: {
      en: "Contact",
      es: "Contacto",
    },
    href: "/contacto",
    icon: Mail,
  },
]

const socialLinks = {
  github: "https://github.com/AlexiP18",
  linkedin: "https://www.linkedin.com/in/alexis-poaquiza/",
  whatsapp: "https://wa.link/gqwair",
  cv: "/documents/curriculum_joel_penaloza.pdf",
}

interface SidebarCopy {
  role: string
  toggleMenu: string
  closeMenu: string
  downloadCv: string
  copyright: string
}

const getSidebarCopy = (language: AppLanguage): SidebarCopy => ({
  role: language === "en" ? "Software Engineer" : "Ingeniero de Software",
  toggleMenu: language === "en" ? "Toggle menu" : "Alternar menú",
  closeMenu: language === "en" ? "Close menu" : "Cerrar menú",
  downloadCv: language === "en" ? "Download CV" : "Descargar CV",
  copyright: language === "en" ? "© 2026 Personal Portfolio" : "© 2026 Portafolio Personal",
})

export function Sidebar() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const copy = getSidebarCopy(language)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3" onClick={closeMobileMenu}>
            <Link href="/" onClick={closeMobileMenu}>
              <div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200">
                <Image src={profileImageUrl} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
              </div>
            </Link>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Alexis Poaquiza</h2>
              <p className="text-xs text-gray-600">{copy.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="scale-90 origin-right" />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label={copy.toggleMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMobileMenu} />}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-lg border-r border-gray-200 z-50 flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3" onClick={closeMobileMenu}>
            <Link href="/" onClick={closeMobileMenu}>
              <div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200">
                <Image src={profileImageUrl} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
              </div>
            </Link>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Alexis Poaquiza</h2>
              <p className="text-xs text-gray-600">{copy.role}</p>
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label={copy.closeMenu}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <LanguageSwitcher />
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-teal-50 text-teal-700 border-l-4 border-teal-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-teal-600" : "text-gray-500"}`} />
                    <span className="font-medium">{item.name[language]}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 mb-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-700 transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200"
              aria-label={copy.downloadCv}
            >
              <FileText className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center">{copy.copyright}</p>
        </div>
      </div>

      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex-col overflow-hidden">
        <div className="shrink-0 flex flex-col items-center pt-2 pb-3 px-6 border-b border-gray-100">
          <div className="relative">
            <Link href="/" className="block">
              <div className="w-20 h-20 rounded-full border-4 border-teal-500 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
                <Image src={profileImageUrl} alt="Profile" width={80} height={80} className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>
          <div className="mt-2 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Alexis Poaquiza</h2>
            <p className="text-xs text-gray-600 mt-1">{copy.role}</p>
          </div>
          <div className="mt-3">
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-teal-50 text-teal-700 border-l-4 border-teal-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-teal-600" : "text-gray-500"}`} />
                    <span className="font-medium">{item.name[language]}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-center gap-4 mb-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-700 transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a
              href={socialLinks.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200"
              aria-label={copy.downloadCv}
            >
              <FileText className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center">{copy.copyright}</p>
        </div>
      </div>
    </>
  )
}
