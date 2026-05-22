import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { OrganizationStatus } from "@prisma/client"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await req.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      )
    }

    const allowed: OrganizationStatus[] = [
      "ACTIVE",
      "PENDING",
      "SUSPENDED",
      "ARCHIVED",
    ]

    if (!allowed.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    const org = await prisma.organization.update({
      where: { id },
      data: { status },
    })

    // 🔥 LOG AUTOMATIQUE
    await prisma.activityLog.create({
      data: {
        action: `STATUS_${status}`,
        entity: "Organization",
        entityId: id,
        userId: "system",
        organizationId: id,
      },
    })

    return NextResponse.json(org)
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}