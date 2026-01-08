"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Sun, Moon, Lock, Menu, X } from "lucide-react"
import { AdminLoginModal } from "./admin-login-modal"

export function ScrollyHeader() {
  const { scrollY } = useScroll()
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AdminLoginModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-sm shadow-lg z-40"
        >
          <div className="flex flex-col items-center gap-4 py-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  scrollToSection(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-[#1a2d5c] dark:hover:text-[#f4a835] font-medium text-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-4 mt-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[#1a2d5c] dark:text-[#f4a835]"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={() => {
                  setShowAdminModal(true)
                  setIsMobileMenuOpen(false)
                }}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[#1a2d5c] dark:text-[#f4a835]"
                aria-label="Admin Access"
              >
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
