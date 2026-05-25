import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const { organizationId } = await req.json()

  const user = verify(token, process.env.JWT_SECRET!) as any

  const membership = await prisma.organizationMember.findFirst({
    where: {
      userId: user.id,
      organizationId,
    },
  })

  if (!membership) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 })
  }

  const res = NextResponse.json({
    role: membership.role,
    organizationId,
  })

  res.cookies.set("active_org", organizationId, {
    httpOnly: true,
    path: "/",
  })

  return res
}