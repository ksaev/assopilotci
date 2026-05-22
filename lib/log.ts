import prisma from "./prisma"

export async function logActivity({
  userId,
  organizationId,
  action,
  entity,
  entityId,
}: {
  userId: string
  organizationId?: string
  action: string
  entity: string
  entityId?: string
}) {
  await prisma.activityLog.create({
    data: {
      userId,
      organizationId: organizationId || "SYSTEM",
      action,
      entity,
      entityId,
    },
  })
}