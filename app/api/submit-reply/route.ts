import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { answer } = await request.json()
    const reply = await prisma.reply.create({
      data: { answer },
    })
    return NextResponse.json({ success: true, reply })
  } catch (error) {
    console.error("Failed to submit reply:", error)
    return NextResponse.json({ success: false, error: "Failed to submit reply" }, { status: 500 })
  }
}

