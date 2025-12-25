"use client"

import { motion } from "framer-motion"
import { Star, Crown, Quote } from "lucide-react"
import confetti from "canvas-confetti"
import { useRef } from "react"

const defaultTestimonials = [
  {
    initial: "A",
    name: "Ana García",
    role: "Gerente de Marketing",
    quote: "La elegancia y profesionalismo con la que enseñan me permitió ascender en mi trabajo. La oratoria no es solo hablar, es liderar.",
  },
  {
    initial: "C",
    name: "Carlos Mendoza",
    role: "Abogado",
    quote: "Increíble transformación. Pasé de tener pánico escénico a disfrutar cada presentación. El método es 100% efectivo.",
  },
  {
    initial: "L",
    name: "Lucía Torres",
    role: "Estudiante de Medicina",
    quote: "La lectura veloz me ahorra horas de estudio. Una inversión que vale oro para mi carrera universitaria.",
  },
]

export function TestimonialsSection({ content }: { content?: any }) {
  const testimonials = content?.items || defaultTestimonials
  const title = content?.title || "Voces que Inspiran"

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get position of the card relative to the window
    const rect = e.currentTarget.getBoundingClientRect()
    
    // Calculate normalized coordinates (0 to 1) for confetti
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    // Fire fireworks!
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const particleCount = 50
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x, y },
      colors: ['#f4a835', '#1a2d5c', '#ffffff'], // Gold, Blue, White
      gravity: 0.8,
      scalar: 0.8,
      drift: 0,
    })
  }

  return (
    <section id="testimonios" className="py-20 bg-slate-50 dark:bg-slate-950 relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 rounded-full bg-[#f4a835]/10 mb-4"
          >
            <Crown className="w-8 h-8 text-[#f4a835]" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-[#1a2d5c] dark:text-white"
          >
            {title.split(' ').slice(0, -1).join(' ')} <span className="text-[#f4a835]">{title.split(' ').slice(-1)}</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            className="h-1 bg-[#f4a835] mx-auto rounded-full"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onMouseEnter={handleHover}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#f4a835] hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 group cursor-default relative"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#f4a835] text-[#f4a835]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed mb-8 relative z-10">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a2d5c] to-[#2d4475] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-110 transition-transform">
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-bold text-[#1a2d5c] dark:text-white group-hover:text-[#f4a835] transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    {t.role}
                  </p>
                </div>
              </div>
              
              {/* Decor */}
              <Crown className="absolute top-6 right-6 w-12 h-12 text-slate-100 dark:text-slate-800 rotate-12 -z-0 group-hover:text-[#f4a835]/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
