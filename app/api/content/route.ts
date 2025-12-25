import { type NextRequest, NextResponse } from "next/server"
import { loadContent, saveContent } from "@/lib/db"

export async function GET() {
  try {
    const content = await loadContent()
    return NextResponse.json(content || {})
  } catch (error) {
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await saveContent(body)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
  }
}
