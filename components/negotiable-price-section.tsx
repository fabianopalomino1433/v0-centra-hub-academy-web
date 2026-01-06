"use client"

import { motion } from "framer-motion"
import { Tag } from "lucide-react"

export function NegotiablePriceSection() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-full mb-4">
          <Tag className="w-8 h-8 text-[#1a2d5c] dark:text-[#f4a835]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2d5c] dark:text-white leading-tight tracking-tight">
          Precio Especial por Apertura
        </h2>
        <p className="mt-4 text-2xl text-slate-600 dark:text-slate-300 font-medium">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f4a835] to-[#f7c978]">
            S/270.00 mensualmente
          </span>{" "}
          con inclusión de todos los cursos.
        </p>
        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          ¡Precio negociable! Consulta por nuestras promociones.
        </p>
      </motion.div>
    </div>
  )
}
