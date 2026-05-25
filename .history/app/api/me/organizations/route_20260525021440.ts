import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  id: string
  email?: string
  role?: string
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

    const memberships = await prisma.organizationMember.findMany({
      where: {
        userId: user.id,
      },
      include: {
        organization: true,
      },
    })

    console.log("MEMBERSHIPS =", memberships)

    return NextResponse.json({
      organizations: memberships,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      organizations: [],
    })
  }
}