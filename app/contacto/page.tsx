"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Mail, Github, Linkedin, MessageCircle, FileText, MapPin, Briefcase, ExternalLink, Star, GitFork, Users, Trophy, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const contactLinks = {
  email: "mailto:alexispoaquiza.dev@gmail.com",
  github: "https://github.com/AlexiP18",
  linkedin: "https://www.linkedin.com/in/developer-joel/",
  whatsapp: "https://wa.link/gqwair",
  cv: "/documents/curriculum_joel_penaloza.pdf",
}

const githubUser = "AlexiP18"

const linkedinCard = {
  name: "Joel Peñaloza",
  role: {
    en: "Full Stack Developer | UX/UI Designer | WordPress",
    es: "Desarrollador Full Stack | UX/UI Designer | WordPress",
  },
  location: "Ambato, Tungurahua - Ecuador",
  about: {
    en: "For me, the choice to develop technology does not stem from a simple passion for writing code, but from the desire to create solutions that generate real impact. Dedicated to web development and building intuitive interfaces.",
    es: "Para mí, la elección de desarrollar tecnología no nace de una simple pasión por escribir código, sino del deseo de crear soluciones que generen un impacto real. Dedicado al desarrollo web y la creación de interfaces intuitivas.",
  },
  avatar: "/images/foto_perfil.jpg",
}

const featuredRepoNames = ["portafolio", "FlightBookings", "Ecommerce-Spring-Boot", "sign-language-prediction"]

interface GitHubProfile {
  login: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  archived: boolean
  fork: boolean
  updated_at: string
  pushed_at: string
}

