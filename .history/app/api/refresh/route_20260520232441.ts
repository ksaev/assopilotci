import { NextRequest, NextResponse } from "next/server"
import { verify, sign } from "jsonwebtoken"

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value

  if (!refreshToken) {
    return NextResponse.json({ success: false, error: "no token" }, { status: 401 })
  }

  try {
    const payload = verify(
      refreshToken,
      process.env.REFRESH_SECRET!
    ) as any

    const newAccessToken = sign(
      {
        sub: payload.sub,
        role: payload.role,
      },
      process.env.JWT_SECRET!,
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
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "invalid refresh" },
      { status: 401 }
    )
  }
}