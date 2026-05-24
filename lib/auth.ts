import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret"

export type JwtUser = {
  userId: string
  role: string
  organizationId?: string
}

/* =========================
   TOKEN SIGN
========================= */
export function signToken(payload: JwtUser) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

/* =========================
   TOKEN VERIFY
========================= */
export function verifyToken(token: string): JwtUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUser
  } catch {
    return null
  }
}

/* =========================
   GET CURRENT USER (AJOUT IMPORTANT)
========================= */
export function getCurrentUser(req: NextRequest): JwtUser | null {
  const token = req.cookies.get("access_token")?.value

  if (!token) return null

  return verifyToken(token)
}

/* =========================
   PASSWORD SECURITY
========================= */
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}