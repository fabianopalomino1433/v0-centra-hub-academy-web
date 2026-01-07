"use client"

import { motion } from "framer-motion"
import { Clock, CalendarDays } from "lucide-react"

const defaultSchedules = {
  title: "Horarios Disponibles",
  items: [
    {
        "category": "NIÑOS",
        "times": [
          "MAÑANAS:",
          "07:30 A 09:00",
          "09:00 A 10:30",
          "10:30 A 12:00",
          "TARDES:",
          "02:00 A 03:30",
          "03:30 A 05:00",
          "SÁBADO - DOMINGOS:",
          "09:00 A 11:00 a.m.",
          "02:00 A 04:00 p.m."
        ]
      },
      {
        "category": "JÓVENES",
        "times": [
          "MAÑANAS:",
          "07:30 A 09:00",
          "09:00 A 10:30",
          "10:30 A 12:00",
          "TARDES:",
          "02:00 A 03:30",
          "03:30 A 05:00",
          "05:00 A 07:00"
        ]
      },
      {
        "category": "PROFESIONALES",
        "times": [
          "NOCHE",
          "06:30 A 08:00"
        ]
      }
  ]
}

export function SchedulesSection({ content }: { content?: any }) {
  const schedules = content || defaultSchedules
  const title = schedules.title

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="horarios" className="py-20 bg-slate-50 dark:bg-slate-950 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 rounded-full bg-[#f4a835]/10 mb-4"
          >
            <CalendarDays className="w-8 h-8 text-[#f4a835]" />
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
          {schedules.items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#f4a835] hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 group cursor-default relative"
            >
              
              <h3 className="font-bold text-2xl text-[#1a2d5c] dark:text-white mb-4 relative z-10 flex items-center gap-2">
                {item.category === "NIÑOS" && <span role="img" aria-label="niños">👶</span>}
                {item.category === "JÓVENES" && <span role="img" aria-label="jóvenes">🧑‍🎓</span>}
                {item.category === "PROFESIONALES" && <span role="img" aria-label="profesionales">💼</span>}
                {item.category}
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300 relative z-10">
                {item.times.map((time: string, timeIndex: number) => (
                  <li key={timeIndex}> {time}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
