import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Données manquantes" })
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
      return NextResponse.json({ success: false, message: "Utilisateur introuvable" })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return NextResponse.json({ success: false, message: "Mot de passe incorrect" })
    }

    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing in environment variables")
    }

    const org = user.memberships[0]?.organization ?? null

    const token = sign(
      {
        sub: user.id,
        role: user.role,
        orgId: org?.id ?? null,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )
    console.log("TOKEN GENERATED:", token);
    const res = NextResponse.json({
      success: true,
      role: user.role,
    })

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, message: "Erreur serveur" })
  }
}