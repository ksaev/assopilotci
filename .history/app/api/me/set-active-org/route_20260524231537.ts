import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export async function POST(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const user = verify(token, process.env.JWT_SECRET!) as any
  const { organizationId } = await req.json()

  const response = NextResponse.json({ success: true })

  // 🔥 cookie organisation active
  response.cookies.set("activeOrganizationId", organizationId, {
    httpOnly: true,
    path: "/",
  })

  return response
}