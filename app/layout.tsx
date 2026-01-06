import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CENTRAJUV - Academia de Oratoria y Liderazgo",
  description:
    "Talleres de oratoria, liderazgo y comunicación en Juliaca. Inscríbete hoy y recibe un libro físico gratis.",
  generator: "v0.app",
  icons: {
    icon: "/icon.png", // Explicitly point to the new icon.png
    apple: "/apple-icon.png", // Keep the apple touch icon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}