import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET manquant")
}

/* =========================
   JWT TYPE (MINIMAL & SECURE)
========================= */
export type JwtUser = {
  id: string
}

/* =========================
   SIGN TOKEN (ACCESS TOKEN)
========================= */
export function signToken(payload: JwtUser) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  })
}

/* =========================
   VERIFY TOKEN
========================= */
export function verifyToken(token: string): JwtUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUser
  } catch {
    return null
  }
}

/* =========================
   GET USER FROM REQUEST
========================= */
export function getCurrentUser(
  req: NextRequest
): JwtUser | null {
  const token =
    req.cookies.get("access_token")?.value

  if (!token) return null

  return verifyToken(token)
}

/* =========================
   PASSWORD SECURITY
========================= */
export async function hashPassword(
  password: string
) {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash)
}