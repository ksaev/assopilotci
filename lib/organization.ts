import { prisma } from "@/lib/prisma"

export async function verifyOrganizationAccess({
  userId,
  organizationSlug,
}: {
  userId: string
  organizationSlug: string
}) {
  const membership = await prisma.organizationMember.findFirst({
    where: {
      userId,
      organization: {
        slug: organizationSlug,
      },
    },
    include: {
      organization: true,
    },
  })

  if (!membership) {
    throw new Error("FORBIDDEN")
  }

  return membership.organization
}