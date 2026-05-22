import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { OrganizationStatus } from "@prisma/client"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { action } = await req.json()

    const status =
      action === "approve"
        ? OrganizationStatus.ACTIVE
        : OrganizationStatus.SUSPENDED

    // 🔥 FIX CRITIQUE
    const org = await prisma.organization.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    })

    return NextResponse.json(org)
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    )
  }
}