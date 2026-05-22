import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { action } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 })
  }

  const map: Record<string, any> = {
    activate: "ACTIVE",
    suspend: "SUSPENDED",
    archive: "ARCHIVED",
    restore: "ACTIVE",
  }

  const status = map[action]

  if (!status) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  const org = await prisma.organization.update({
    where: { id },
    data: { status },
    include: {
      members: true,
      logs: true,
    },
  })

  // 🔥 SAFE LOG (NO FK CRASH)
  const systemUserId = await prisma.user.findFirst({
    select: { id: true },
  })

  if (systemUserId) {
    await prisma.activityLog.create({
      data: {
        action: `ORG_${status}`,
        entity: "Organization",
        entityId: id,
        userId: systemUserId.id,
        organizationId: id,
      },
    })
  }

  return NextResponse.json(org)
}