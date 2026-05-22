import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { OrganizationStatus } from "@prisma/client"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { status } = await req.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      )
    }

    const validStatuses: OrganizationStatus[] = [
      "ACTIVE",
      "PENDING",
      "SUSPENDED",
      "ARCHIVED",
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    const org = await prisma.organization.update({
      where: { id },
      data: { status },
      include: {
        members: true,
        logs: true,
      },
    })

    // 🔥 LOG SAFE (sans crash FK)
    const adminUser = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" },
    })

    if (adminUser) {
      await prisma.activityLog.create({
        data: {
          action: `ORG_STATUS_CHANGE:${status}`,
          entity: "Organization",
          entityId: id,
          userId: adminUser.id,
          organizationId: id,
        },
      })
    }

    return NextResponse.json(org)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}