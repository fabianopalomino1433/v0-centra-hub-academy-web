import { RegistrationPage } from "@/components/registration-page"
import { loadContent } from "@/lib/db"

export const metadata = {
  title: "Reserva tu Inscripción | CENTRAJUV",
  description:
    "Inscríbete en nuestros talleres de oratoria, liderazgo y comunicación. Material físico gratis al inscribirse.",
}

export default async function Home() {
  const content = await loadContent()
  return <RegistrationPage initialContent={content} />
}

