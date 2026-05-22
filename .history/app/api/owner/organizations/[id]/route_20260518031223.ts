import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { action } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 })
    }

    let status: "ACTIVE" | "SUSPENDED" | "ARCHIVED" = "SUSPENDED"

    if (action === "activate") status = "ACTIVE"
    if (action === "archive") status = "ARCHIVED"

    const org = await prisma.organization.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(org)
  } catch (e: any) {
    console.error(e)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}