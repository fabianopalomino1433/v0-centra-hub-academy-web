"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    program: "oratoria",
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
        program: "oratoria",
        modality: "presencial",
        preferredTime: "manana",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <h3 className="text-2xl font-bold text-[#1a2d5c] mb-6">Formulario de Inscripción</h3>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
          Nombre Completo
        </label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Ej. Juan Pérez"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 mb-2">
          WhatsApp
        </label>
        <Input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          placeholder="Ej. 999 000 000"
          value={formData.whatsapp}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
          Email Corporativo / Personal
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Ej. juan@correo.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      {/* Program Selection */}
      <div>
        <label htmlFor="program" className="block text-sm font-semibold text-slate-700 mb-2">
          Programa
        </label>
        <select
          id="program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a835] bg-white"
        >
          <option value="oratoria">Oratoria y Liderazgo</option>
          <option value="lectura">Velocidad de Lectura</option>
          <option value="expresion">Exprésate Mejor</option>
          <option value="locucion">Locución</option>
        </select>
      </div>

      {/* Modality */}
      <div>
        <label htmlFor="modality" className="block text-sm font-semibold text-slate-700 mb-2">
          Modalidad
        </label>
        <select
          id="modality"
          name="modality"
          value={formData.modality}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a835] bg-white"
        >
          <option value="presencial">Presencial (Sede Juliaca)</option>
          <option value="hibrida">Híbrida (Presencial + Online)</option>
        </select>
      </div>

      {/* Preferred Time */}
      <div>
        <label htmlFor="preferredTime" className="block text-sm font-semibold text-slate-700 mb-2">
          Horario Preferido
        </label>
        <div className="flex gap-3">
          {[
            { value: "manana", label: "Mañana" },
            { value: "tarde", label: "Tarde" },
            { value: "noche", label: "Noche" },
          ].map((time) => (
            <button
              key={time.value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, preferredTime: time.value }))}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                formData.preferredTime === time.value
                  ? "bg-[#f4a835] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f4a835] hover:bg-[#e59620] text-white font-bold py-3 rounded-lg transition-all"
      >
        {loading ? "Procesando..." : "Confirmar Reserva"}
      </Button>

      {/* Security Note */}
      <p className="text-xs text-slate-500 text-center">Tus datos están protegidos bajo estándares de seguridad SSL.</p>
    </form>
  )
}
