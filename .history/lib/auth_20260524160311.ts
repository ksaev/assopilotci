import jwt, { SignOptions } from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NextRequest } from "next/server"

/* =========================
   JWT SECRET SAFE ACCESS
========================= */
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error("❌ Missing JWT_SECRET environment variable")
  }

  return secret
}

/* =========================
   TYPES
========================= */
export type JwtUser = {
  userId: string
  role: string
  organizationId?: string
}

/* =========================
   SIGN TOKEN
========================= */
export function signToken(payload: JwtUser) {
  const options: SignOptions = {
    expiresIn: "7d",
  }

  return jwt.sign(payload, getJwtSecret(), options)
}

/* =========================
   VERIFY TOKEN
========================= */
export function verifyToken(token: string): JwtUser | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtUser
  } catch (err) {
    console.error("❌ JWT VERIFY ERROR:", err)
    return null
  }
}

/* =========================
   GET CURRENT USER (SAFE + ROBUST)
========================= */
export function getCurrentUser(req: NextRequest): JwtUser | null {
  const token =
    req.cookies.get("access_token")?.value ||
    req.cookies.get("token")?.value

  if (!token) return null

  const user = verifyToken(token)

  if (!user?.userId) return null

  return user
}

/* =========================
   PASSWORD SECURITY
========================= */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash)
}