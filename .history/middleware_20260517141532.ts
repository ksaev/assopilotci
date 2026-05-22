import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl

  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/membre")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any

    // 🔐 protection admin
    if (
      url.pathname.startsWith("/admin") &&
      !["ADMIN", "SUPER_ADMIN"].includes(user.role)
    ) {
      return NextResponse.redirect(new URL("/membre/dashboard", req.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*", "/membre/:path*"],
}