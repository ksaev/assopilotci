import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    /* =======================================================
       1. DONNEES REQUETE
    ======================================================= */

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

    /* =======================================================
       2. UTILISATEUR
    ======================================================= */

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

    /* =======================================================
       3. MOT DE PASSE
    ======================================================= */

    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {
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

    /* =======================================================
       4. JWT SECRET
    ======================================================= */

    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET manquant")
    }

    /* =======================================================
       5. ORGANISATION
    ======================================================= */

    const organization =
      user.memberships[0]?.organization ?? null

    /* =======================================================
       6. ROLE → DUREE SESSION
    ======================================================= */

    const isSuperAdmin = user.role === "SUPER_ADMIN"

    const expiresIn = isSuperAdmin ? "15m" : "7d"

    const maxAge = isSuperAdmin
      ? 60 * 15 // 15 minutes
      : 60 * 60 * 24 * 7 // 7 jours

    /* =======================================================
       7. TOKEN JWT
    ======================================================= */

    const token = sign(
      {
        sub: user.id,
        role: user.role,
        orgId: organization?.id ?? null,
      },
      JWT_SECRET,
      { expiresIn }
    )

    /* =======================================================
       8. RESPONSE + COOKIE
    ======================================================= */

    const response = NextResponse.json({
      success: true,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
      },
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    return response
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: {
          title: "Erreur serveur",
          message: "Impossible de traiter la connexion.",
          code: "SERVER_ERROR",
        },
      },
      { status: 500 }
    )
  }
}