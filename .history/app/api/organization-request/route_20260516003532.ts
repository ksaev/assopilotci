import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const result = await prisma.organizationRequest.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        country: body.country,
        city: body.city || null,
        description: body.description || null,
        organizationType: body.organizationType || "unknown",
      },
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    )
  }
}