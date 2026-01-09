"use client"

import { AnimatedBackground } from "./animated-background"
import { ScrollyHeader } from "./scrolly-header"
import { ProgramsSection } from "./programs-section"
import { BookOffer } from "./book-offer"
import { SchedulesSection } from "./schedules-section"
import { NegotiablePriceSection } from "./negotiable-price-section"
import { SiteFooter } from "./site-footer"
import { motion } from "framer-motion"
import { Phone, MapPin, Gift } from "lucide-react"
import { StaticConfirmation } from "./static-confirmation"

export function RegistrationPage({ initialContent }: { initialContent?: any }) {
  const content = initialContent || {}
  const hero = content.hero || {
    badge: "INSCRIPCIONES ABIERTAS 2026",
    titleLine1: "Descubre tu voz.",
    titleLine2: "Lidera el futuro.",
    description:
      "Únete a la academia de oratoria más prestigiosa de la región. Metodología 100% práctica y certificación oficial.",
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <AnimatedBackground />

      {/* Scrollytelling Header */}
      <ScrollyHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 md:pt-36 relative z-10">
        {/* HERO SECTION - Centered & Massive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#1a2d5c] font-semibold text-sm tracking-wide mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f4a835] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f4a835]"></span>
            </span>
            {hero.badge}
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold text-[#1a2d5c] dark:text-white leading-[1.1] tracking-tight">
            {hero.titleLine1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4a835] to-[#f7c978]">
              {hero.titleLine2}
            </span>
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
            {hero.description}
          </p>
        </motion.div>

        {/* PROGRAMS SECTION */}
        <ProgramsSection content={content.programs} />

        {/* SCHEDULES SECTION - HORARIOS DISPONIBLES */}
        <SchedulesSection content={content.schedules} />

        <div id="registration-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12 md:mt-24">
          {/* Left Section - Info (Now 7 columns) */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info Card - Glassmorphism */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="md:col-span-2 backdrop-blur-xl bg-white/40 dark:bg-slate-900/60 border border-white/50 dark:border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a2d5c] rounded-full blur-[80px] opacity-10 dark:opacity-30" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#1a2d5c]/5 dark:bg-white/10 rounded-2xl text-[#1a2d5c] dark:text-[#f4a835]">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#f4a835] tracking-widest mb-1">ASESORÍA</h3>
                      <a
                        href="https://wa.me/51978797369"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-bold text-[#1a2d5c] dark:text-white hover:text-[#f4a835] transition-colors"
                      >
                        {content.footer?.phone || "+51 978 797 369"}
                      </a>
                    </div>
                  </div>
                  <div className="h-12 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block" />
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#1a2d5c]/5 dark:bg-white/10 rounded-2xl text-[#1a2d5c] dark:text-[#f4a835]">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#f4a835] tracking-widest mb-1">VISÍTANOS</h3>
                      <a
                        href="https://www.google.com/maps/place/Plaza+de+Armas+-+Juliaca/@-15.4929455,-70.1352598,3a,75y,337.55h,72.23t/data=!3m7!1e1!3m5!1ssgXyi-gXBr7Y3vgeExA-7w!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D17.769999999999996%26panoid%3DsgXyi-gXBr7Y3vgeExA-7w%26yaw%3D337.55!7i16384!8i8192!4m7!3m6!1s0x9167f3e66e70ca1d:0x164e7ab7b581f735!8m2!3d-15.4932763!4d-70.1356266!10e5!16s%2Fg%2F11gzwqb0v?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-[#1a2d5c] dark:text-white hover:text-[#f4a835] transition-colors"
                      >
                        {content.footer?.address || "Plaza de Armas"}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bonus Info - Pulsing Effect */}
              <motion.div
                variants={fadeInUp}
                className="md:col-span-2 relative p-[2px] rounded-3xl bg-gradient-to-r from-[#f4a835] via-[#f8d090] to-[#f4a835] bg-[length:200%_auto] animate-gradient"
              >
                <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 h-full relative overflow-hidden flex items-center justify-between gap-4 transition-colors">
                  <div>
                    <h3 className="font-bold text-[#f4a835] mb-1 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <Gift className="w-4 h-4" />
                      Bono Exclusivo
                    </h3>
                    <p className="text-[#1a2d5c] dark:text-white font-bold text-xl">Libro de Liderazgo GRATIS</p>
                  </div>
                  <Gift className="w-16 h-16 text-[#f4a835]/20 -rotate-12 flex-shrink-0" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Static Confirmation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative">
              {/* Form Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-b from-[#f4a835] to-[#1a2d5c] rounded-[30px] blur-lg opacity-20" />
              <StaticConfirmation />
            </div>
          </motion.div>
        </div>
      </main>

      {/* NEGOTIABLE PRICE SECTION */}
      <NegotiablePriceSection />

      <SiteFooter content={content.footer} />

    </div>
  )
}