import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value

    if (!token) {
      return NextResponse.json({ organizations: [] })
    }

    const user = verify(token, process.env.JWT_SECRET!) as {
      id: string
      role?: string
    }

    const memberships = await prisma.organizationMember.findMany({
      where: {
        userId: user.id,
      },
      include: {
        organization: true,
      },
    })

    const organizations = memberships.map((m: any) => ({
      id: m.organization.id,
      name: m.organization.name,
      logo: m.organization.logo,
      role: m.role,
    }))

    return NextResponse.json({ organizations })
  } catch (error) {
    return NextResponse.json({ organizations: [] })
  }
}