import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const JWT_SECRET = process.env.JWT_SECRET || "super-secret"

export type JwtUser = {
  userId: string
  role: string
  organizationId?: string
}

export function signToken(payload: JwtUser) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JwtUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUser
  } catch {
    return null
  }
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}