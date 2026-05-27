import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        memberships: true,
      },
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Utilisateur introuvable",
      }, { status: 404 })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json({
        success: false,
        message: "Mot de passe incorrect",
      }, { status: 401 })
    }

    const membership = user.memberships[0]

    if (!membership) {
      return NextResponse.json({
        success: false,
        message: "Aucune organisation",
      }, { status: 403 })
    }

    const accessToken = sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    )

    const refreshToken = sign(
      { userId: user.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    )

    const res = NextResponse.json({
      success: true,
      role: membership.role,
      organizationId: membership.organizationId,
    })

    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    })

    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Erreur serveur",
    }, { status: 500 })
  }
}