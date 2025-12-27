"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Sun, Moon, Lock } from "lucide-react"
import { AdminLoginModal } from "./admin-login-modal"

export function ScrollyHeader() {
  const { scrollY } = useScroll()
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Header transformations based on scroll
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.95])
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const menuItems = [
    { label: "Programas", id: "programas" },
    { label: "Testimonios", id: "testimonios" },
  ]

  return (
    <motion.header
      style={{
        borderBottomColor: "rgba(226, 232, 240, 0.1)", // subtle border
        borderBottomWidth: borderOpacity,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent dark:border-slate-800"
    >
      {/* Background Layer */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md shadow-sm"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between z-10">
        {/* Logo Section */}
        <motion.div
          style={{ scale: logoScale }}
          className="flex items-center gap-3 cursor-pointer origin-left"
          onClick={() => (window.location.href = "/")}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full shadow-md border-2 border-white">
            <Image
              src="/images/480327209-8927883004000304-8534569882409152595-n.jpg"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-extrabold text-[#1a2d5c] dark:text-white text-lg md:text-xl tracking-tight hidden sm:block">
            CENTRAJUV
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-slate-600 dark:text-slate-300 hover:text-[#1a2d5c] dark:hover:text-[#f4a835] font-medium text-sm transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f4a835] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[#1a2d5c] dark:text-[#f4a835]"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          {/* Admin Toggle */}
          <button
            onClick={() => setShowAdminModal(true)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[#1a2d5c] dark:text-[#f4a835]"
            aria-label="Admin Access"
          >
            <Lock className="w-5 h-5" />
          </button>

          {/* CTA Button with Gradient Hover */}
          <button
            onClick={() => scrollToSection("registration-form")}
            className="group relative px-6 py-2.5 rounded-full overflow-hidden shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-[#1a2d5c] transition-opacity duration-300 group-hover:opacity-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4a835] via-[#f7c978] to-[#f4a835] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_auto] animate-gradient" />

            <span className="relative font-bold text-white group-hover:text-[#1a2d5c] transition-colors duration-300 flex items-center gap-2">
              Reservar Inscripción
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => scrollToSection("registration-form")}
            className="px-4 py-2 bg-[#f4a835] text-[#1a2d5c] text-xs font-bold rounded-full"
          >
            RESERVAR
          </button>
        </div>
      </div>

      <AdminLoginModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} />
    </motion.header>
  )
}
