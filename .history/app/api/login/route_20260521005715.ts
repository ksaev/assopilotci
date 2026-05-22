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
            message: "Email et mot de passe requis",
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
            title: "Compte introuvable",
            message: "Aucun utilisateur trouvé",
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
            message: "Identifiants invalides",
            code: "INVALID_PASSWORD",
          },
        },
        { status: 401 }
      )
    }

    const JWT_SECRET = process.env.JWT_SECRET
    const REFRESH_SECRET = process.env.REFRESH_SECRET

    if (!JWT_SECRET || !REFRESH_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: {
            title: "Erreur serveur",
            message: "Configuration JWT manquante",
            code: "JWT_CONFIG_ERROR",
          },
        },
        { status: 500 }
      )
    }

    const organization = user.memberships[0]?.organization ?? null

    // ACCESS TOKEN (15 min)
    const accessToken = sign(
      {
        sub: user.id,
        role: user.role,
        orgId: organization?.id ?? null,
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    )

    // REFRESH TOKEN (7 jours)
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
      user: {
        id: user.id,
        email: user.email,
      },
    })

    // COOKIE ACCESS
    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    })

    // COOKIE REFRESH
    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error("LOGIN ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: {
          title: "Erreur serveur",
          message: "Impossible de traiter la connexion",
          code: "SERVER_ERROR",
        },
      },
      { status: 500 }
    )
  }
}