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
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    let status: any

    switch (action) {
      case "activate":
        status = "ACTIVE"
        break
      case "suspend":
        status = "SUSPENDED"
        break
      case "archive":
        status = "ARCHIVED"
        break
      case "restore":
        status = "ACTIVE"
        break
      case "pending":
        status = "PENDING"
        break
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        )
    }

    const org = await prisma.organization.update({
      where: { id },
      data: { status },
      include: {
        _count: {
          select: {
            members: true,
            memberProfiles: true,
            logs: true,
          },
        },
        logs: true,
      },
    })

    // LOG SYSTEM
    await prisma.activityLog.create({
      data: {
        action: `ORG_${action.toUpperCase()}`,
        entity: "Organization",
        entityId: id,
        userId: "system",
        organizationId: id,
      },
    })

    return NextResponse.json(org)
  } catch (e) {
    return NextResponse.json(
      { error: "SERVER_ERROR" },
      { status: 500 }
    )
  }
}