"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Activity } from "lucide-react"

interface Registration {
  fullName: string
}

export function RecentRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch("/api/registrations?public=true&limit=5")
        if (response.ok) {
          const data = await response.json()
          setRegistrations(data.registrations)
        }
      } catch (error) {
        console.error("Failed to fetch registrations", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRegistrations()
    // Poll every 30 seconds to keep it "live"
    const interval = setInterval(fetchRegistrations, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading || registrations.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="backdrop-blur-md bg-white/60 rounded-2xl border border-white/50 shadow-xl p-6 mt-8 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-[#f4a835]" />
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#1a2d5c] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#f4a835]" />
          Últimos Inscritos
        </h3>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/50 border border-green-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold text-green-700">En vivo</span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {registrations.map((reg, index) => (
            <motion.div
              key={`${index}-${reg.fullName}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 group/item"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a2d5c] to-[#2d4475] text-white flex items-center justify-center font-bold text-sm shadow-md group-hover/item:scale-110 transition-transform">
                {reg.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-700 group-hover/item:text-[#1a2d5c] transition-colors">
                  {reg.fullName}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Registro confirmado
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
