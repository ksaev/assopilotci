import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { title: "Champs manquants" } },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          include: { organization: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { title: "Utilisateur introuvable" } },
        { status: 404 }
      )
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json(
        { success: false, error: { title: "Mot de passe invalide" } },
        { status: 401 }
      )
    }

    // 🔴 CHECK ENV
    if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
      throw new Error("JWT_SECRET ou REFRESH_SECRET manquant")
    }

    const org = user.memberships[0]?.organization ?? null

    // ================= ACCESS TOKEN
    const accessToken = sign(
      {
        sub: user.id,
        role: user.role,
        orgId: org?.id ?? null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    )

    // ================= REFRESH TOKEN
    const refreshToken = sign(
      {
        sub: user.id,
      },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    )

    const res = NextResponse.json({
      success: true,
      role: user.role,
    })

    // ================= COOKIES
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    })

    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { success: false, error: { title: "Erreur serveur" } },
      { status: 500 }
    )
  }
}