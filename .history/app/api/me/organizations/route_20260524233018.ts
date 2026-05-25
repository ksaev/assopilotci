import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  id: string
}

type Membership = {
  role: string
  organization: {
    id: string
    name: string
    logo: string | null
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json({ organizations: [] })
    }

    const user = verify(token, process.env.JWT_SECRET!) as JwtPayload

    const memberships: Membership[] = await prisma.organizationMember.findMany({
      where: { userId: user.id },
      select: {
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    })

    const organizations = memberships.map((m) => ({
      id: m.organization.id,
      name: m.organization.name,
      logo: m.organization.logo,
      role: m.role,
    }))

    return NextResponse.json({ organizations })
  } catch {
    return NextResponse.json({ organizations: [] })
  }
}