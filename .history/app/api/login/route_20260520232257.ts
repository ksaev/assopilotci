import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    /* =======================================================
       1. RECUPERATION DES DONNEES
    ======================================================= */

    const { email, password } = await req.json()

    // Vérification basique
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
       2. RECHERCHE UTILISATEUR
    ======================================================= */

    const user = await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    })

    // Utilisateur introuvable
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            title: "Utilisateur introuvable",
            message:
              "Aucun compte associé à cet email.",
            code: "USER_NOT_FOUND",
          },
        },
        { status: 404 }
      )
    }

    /* =======================================================
       3. VERIFICATION MOT DE PASSE
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
            message:
              "Le mot de passe fourni est invalide.",
            code: "INVALID_PASSWORD",
          },
        },
        { status: 401 }
      )
    }

    /* =======================================================
       4. SECRET JWT
    ======================================================= */

    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
      throw new Error(
        "JWT_SECRET manquant dans .env"
      )
    }

    /* =======================================================
       5. ORGANISATION PRINCIPALE
    ======================================================= */

    const organization =
      user.memberships[0]?.organization ?? null

    /* =======================================================
       6. CREATION DU TOKEN JWT
    ======================================================= */

    /*
      expiresIn: "15m"

      -> le token devient invalide après 15 minutes

      Même si quelqu’un possède encore le cookie,
      le proxy refusera automatiquement l’accès.

      L’utilisateur devra se reconnecter.
    */

    const token = sign(
      {
        sub: user.id,

        // rôle utilisateur
        role: user.role,

        // organisation liée
        orgId: organization?.id ?? null,
      },

      JWT_SECRET,

      {
        expiresIn: "15m",
      }
    )

    /* =======================================================
       7. CREATION REPONSE
    ======================================================= */

    const response = NextResponse.json({
      success: true,

      role: user.role,

      user: {
        id: user.id,
        email: user.email,
      },
    })

    /* =======================================================
       8. COOKIE SECURISE
    ======================================================= */

    /*
      httpOnly:
      -> impossible d’accéder au cookie via JS frontend

      secure:
      -> HTTPS obligatoire en production

      sameSite:
      -> protection CSRF basique

      maxAge:
      -> durée cookie = 15 minutes

      IMPORTANT :
      Même si cookie encore présent,
      JWT expiré = accès refusé.
    */

    response.cookies.set("token", token, {
      httpOnly: true,

      secure:
        process.env.NODE_ENV === "production",

      sameSite: "lax",

      path: "/",

      maxAge: 60 * 15,
    })

    /* =======================================================
       9. RETOUR SUCCES
    ======================================================= */

    return response
  } catch (error) {
    console.error(error)

    /* =======================================================
       10. ERREUR SERVEUR
    ======================================================= */

    return NextResponse.json(
      {
        success: false,

        error: {
          title: "Erreur serveur",

          message:
            "Impossible de traiter la connexion actuellement.",

          code: "SERVER_ERROR",
        },
      },

      {
        status: 500,
      }
    )
  }
}