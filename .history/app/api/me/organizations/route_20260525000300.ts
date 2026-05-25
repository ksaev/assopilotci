import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  id: string
  email?: string
}

interface Organization {
  id: string
  name: string
  logo: string | null
  slug: string
  city: string | null
  country: string | null
}

interface OrganizationMembership {
  role: string
  organization: Organization
}

interface OrganizationWithRole extends Organization {
  role: string
}

interface OrganizationsResponse {
  organizations: OrganizationWithRole[]
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json({ organizations: [] })
    }

    const user = verify(token, process.env.JWT_SECRET!) as JwtPayload

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
            logo: true,
            slug: true,
            city: true,
            country: true,
          },
        },
      },
    })

    const organizations = memberships.map((m) => ({
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
    return NextResponse.json(
      { organizations: [] },
      { status: 200 }
    )
  }
}