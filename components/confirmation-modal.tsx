"use client"
import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  data: any
  onClose: () => void
}

export function ConfirmationModal({ data, onClose }: ConfirmationModalProps) {
  const whatsappNumber = "+51987460681"
  const programNames: Record<string, string> = {
    oratoria: "Oratoria y Liderazgo",
    lectura: "Velocidad de Lectura",
    expresion: "Exprésate Mejor",
    locucion: "Locución",
  }

  const handleWhatsApp = () => {
    const message = `Hola! Me gustaría confirmar mi inscripción en el programa de ${programNames[data.program]}. Mi nombre es ${data.fullName} y mi WhatsApp es ${data.whatsapp}.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 animate-in fade-in zoom-in">
        <div className="text-center space-y-2">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-[#1a2d5c]">¡Reserva Confirmada!</h2>
          <p className="text-slate-600">Tu inscripción ha sido registrada exitosamente.</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
          <div>
            <span className="text-slate-600">Nombre:</span>
            <p className="font-semibold text-slate-900">{data.fullName}</p>
          </div>
          <div>
            <span className="text-slate-600">Programa:</span>
            <p className="font-semibold text-slate-900">{programNames[data.program]}</p>
          </div>
          <div>
            <span className="text-slate-600">Modalidad:</span>
            <p className="font-semibold text-slate-900 capitalize">{data.modality}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
          >
            Confirmar por WhatsApp
          </Button>
          <Button
            onClick={onClose}
            className="w-full bg-[#1a2d5c] hover:bg-[#0f1e3d] text-white font-bold py-2 rounded-lg"
          >
            Cerrar
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center">Un asesor se contactará contigo muy pronto.</p>
      </div>
    </div>
  )
}
