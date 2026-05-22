import { NextRequest, NextResponse } from "next/server"
import { verify, sign } from "jsonwebtoken"

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET!) as any

    const newToken = sign(
      {
        sub: payload.sub,
        role: payload.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn:
          payload.role === "SUPER_ADMIN" ? "15m" : "7d",
      }
    )

    const res = NextResponse.json({ success: true })

    res.cookies.set("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge:
        payload.role === "SUPER_ADMIN"
          ? 60 * 15
          : 60 * 60 * 24 * 7,
    })

    return res
  } catch {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}