import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  id: string
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json({ organizations: [] })
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload

    // 🔥 IMPORTANT : typage implicite forcé ici
    const memberships = await prisma.organizationMember.findMany({
      where: { userId: decoded.id },
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

    // ✔ PLUS AUCUNE ERREUR TS ICI
    const organizations = memberships.map((m: any) => ({
      id: m.organization.id,
      name: m.organization.name,
      logo: m.organization.logo,
      role: m.role,
    }))

    return NextResponse.json({ organizations })
  } catch {
    return NextResponse.json({ organizations: [] }, { status: 401 })
  }
}