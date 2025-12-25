"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { User, Phone, Mail, BookOpen, Monitor, Clock } from "lucide-react"

interface FormData {
  fullName: string
  whatsapp: string
  email: string
  program: string
  modality: string
  preferredTime: string
}

interface RegistrationFormProps {
  onSubmitSuccess: (data: FormData) => void
}

export function RegistrationForm({ onSubmitSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsapp: "",
    email: "",
    program: "psicologia_oratoria",
    modality: "presencial",
    preferredTime: "manana",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error al procesar la inscripción")
      }

      const result = await response.json()
      onSubmitSuccess(formData)

      // Reset form
      setFormData({
        fullName: "",
        whatsapp: "",
        email: "",
        program: "psicologia_oratoria",
        modality: "presencial",
        preferredTime: "manana",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = "w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f4a835] focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
  const labelClasses = "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
  const iconClasses = "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-6 relative z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-extrabold text-[#1a2d5c] dark:text-white">Inscripción Online</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Completa tus datos para reservar tu vacante</p>
      </div>

      {/* Full Name */}
      <div className="relative group">
        <label htmlFor="fullName" className={labelClasses}>
          Nombre Completo
        </label>
        <div className="relative">
          <User className={iconClasses} />
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>

      {/* WhatsApp */}
      <div className="relative group">
        <label htmlFor="whatsapp" className={labelClasses}>
          WhatsApp
        </label>
        <div className="relative">
          <Phone className={iconClasses} />
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            placeholder="Ej. 999 000 000"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>

      {/* Email */}
      <div className="relative group">
        <label htmlFor="email" className={labelClasses}>
          Email Corporativo / Personal
        </label>
        <div className="relative">
          <Mail className={iconClasses} />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ej. juan@correo.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>
      </div>

      {/* Program Selection */}
      <div>
        <label htmlFor="program" className={labelClasses}>
          Programa de Interés
        </label>
        <div className="relative">
          <BookOpen className={iconClasses} />
          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className={`${inputClasses} appearance-none cursor-pointer`}
          >
            <option value="psicologia_oratoria">Psicología de la Oratoria</option>
            <option value="locucion_comercial">Locución Comercial</option>
          </select>
        </div>
      </div>

      {/* Modality */}
      <div>
        <label htmlFor="modality" className={labelClasses}>
          Modalidad
        </label>
        <div className="relative">
          <Monitor className={iconClasses} />
          <select
            id="modality"
            name="modality"
            value={formData.modality}
            onChange={handleChange}
            className={`${inputClasses} appearance-none cursor-pointer`}
          >
            <option value="presencial">Presencial (Sede Juliaca)</option>
            <option value="hibrida">Híbrida (Presencial + Online)</option>
          </select>
        </div>
      </div>

      {/* Preferred Time */}
      <div>
        <label htmlFor="preferredTime" className={labelClasses}>
          Horario Preferido
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "manana", label: "Mañana" },
            { value: "tarde", label: "Tarde" },
            { value: "noche", label: "Noche" },
          ].map((time) => (
            <button
              key={time.value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, preferredTime: time.value }))}
              className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all border ${
                formData.preferredTime === time.value
                  ? "bg-[#1a2d5c] dark:bg-[#f4a835] text-white dark:text-[#1a2d5c] border-[#1a2d5c] dark:border-[#f4a835] shadow-lg scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#f4a835] hover:text-[#f4a835] dark:hover:text-[#f4a835]"
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2"
        >
          <span>⚠️</span> {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#f4a835] to-[#e59620] hover:from-[#e59620] hover:to-[#d68b15] text-white font-bold py-6 rounded-xl shadow-lg shadow-orange-200 transition-all text-lg"
        >
          {loading ? "Procesando..." : "CONFIRMAR RESERVA"}
        </Button>
      </motion.div>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <span>🔒</span>
        <p>Tus datos están protegidos y seguros.</p>
      </div>
    </motion.form>
  )
}
