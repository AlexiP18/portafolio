"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type AppLanguage = "en" | "es"

interface LanguageContextValue {
  language: AppLanguage
  setLanguage: (language: AppLanguage) => void
}

const LANGUAGE_STORAGE_KEY = "portfolio-language"

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>("en")

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (storedLanguage === "en" || storedLanguage === "es") {
      setLanguageState(storedLanguage)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }

  return context
}
