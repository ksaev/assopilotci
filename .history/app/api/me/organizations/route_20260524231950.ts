import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import {prisma} from "@/lib/prisma"
import type { OrganizationMember } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value
    if (!token) return NextResponse.json({ organizations: [] })

    const user = verify(token, process.env.JWT_SECRET!) as any

    const memberships = await prisma.organizationMember.findMany({
      where: { userId: user.id },
      include: {
        organization: true,
      },
    })

    return NextResponse.json({
      organizations: memberships.map((m: OrganizationMember) => ({
        id: m.organization.id,
        name: m.organization.name,
        logo: m.organization.logo,
        role: m.role,
      })),
    })
  } catch {
    return NextResponse.json({ organizations: [] })
  }
}