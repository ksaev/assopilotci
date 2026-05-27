import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    )

    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      )
    }

    // 🔐 JWT CLEAN (ONLY ID)
    const accessToken = sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    )

    const refreshToken = sign(
      {
        userId: user.id,
      },
      process.env.REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    )

    const memberships = user.memberships

    const primaryOrg =
      memberships[0]?.organization || null

    const res = NextResponse.json({
      success: true,

      redirectTo:
        memberships.length > 1
          ? "/select-organization"
          : primaryOrg
          ? primaryOrg.slug
              ? `/admin/dashboard`
              : `/membre/dashboard`
          : "/no-organization",
    })

    // 🔐 ACCESS TOKEN
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    })

    // 🔐 REFRESH TOKEN
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (e) {
    console.error(e)

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    )
  }
}