export default function ContactoPage() {
  const { language } = useLanguage()
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null)
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [githubLoading, setGithubLoading] = useState(true)
  const [githubError, setGithubError] = useState<string | null>(null)

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
    loadingGithub: language === "en" ? "Loading live GitHub data..." : "Cargando datos en vivo de GitHub...",
    githubUnavailable:
      language === "en"
        ? "Some live GitHub panels could not be loaded at this moment."
        : "Algunos paneles en vivo de GitHub no se pudieron cargar en este momento.",
    publicRepos: language === "en" ? "Public repos" : "Repos públicos",
    followers: language === "en" ? "Followers" : "Seguidores",
    following: language === "en" ? "Following" : "Siguiendo",
    stars: language === "en" ? "Stars" : "Stars",
    forks: language === "en" ? "Forks" : "Forks",
    topLanguages: language === "en" ? "Top languages" : "Top lenguajes",
    basedOnRepos: language === "en" ? "Based on public repositories" : "Basado en repositorios públicos",
    githubTrophies: language === "en" ? "GitHub trophies" : "Trofeos GitHub",
    featuredRepos: language === "en" ? "Featured repositories" : "Repositorios destacados",
    viewRepo: language === "en" ? "View repository" : "Ver repositorio",
    updated: language === "en" ? "Updated" : "Actualizado",
    noRepoDescription:
      language === "en"
        ? "No public description available for this repository."
        : "No hay una descripción pública disponible para este repositorio.",
    noFeaturedRepos:
      language === "en"
        ? "The selected repositories are not available as public repos right now."
        : "Los repositorios seleccionados no están disponibles como repos públicos en este momento.",
  }

  useEffect(() => {
    let isCancelled = false

    const loadGitHubData = async () => {
      try {
        setGithubLoading(true)
        setGithubError(null)

        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUser}`),
          fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`),
        ])

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub API request failed")
        }

        const [profileData, reposData] = await Promise.all([
          profileResponse.json() as Promise<GitHubProfile>,
          reposResponse.json() as Promise<GitHubRepo[]>,
        ])

        if (isCancelled) return

        setGithubProfile(profileData)
        setGithubRepos(Array.isArray(reposData) ? reposData : [])
      } catch {
        if (isCancelled) return
        setGithubError(pageText.githubUnavailable)
      } finally {
        if (!isCancelled) {
          setGithubLoading(false)
        }
      }
    }

    loadGitHubData()

    return () => {
      isCancelled = true
    }
  }, [pageText.githubUnavailable])

  const publicRepos = githubRepos.filter((repo) => !repo.fork && !repo.archived)
  const totalStars = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = publicRepos.reduce((sum, repo) => sum + repo.forks_count, 0)
  const languagesCount = publicRepos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) return acc
    acc[repo.language] = (acc[repo.language] ?? 0) + 1
    return acc
  }, {})
  const topLanguages = Object.entries(languagesCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
  const featuredRepos = featuredRepoNames
    .map((repoName) => publicRepos.find((repo) => repo.name === repoName))
    .filter((repo): repo is GitHubRepo => Boolean(repo))
  const latestUpdatedRepo = [...publicRepos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  )[0]

  const trophyItems = [
    {
      label: language === "en" ? "Repository Builder" : "Constructor de Repos",
      description:
        language === "en"
          ? `${publicRepos.length} public repositories available.`
          : `${publicRepos.length} repositorios públicos disponibles.`,
      active: publicRepos.length > 0,
    },
    {
      label: language === "en" ? "Community Presence" : "Presencia en Comunidad",
      description:
        language === "en"
          ? `${githubProfile?.followers ?? 0} followers on GitHub.`
          : `${githubProfile?.followers ?? 0} seguidores en GitHub.`,
      active: (githubProfile?.followers ?? 0) > 0,
    },
    {
      label: language === "en" ? "Polyglot Coder" : "Polyglot Coder",
      description:
        language === "en"
          ? `${topLanguages.length} languages detected across public repos.`
          : `${topLanguages.length} lenguajes detectados en los repos públicos.`,
      active: topLanguages.length > 0,
    },
    {
      label: language === "en" ? "Active Maintainer" : "Mantenedor Activo",
      description:
        latestUpdatedRepo
          ? `${pageText.updated}: ${new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-EC", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(latestUpdatedRepo.pushed_at))}`
          : pageText.githubUnavailable,
      active: Boolean(latestUpdatedRepo),
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-12 space-y-8">
      <div className="relative mb-16 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="pt-6 pb-16 px-6 md:p-8 md:pb-12 flex flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            <Mail className="h-3.5 w-3.5" />
            {language === "en" ? "Let's Talk" : "Hablemos"}
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">{pageText.title}</h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">{pageText.subtitle}</p>
        </div>

        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-max max-w-[95%] rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-md z-10">
          <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-6">
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
            <a
              href={contactLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-700 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-green-600 transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
            <a
              href={contactLinks.email}
              className="text-slate-500 hover:text-red-600 transition-colors duration-200"
              aria-label={pageText.emailAria}
            >
              <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
            <a
              href={contactLinks.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md"
              aria-label={pageText.cvAria}
            >
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_minmax(0,1fr)] gap-6 items-start">
        <div className="xl:sticky xl:top-8 self-start rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">

          <article className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
              <div className="relative h-24 w-full">
                <Image
                  src="/images/linkedin_cover.png"
                  alt="LinkedIn Cover"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="px-5 pb-5 -mt-12 relative z-10">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
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
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">GitHub Stats</h3>
                  <p className="text-sm text-gray-500">{pageText.basedOnRepos}</p>
                </div>
                <Github className="w-5 h-5 text-gray-700" />
              </div>

              {githubLoading ? (
                <p className="mt-4 text-sm text-gray-500">{pageText.loadingGithub}</p>
              ) : githubError ? (
                <p className="mt-4 text-sm text-red-600">{githubError}</p>
              ) : (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-gray-500">{pageText.publicRepos}</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">{githubProfile?.public_repos ?? publicRepos.length}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-gray-500">{pageText.followers}</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">{githubProfile?.followers ?? 0}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-gray-500">{pageText.following}</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">{githubProfile?.following ?? 0}</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3">
                    <p className="text-xs text-amber-700">{pageText.stars}</p>
                    <div className="mt-1 inline-flex items-center gap-2 text-xl font-semibold text-amber-900">
                      <Star className="w-4 h-4" />
                      <span>{totalStars}</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-blue-700">{pageText.forks}</p>
                    <div className="mt-1 inline-flex items-center gap-2 text-xl font-semibold text-blue-900">
                      <GitFork className="w-4 h-4" />
                      <span>{totalForks}</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-3">
                    <p className="text-xs text-emerald-700">{pageText.topLanguages}</p>
                    <div className="mt-1 inline-flex items-center gap-2 text-xl font-semibold text-emerald-900">
                      <Users className="w-4 h-4" />
                      <span>{topLanguages.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{pageText.topLanguages}</h3>
                  <p className="text-sm text-gray-500">{pageText.basedOnRepos}</p>
                </div>
                <Sparkles className="w-5 h-5 text-emerald-700" />
              </div>

              {githubLoading ? (
                <p className="mt-4 text-sm text-gray-500">{pageText.loadingGithub}</p>
              ) : githubError ? (
                <p className="mt-4 text-sm text-red-600">{githubError}</p>
              ) : topLanguages.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {topLanguages.map(([languageName, count]) => {
                    const percentage = Math.round((count / publicRepos.length) * 100)
                    return (
                      <div key={languageName}>
                        <div className="flex items-center justify-between text-sm text-gray-700">
                          <span className="font-medium">{languageName}</span>
                          <span>{count} repos</span>
                        </div>
                        <div className="mt-1.5 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">{pageText.githubUnavailable}</p>
              )}
            </div>

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

            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{pageText.githubTrophies}</h3>
                  <p className="text-sm text-gray-500">{pageText.basedOnRepos}</p>
                </div>
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>

              {githubLoading ? (
                <p className="mt-4 text-sm text-gray-500">{pageText.loadingGithub}</p>
              ) : githubError ? (
                <p className="mt-4 text-sm text-red-600">{githubError}</p>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trophyItems.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-lg border p-3 ${
                        item.active ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="inline-flex items-center gap-2">
                        <Trophy className={`w-4 h-4 ${item.active ? "text-amber-600" : "text-gray-400"}`} />
                        <p className="font-medium text-gray-900">{item.label}</p>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

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

            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{pageText.featuredRepos}</h3>
                  <p className="text-sm text-gray-500">@{githubUser}</p>
                </div>
                <Github className="w-5 h-5 text-gray-700" />
              </div>

              {githubLoading ? (
                <p className="mt-4 text-sm text-gray-500">{pageText.loadingGithub}</p>
              ) : githubError ? (
                <p className="mt-4 text-sm text-red-600">{githubError}</p>
              ) : featuredRepos.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featuredRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{repo.name}</h4>
                          <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                            {repo.description || pageText.noRepoDescription}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-500 shrink-0" />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        {repo.language && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            {repo.language}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">{pageText.noFeaturedRepos}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
