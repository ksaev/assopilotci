import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        memberships: true,
      },
    })

    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    // 🔥 JWT CLEAN
    const accessToken = sign(
      { sub: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    )

    const refreshToken = sign(
      { sub: user.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    )

    const res = NextResponse.json({
      success: true,
      multiple: user.memberships.length > 1,
    })

    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 15,
    })

    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}