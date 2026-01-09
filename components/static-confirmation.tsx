"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function StaticConfirmation() {
  const whatsappNumber = "+51978797369"
  const defaultProgram = "Oratoria y Liderazgo"
  const defaultName = "nuestro próximo estudiante estrella"

  const handleWhatsApp = () => {
    const message = `Hola! Me gustaría tener más información sobre el programa de ${defaultProgram}.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-6 relative z-10">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <Image
            src="/whatsapp-logo.svg"
            alt="WhatsApp Logo"
            width={56}
            height={56}
            className="text-5xl"
          />
        </div>
        <h2 className="text-2xl font-bold text-[#1a2d5c] dark:text-white">¡Inscripciones Abiertas!</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Las inscripciones se realizan directamente por WhatsApp para una atención personalizada.
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2 text-sm text-center">
        <p className="text-slate-600 dark:text-slate-300">
          Haz clic en el botón para ser redirigido a WhatsApp y conversar con un asesor que te guiará en el proceso.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleWhatsApp}
          className="w-full bg-[#f4a835] hover:bg-[#d68b15] text-[#1a2d5c] font-bold py-6 rounded-xl text-lg"
        >
          Contactar por WhatsApp
        </Button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
        ¡Te esperamos para que te conviertas en {defaultName}!
      </p>
    </div>
  )
}
