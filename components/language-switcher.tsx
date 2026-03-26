"use client"

import { Languages } from "lucide-react"
import { useLanguage, type AppLanguage } from "@/components/language-provider"

const languageOptions: { id: AppLanguage; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "es", label: "ES" },
]

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1 ${className ?? ""}`}>
      <Languages className="h-4 w-4 text-gray-500" />
      <div className="inline-flex items-center rounded-full bg-gray-100 p-0.5">
        {languageOptions.map((option) => {
          const isActive = option.id === language
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setLanguage(option.id)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                isActive ? "bg-teal-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              aria-pressed={isActive}
              aria-label={`Switch language to ${option.label}`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
