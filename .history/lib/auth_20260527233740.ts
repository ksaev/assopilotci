import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET manquant")
}

/* =========================
   JWT TYPE (MINIMAL SAFE)
========================= */
export type JwtUser = {
  userId: string
}

/* =========================
   SIGN TOKEN
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
   SESSION (SERVER COMPONENTS)
========================= */
export async function getSession(): Promise<JwtUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value

  if (!token) return null

  return verifyToken(token)
}

/* =========================
   API REQUEST CONTEXT
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
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}