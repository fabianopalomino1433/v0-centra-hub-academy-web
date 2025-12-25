"use client"

import { useState } from "react"
import { RegistrationForm } from "./registration-form"
import { ConfirmationModal } from "./confirmation-modal"
import Image from "next/image"

export function RegistrationPage() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submittedData, setSubmittedData] = useState<any>(null)

  const handleSubmitSuccess = (data: any) => {
    setSubmittedData(data)
    setShowConfirmation(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/480327209-8927883004000304-8534569882409152595-n.jpg"
                alt="CENTRAJUV Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1a2d5c]">CENTRAJUV</h1>
              <p className="text-sm text-slate-600">Academia de Oratoria y Liderazgo</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a2d5c] leading-tight mb-6">
                Reserva tu <span className="text-[#f4a835]">inscripción</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                Estás a un paso de transformar tu comunicación. Completa el formulario y un asesor senior se contactará
                contigo.
              </p>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-[#1a2d5c] to-[#2d4475] rounded-2xl p-8 text-white space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-[#f4a835] mb-2">TELÉFONO</h3>
                <p className="text-2xl font-bold">+51 987 460 681</p>
                <p className="text-slate-300">+51 924 771 712</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#f4a835] mb-2">UBICACIÓN</h3>
                <p className="text-lg font-semibold">📍 Plaza de Armas, Juliaca</p>
                <p className="text-slate-300 text-sm">Nos encuentras al frente de la Plaza de Armas, Juliaca</p>
              </div>
              <div className="pt-4 border-t border-slate-500">
                <p className="text-sm text-slate-300">Disponible también en modalidad híbrida (presencial + online)</p>
              </div>
            </div>

            {/* Bonus Info */}
            <div className="border-2 border-[#f4a835] rounded-xl p-6 bg-[#f4a835]/5">
              <h3 className="font-bold text-[#f4a835] mb-2">🎁 BONO POR INSCRIPCIÓN</h3>
              <p className="text-slate-700 font-semibold">Recibe un libro físico GRATIS</p>
              <p className="text-sm text-slate-600 mt-2">
                Acceso exclusivo a material de referencia para reforzar lo aprendido.
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="lg:sticky lg:top-24">
            <RegistrationForm onSubmitSuccess={handleSubmitSuccess} />
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && <ConfirmationModal data={submittedData} onClose={() => setShowConfirmation(false)} />}
    </div>
  )
}
