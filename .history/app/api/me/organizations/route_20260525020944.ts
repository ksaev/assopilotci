import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"

type JwtPayload = {
  id: string
}

type MembershipWithOrg = Prisma.OrganizationMemberGetPayload<{
  select: {
    role: true
    organization: {
      select: {
        id: true
        name: true
        slug: true
        logo: true
        city: true
        country: true
      }
    }
  }
}>

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json({ organizations: [] })
    }

    const user = verify(token, process.env.JWT_SECRET!) as JwtPayload

    if (!user?.id) {
      return NextResponse.json({ organizations: [] })
    }

    const memberships = await prisma.organizationMember.findMany({
      where: {
        userId: user.id,
      },
      select: {
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            city: true,
            country: true,
          },
        },
      },
    })

    const organizations = memberships.map((m: MembershipWithOrg) => ({
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      logo: m.organization.logo,
      city: m.organization.city,
      country: m.organization.country,
      role: m.role,
    }))

    return NextResponse.json({ organizations })
  } catch (error) {
    console.error("ORG API ERROR:", error)
    return NextResponse.json({ organizations: [] })
  }
}