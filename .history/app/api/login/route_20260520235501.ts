import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            title: "Champs manquants",
            message: "Email et mot de passe requis.",
            code: "MISSING_FIELDS",
          },
        },
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
        {
          success: false,
          error: {
            title: "Utilisateur introuvable",
            message: "Aucun compte associé à cet email.",
            code: "USER_NOT_FOUND",
          },
        },
        { status: 404 }
      )
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            title: "Mot de passe incorrect",
            message: "Identifiants invalides.",
            code: "INVALID_PASSWORD",
          },
        },
        { status: 401 }
      )
    }

    const JWT_SECRET = process.env.JWT_SECRET!
    const REFRESH_SECRET = process.env.REFRESH_SECRET!

    const org = user.memberships[0]?.organization ?? null

    const accessToken = sign(
      {
        sub: user.id,
        role: user.role,
        orgId: org?.id ?? null,
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    )

    const refreshToken = sign(
      {
        sub: user.id,
      },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    )

    const response = NextResponse.json({
      success: true,
      role: user.role,
    })

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    })

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: {
          title: "Erreur serveur",
          message: "Connexion impossible.",
          code: "SERVER_ERROR",
        },
      },
      { status: 500 }
    )
  }
}