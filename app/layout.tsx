import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portafolio Personal - Ingeniero de Software",
  description: "Portafolio personal con información profesional, habilidades, experiencia y proyectos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          {/* Contenido principal con padding responsive */}
          <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
            <div className="p-4 lg:p-0">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
