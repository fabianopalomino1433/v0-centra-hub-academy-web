
import { NextResponse } from "next/server";
import { loadRegistrations } from "@/lib/db";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const registrations = await loadRegistrations();

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Define headers
    const headers = [
      "id",
      "timestamp",
      "fullName",
      "whatsapp",
      "email",
      "program",
      "modality",
      "preferredTime",
    ];
    
    // Convert data to worksheet format
    const worksheetData = [
      headers,
      ...registrations.map(reg => [
        reg.id,
        new Date(reg.timestamp).toLocaleString(),
        reg.fullName,
        reg.whatsapp,
        reg.email,
        reg.program,
        reg.modality,
        reg.preferredTime,
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inscripciones");

    // Generate a buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Create the response
    const response = new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="inscripciones_${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });

    return response;

  } catch (error) {
    console.error("Error generating XLSX file:", error);
    return NextResponse.json({ error: "Error al generar el archivo XLSX" }, { status: 500 });
  }
}
