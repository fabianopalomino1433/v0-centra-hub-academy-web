"use client"

import { motion } from "framer-motion"
import React from "react"
import { Mic2, BookOpen, MessageCircle, Radio, PenTool, Sparkles, Brain, Star, ChevronRight, Volume2 } from "lucide-react"

const iconMap: any = {
  Mic2, BookOpen, MessageCircle, Radio, PenTool, Sparkles, Brain, Volume2
}

export function ProgramsSection({ content }: { content?: any }) {
  const scrollToForm = () => {
    const formElement = document.getElementById("registration-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Use passed content or fallback (though fallback logic is tricky if structure changes, relying on initialContent form page.tsx is safer)
  // For safety, if content is undefined, we use an empty object or the hardcoded default.
  // Since we are moving to dynamic, let's assume content might be passed.
  
  const categories = content?.categories || programCategories
  const title = content?.title || "Temario de Excelencia"
  const subtitle = content?.subtitle || "Diseñados meticulosamente para potenciar tus habilidades blandas y directivas."

  return (
    <section id="programas" className="py-16 md:py-24 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-[#1a2d5c] dark:text-white mb-6"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-slate-300 font-medium"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-0">
        {categories.map((category: any, categoryIndex: number) => (
          <React.Fragment key={category.categoryTitle}>
            <div className="col-span-full text-center mt-12 mb-8">
              <h3 className="text-3xl font-extrabold text-[#1a2d5c] dark:text-white">
                {category.categoryTitle}
              </h3>
            </div>
            {category.programs.map((program: any, programIndex: number) => {
              const Icon = iconMap[program.iconName] || Star // Fallback icon
              return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (categoryIndex * 0.2) + (programIndex * 0.1) }}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-[#f4a835]/20 hover:border-[#f4a835] shadow-lg hover:shadow-2xl hover:shadow-[#f4a835]/10 transition-all duration-300 flex flex-col"
              >
                {/* Certificado Badge */}
                <div className="absolute top-4 right-4 bg-[#1a2d5c] dark:bg-[#f4a835] text-white dark:text-[#1a2d5c] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Certificado
                </div>

                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-[#f4a835] to-[#f7c978] rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex text-[#f4a835]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1a2d5c] dark:text-white mb-3 group-hover:text-[#f4a835] transition-colors">
                  {program.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                  {program.description}
                </p>

                {/* Metadata Tags */}
                <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#f4a835] uppercase tracking-wider">Perfil</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{program.profile}</span>
                  </div>
                  <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#f4a835] uppercase tracking-wider">Objetivo</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{program.objective}</span>
                  </div>
                </div>

                {/* CTA */}
                <a 
                  href="https://api.whatsapp.com/send/?phone=51978797369&text=Hola%21+Me+gustar%C3%ADa+tener+m%C3%A1s+informaci%C3%B3n+sobre+el+programa+de+Oratoria+y+Liderazgo.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-auto py-3 px-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-[#1a2d5c] dark:border-[#f4a835] text-[#1a2d5c] dark:text-white font-bold text-sm hover:bg-[#1a2d5c] dark:hover:bg-[#f4a835] hover:text-white dark:hover:text-[#1a2d5c] transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Solicitar Información
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            )})}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
