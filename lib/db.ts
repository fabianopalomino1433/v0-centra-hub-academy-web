import fs from "fs/promises"
import path from "path"

export interface Registration {
  id: string
  timestamp: string
  fullName: string
  whatsapp: string
  email: string
  program: string
  modality: string
  preferredTime: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json")

const CONTENT_FILE = path.join(DATA_DIR, "content.json")

// Ensure data directory exists
export async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    console.error("Error creating data directory:", error)
  }
}

// Load registrations from JSON file
export async function loadRegistrations(): Promise<Registration[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(REGISTRATIONS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist or is empty, return empty array
    return []
  }
}

// Save registrations to JSON file
export async function saveRegistrations(registrations: Registration[]) {
  await ensureDataDir()
  await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2), "utf-8")
}

// Load content from JSON file
export async function loadContent() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(CONTENT_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error loading content:", error)
    return null
  }
}

// Save content to JSON file
export async function saveContent(content: any) {
  await ensureDataDir()
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8")
}
