import { type NextRequest, NextResponse } from "next/server"
import { loadRegistrations, saveRegistrations, type Registration } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.fullName || !body.whatsapp || !body.email) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 })
    }

    // Create new registration
    const newRegistration: Registration = {
      id: `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      fullName: body.fullName.trim(),
      whatsapp: body.whatsapp.trim(),
      email: body.email.trim().toLowerCase(),
      program: body.program,
      modality: body.modality,
      preferredTime: body.preferredTime,
    }

    // Load existing registrations
    const registrations = await loadRegistrations()

    // Add new registration
    registrations.push(newRegistration)

    // Save to file
    await saveRegistrations(registrations)

    console.log(`[CENTRAJUV] Nueva inscripción registrada: ${newRegistration.id}`)
    console.log(`[CENTRAJUV] Datos: ${JSON.stringify(newRegistration, null, 2)}`)

    return NextResponse.json(
      {
        success: true,
        message: "Inscripción registrada exitosamente",
        registrationId: newRegistration.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing registration:", error)
    return NextResponse.json({ error: "Error al procesar la inscripción" }, { status: 500 })
  }
}

// GET endpoint to retrieve registrations (for admin/verification)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isPublic = searchParams.get("public") === "true"
    const limit = parseInt(searchParams.get("limit") || "10", 10)

    const registrations = await loadRegistrations()

    if (isPublic) {
      // Return only names, newest first, limited count
      const publicRegistrations = registrations
        .slice()
        .reverse()
        .slice(0, limit)
        .map((reg) => ({ fullName: reg.fullName }))

      return NextResponse.json({
        registrations: publicRegistrations,
      })
    }

    return NextResponse.json({
      total: registrations.length,
      registrations: registrations,
    })
  } catch (error) {
    console.error("Error retrieving registrations:", error)
    return NextResponse.json({ error: "Error al recuperar registros" }, { status: 500 })
  }
}
