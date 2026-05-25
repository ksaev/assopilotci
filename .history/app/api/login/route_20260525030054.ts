import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign, verify } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Champs manquants" },
        { status: 400 }
      )
    }

    // =========================
    // 🔒 ANTI DOUBLE LOGIN
    // =========================
    const existingToken = req.headers.get("cookie")?.includes("access_token")

    if (existingToken) {
      try {
        // si token valide → stop login
        const cookie = req.headers.get("cookie") || ""
        const token = cookie
          .split("access_token=")[1]
          ?.split(";")[0]

        if (token) {
          verify(token, process.env.JWT_SECRET!)
          return NextResponse.json({
            success: true,
            message: "Déjà connecté",
          })
        }
      } catch {}
    }

    // =========================
    // USER FETCH
    // =========================
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
        { success: false, message: "Utilisateur introuvable" },
        { status: 404 }
      )
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Mot de passe invalide" },
        { status: 401 }
      )
    }

    // =========================
    // ORG DEFAULT
    // =========================
    const defaultOrg = user.memberships[0]?.organization

    // =========================
    // 🔥 ACCESS TOKEN CLEAN
    // =========================
    const accessToken = sign(
      {
        id: user.id, // IMPORTANT (pas sub)
        role: user.role,
        orgId: defaultOrg?.id || null,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    )

    // =========================
    // 🔥 REFRESH TOKEN
    // =========================
    const refreshToken = sign(
      { id: user.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    )

    // =========================
    // RESPONSE
    // =========================
    const res = NextResponse.json({
      success: true,
      multiple: user.memberships.length > 1,
      defaultOrg: defaultOrg?.slug || null,
    })

    // =========================
    // COOKIES SECURE
    // =========================
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
    console.error("LOGIN ERROR:", e)

    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}