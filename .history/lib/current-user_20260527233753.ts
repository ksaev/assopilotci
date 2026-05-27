import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },

    include: {
      memberships: {
        include: {
          organization: {
            include: {
              settings: true,
            },
          },
        },
      },
    },
  })

  if (!user) return null

  const membership = user.memberships[0]

  if (!membership) return null

  return {
    id: user.id,

    fullName:
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),

    email: user.email,
    phone: user.phone,
    avatar: user.avatar,

    role: membership.role,

    organization: {
      id: membership.organization.id,
      name: membership.organization.name,
      slug: membership.organization.slug,
      logo: membership.organization.logo,
      country: membership.organization.country,
      city: membership.organization.city,
      region: membership.organization.region,
      status: membership.organization.status,
      settings: membership.organization.settings,
    },
  }
}