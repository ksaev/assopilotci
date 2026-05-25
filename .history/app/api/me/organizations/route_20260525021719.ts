import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  sub: string
  role?: string
  orgId?: string
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json({
        organizations: [],
      })
    }

    const user = verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload

    console.log("DECODED USER =", user)

    if (!user?.sub) {
      return NextResponse.json({
        organizations: [],
      })
    }

    const memberships = await prisma.organizationMember.findMany({
      where: {
        userId: user.sub,
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

    console.log("FILTERED MEMBERSHIPS =", memberships)

    const organizations = memberships.map((m) => ({
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      logo: m.organization.logo,
      city: m.organization.city,
      country: m.organization.country,
      role: m.role,
    }))

    return NextResponse.json({
      organizations,
    })
  } catch (error) {
    console.error("ORG API ERROR =", error)

    return NextResponse.json({
      organizations: [],
    })
  }
}