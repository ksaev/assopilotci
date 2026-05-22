import { NextRequest, NextResponse } from "next/server"
import { verify, sign } from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value

    if (!refreshToken) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const JWT_SECRET = process.env.JWT_SECRET!

    const payload = verify(refreshToken, JWT_SECRET) as any

    // 🔁 nouveau access token
    const newAccessToken = sign(
      { sub: payload.sub, role: payload.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    )

    const res = NextResponse.json({ success: true })

    res.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    })

    return res
  } catch {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}