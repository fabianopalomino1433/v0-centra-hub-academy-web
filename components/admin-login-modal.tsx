"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    if (password === "Lolitacity") {
      // Set a simple flag in localStorage to allow access to the admin page
      localStorage.setItem("admin_authenticated", "true")
      onClose()
      router.push("/admin")
    } else {
      setError(true)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1a2d5c] dark:text-white">
            <Lock className="w-5 h-5 text-[#f4a835]" />
            Acceso Administrativo
          </DialogTitle>
          <DialogDescription>
            Ingresa la contraseña maestra para acceder al panel.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">Contraseña incorrecta</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleLogin} className="bg-[#1a2d5c] hover:bg-[#1a2d5c]/90 text-white">Ingresar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
