import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Portfolio - Software Engineer",
  description: "Personal portfolio with professional information, skills, experience, and projects",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
              <div className="p-4 lg:p-0">{children}</div>
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
