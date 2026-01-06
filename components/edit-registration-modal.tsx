
"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

interface Registration {
  id: string
  timestamp: string
  fullName: string
  whatsapp: string
  email: string
  program: string
  modality: string
  preferredTime: string
}

interface EditRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  registration: Registration | null
  onSave: (updatedRegistration: Registration) => void
}

export function EditRegistrationModal({
  isOpen,
  onClose,
  registration,
  onSave,
}: EditRegistrationModalProps) {
  const [formData, setFormData] = useState<Registration | null>(null)

  useEffect(() => {
    setFormData(registration)
  }, [registration])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    if (formData) {
      onSave(formData)
    }
  }

  if (!registration) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Inscripción</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Nombre
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData?.fullName || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="whatsapp" className="text-right">
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              value={formData?.whatsapp || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="program" className="text-right">
              Programa
            </Label>
            <Input
              id="program"
              name="program"
              value={formData?.program || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modality" className="text-right">
              Modalidad
            </Label>
            <Input
              id="modality"
              name="modality"
              value={formData?.modality || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="preferredTime" className="text-right">
              Horario
            </Label>
            <Input
              id="preferredTime"
              name="preferredTime"
              value={formData?.preferredTime || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
