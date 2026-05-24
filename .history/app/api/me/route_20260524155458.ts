import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const token = (await cookies()).get("token")?.value

  if (!token) {
    return NextResponse.json(null)
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as any

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        lastLogin: true,
      },
    })

    return NextResponse.json(user)
  } catch {
    return NextResponse.json(null)
  }
}