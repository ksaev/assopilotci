import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

/**
 * =========================
 * JWT TYPE
 * =========================
 */
type JwtPayload = {
  id: string
}

/**
 * =========================
 * RESPONSE TYPE
 * =========================
 */
type OrganizationDTO = {
  id: string
  name: string
  slug: string
  logo: string | null
  city: string | null
  country: string | null
  role: string
}

/**
 * =========================
 * API ROUTE
 * =========================
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json<{ organizations: OrganizationDTO[] }>({
        organizations: [],
      })
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload

    if (!decoded?.id) {
      return NextResponse.json({ organizations: [] })
    }

    /**
     * =========================
     * DATABASE QUERY
     * =========================
     */
    const memberships = await prisma.organizationMember.findMany({
      where: {
        userId: decoded.id,
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

    /**
     * =========================
     * MAPPING SAFE (NO ANY)
     * =========================
     */
    const organizations: OrganizationDTO[] = memberships.map((m) => ({
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