"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, LogOut, Save, RotateCcw } from "lucide-react"

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

export default function AdminPage() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // JSON Text States for complex fields
  const [programsJson, setProgramsJson] = useState("")
  const [testimonialsJson, setTestimonialsJson] = useState("")

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true"
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    Promise.all([fetchRegistrations(), fetchContent()]).finally(() => setLoading(false))
  }, [router])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/registrations")
      const data = await response.json()
      if (data.registrations) {
        setRegistrations(data.registrations.reverse()) // Newest first
      }
    } catch (error) {
      console.error("Error fetching registrations:", error)
    }
  }

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content")
      const data = await response.json()
      setContent(data)
      // Initialize JSON strings
      if (data.programs) setProgramsJson(JSON.stringify(data.programs, null, 2))
      if (data.testimonials) setTestimonialsJson(JSON.stringify(data.testimonials, null, 2))
    } catch (error) {
      console.error("Error fetching content:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/")
  }

  const exportToCSV = () => {
    const headers = ["ID", "Fecha", "Nombre", "WhatsApp", "Email", "Programa", "Modalidad", "Horario"]
    const rows = registrations.map(reg => [
      reg.id,
      new Date(reg.timestamp).toLocaleString(),
      `"${reg.fullName.replace(/"/g, '""')}"`,
      reg.whatsapp,
      reg.email,
      reg.program,
      reg.modality,
      reg.preferredTime
    ])
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `Inscripciones_Centrajuv_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSaveContent = async () => {
    setSaving(true)
    try {
      // Parse JSON fields
      const updatedPrograms = JSON.parse(programsJson)
      const updatedTestimonials = JSON.parse(testimonialsJson)

      const finalContent = {
        ...content,
        programs: updatedPrograms,
        testimonials: updatedTestimonials
      }

      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalContent),
      })

      if (response.ok) {
        alert("Contenido actualizado correctamente")
        // Refresh local state to ensure sync
        setContent(finalContent)
      } else {
        alert("Error al guardar")
      }
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Error: Verifica que el formato JSON en Programas o Testimonios sea válido.")
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Helper for Book Offer numeric field
  const handleNumberChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: parseInt(value) || 0
      }
    }))
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-[#1a2d5c] dark:text-[#f4a835] font-bold animate-pulse">Cargando panel...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-[#1a2d5c] dark:text-white">Panel Administrativo</h1>
            <p className="text-slate-500 dark:text-slate-400">Gestiona las inscripciones y el contenido del sitio.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Ver Sitio Web
            </Button>
            <Button variant="destructive" onClick={handleLogout} size="icon" title="Cerrar Sesión">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
            <TabsTrigger value="registrations">Inscripciones</TabsTrigger>
            <TabsTrigger value="content">Editar Contenido</TabsTrigger>
          </TabsList>

          {/* REGISTRATIONS TAB */}
          <TabsContent value="registrations">
            <div className="flex justify-end mb-4">
              <Button onClick={exportToCSV} className="bg-[#107c41] hover:bg-[#0c5e31] text-white gap-2">
                <Download className="w-4 h-4" /> Exportar a CSV
              </Button>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    <tr>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4">Nombre</th>
                      <th className="px-6 py-4">Contacto</th>
                      <th className="px-6 py-4">Interés</th>
                      <th className="px-6 py-4">Detalles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                          No hay inscripciones registradas aún.
                        </td>
                      </tr>
                    ) : (
                      registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">
                            {new Date(reg.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-bold text-[#1a2d5c] dark:text-white">
                            {reg.fullName}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-slate-600 dark:text-slate-300 font-mono text-xs">{reg.whatsapp}</span>
                              <span className="text-slate-400 text-xs">{reg.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold capitalize">
                              {reg.program.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">
                            <span className="capitalize">{reg.modality}</span> • <span className="capitalize">{reg.preferredTime}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* CONTENT EDITOR TAB */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation for Content Sections */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
                  <h3 className="font-bold text-[#1a2d5c] dark:text-white mb-4 px-2">Secciones</h3>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => document.getElementById('edit-hero')?.scrollIntoView({ behavior: 'smooth' })}>
                    1. Portada (Hero)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => document.getElementById('edit-programs')?.scrollIntoView({ behavior: 'smooth' })}>
                    2. Programas (JSON)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => document.getElementById('edit-book')?.scrollIntoView({ behavior: 'smooth' })}>
                    3. Oferta Libro
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => document.getElementById('edit-testimonials')?.scrollIntoView({ behavior: 'smooth' })}>
                    4. Testimonios (JSON)
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => document.getElementById('edit-footer')?.scrollIntoView({ behavior: 'smooth' })}>
                    5. Pie de Página
                  </Button>
                  
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                    <Button onClick={handleSaveContent} disabled={saving} className="w-full bg-[#f4a835] hover:bg-[#d68b15] text-[#1a2d5c]">
                      {saving ? "Guardando..." : "Guardar Cambios"} <Save className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Editor Forms */}
              <div className="lg:col-span-3 space-y-12 pb-24">
                
                {/* HERO EDITOR */}
                <section id="edit-hero" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                  <h2 className="text-xl font-bold text-[#1a2d5c] dark:text-white border-b pb-2">1. Portada (Hero)</h2>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Etiqueta Superior</Label>
                      <Input value={content.hero.badge} onChange={(e) => handleInputChange('hero', 'badge', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Título (Línea 1)</Label>
                        <Input value={content.hero.titleLine1} onChange={(e) => handleInputChange('hero', 'titleLine1', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Título (Línea 2 - Color)</Label>
                        <Input value={content.hero.titleLine2} onChange={(e) => handleInputChange('hero', 'titleLine2', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea value={content.hero.description} onChange={(e) => handleInputChange('hero', 'description', e.target.value)} />
                    </div>
                  </div>
                </section>

                {/* PROGRAMS JSON EDITOR */}
                <section id="edit-programs" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-xl font-bold text-[#1a2d5c] dark:text-white">2. Programas (Avanzado)</h2>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Edición JSON</span>
                  </div>
                  <p className="text-sm text-slate-500">Edita la estructura de programas con cuidado. Mantén el formato JSON válido.</p>
                  <Textarea 
                    value={programsJson} 
                    onChange={(e) => setProgramsJson(e.target.value)} 
                    className="font-mono text-xs min-h-[400px]"
                  />
                </section>

                {/* BOOK OFFER EDITOR */}
                <section id="edit-book" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                  <h2 className="text-xl font-bold text-[#1a2d5c] dark:text-white border-b pb-2">3. Oferta Libro</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Stock Disponible</Label>
                            <Input type="number" value={content.bookOffer.stock} onChange={(e) => handleNumberChange('bookOffer', 'stock', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                             <Label>Etiqueta Alerta</Label>
                             <Input value={content.bookOffer.badge} onChange={(e) => handleInputChange('bookOffer', 'badge', e.target.value)} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Título Principal</Label>
                        <Input value={content.bookOffer.titleLine1} onChange={(e) => handleInputChange('bookOffer', 'titleLine1', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Título Resaltado</Label>
                        <Input value={content.bookOffer.titleHighlight} onChange={(e) => handleInputChange('bookOffer', 'titleHighlight', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea value={content.bookOffer.description} onChange={(e) => handleInputChange('bookOffer', 'description', e.target.value)} />
                    </div>
                  </div>
                </section>

                {/* TESTIMONIALS JSON EDITOR */}
                <section id="edit-testimonials" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                   <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-xl font-bold text-[#1a2d5c] dark:text-white">4. Testimonios (Avanzado)</h2>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Edición JSON</span>
                  </div>
                  <Textarea 
                    value={testimonialsJson} 
                    onChange={(e) => setTestimonialsJson(e.target.value)} 
                    className="font-mono text-xs min-h-[300px]"
                  />
                </section>

                {/* FOOTER EDITOR */}
                <section id="edit-footer" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                  <h2 className="text-xl font-bold text-[#1a2d5c] dark:text-white border-b pb-2">5. Pie de Página</h2>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label>Teléfono</Label>
                        <Input value={content.footer.phone} onChange={(e) => handleInputChange('footer', 'phone', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Dirección</Label>
                        <Input value={content.footer.address} onChange={(e) => handleInputChange('footer', 'address', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Link de Facebook</Label>
                        <Input value={content.footer.facebook} onChange={(e) => handleInputChange('footer', 'facebook', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Link de TikTok</Label>
                        <Input value={content.footer.tiktok} onChange={(e) => handleInputChange('footer', 'tiktok', e.target.value)} />
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
