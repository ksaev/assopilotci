import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "2h",
  });
}

export async function verifyToken(
  token?: string | null
) {
  try {
    if (!token) return null;

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    if (!decoded || typeof decoded !== "object") {
      return null;
    }

    return decoded as TokenPayload;
  } catch {
    return null;
  }
}