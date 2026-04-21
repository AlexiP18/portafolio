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
  navigation: string
}

const getSidebarCopy = (language: AppLanguage): SidebarCopy => ({
  role: language === "en" ? "Software Engineer" : "Ingeniero de Software",
  toggleMenu: language === "en" ? "Toggle menu" : "Alternar menú",
  closeMenu: language === "en" ? "Close menu" : "Cerrar menú",
  downloadCv: language === "en" ? "Download CV" : "Descargar CV",
  copyright: language === "en" ? "© 2026 Personal Portfolio" : "© 2026 Portafolio Personal",
  navigation: language === "en" ? "Navigation" : "Navegación",
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

  const getMenuLinkClassName = (isActive: boolean) =>
    `group relative flex items-center gap-3 px-3 py-3 rounded-xl border transition-all duration-200 ${
      isActive
        ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-100"
        : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-200 hover:shadow-sm hover:-translate-y-0.5"
    }`

  const getMenuIconWrapClassName = (isActive: boolean) =>
    `inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-teal-700 text-white"
        : "bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600"
    }`

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-slate-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3" onClick={closeMobileMenu}>
            <Link href="/" onClick={closeMobileMenu}>
              <div className="w-14 h-14 rounded-full border-2 border-teal-500 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200">
                <Image src={profileImageUrl} alt="Profile" width={56} height={56} className="w-full h-full object-cover" />
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
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-lg border-r border-slate-200 z-50 flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-3" onClick={closeMobileMenu}>
            <Link href="/" onClick={closeMobileMenu}>
              <div className="w-14 h-14 rounded-full border-2 border-teal-500 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200">
                <Image src={profileImageUrl} alt="Profile" width={56} height={56} className="w-full h-full object-cover" />
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

        <div className="px-4 py-3 border-b border-slate-200">
          <LanguageSwitcher />
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
          <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{copy.navigation}</p>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={getMenuLinkClassName(isActive)}
                  >
                    <span className={getMenuIconWrapClassName(isActive)}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-medium">{item.name[language]}</span>
                    <span
                      className={`ml-auto h-2 w-2 rounded-full transition-colors duration-200 ${
                        isActive ? "bg-white" : "bg-slate-300 group-hover:bg-teal-300"
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center justify-center gap-4 mb-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-blue-700 hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-green-700 hover:border-green-200 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white hover:bg-teal-700 hover:-translate-y-0.5 transition-all duration-200"
              aria-label={copy.downloadCv}
            >
              <FileText className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center">{copy.copyright}</p>
        </div>
      </div>

      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-slate-200 flex-col overflow-hidden">
        <div className="shrink-0 flex flex-col items-center pt-4 pb-4 px-6 border-b border-slate-100">
          <div className="relative">
            <Link href="/" className="block">
              <div className="w-28 h-28 rounded-full border-4 border-teal-500 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
                <Image src={profileImageUrl} alt="Profile" width={112} height={112} className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>
          <div className="mt-3 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Alexis Poaquiza</h2>
            <p className="text-xs text-gray-600 mt-1">{copy.role}</p>
          </div>
          <div className="mt-3">
            <LanguageSwitcher />
          </div>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
          <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{copy.navigation}</p>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={getMenuLinkClassName(isActive)}
                  >
                    <span className={getMenuIconWrapClassName(isActive)}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-medium">{item.name[language]}</span>
                    <span
                      className={`ml-auto h-2 w-2 rounded-full transition-colors duration-200 ${
                        isActive ? "bg-white" : "bg-slate-300 group-hover:bg-teal-300"
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center justify-center gap-4 mb-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-blue-700 hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-green-700 hover:border-green-200 hover:-translate-y-0.5 transition-all duration-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white hover:bg-teal-700 hover:-translate-y-0.5 transition-all duration-200"
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
