import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  const isAuthRoute = pathname.startsWith("/login")
  const isProtectedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/membre")

  // 🔐 pas connecté → accès refusé aux zones protégées
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // 🧠 si connecté → vérifier token uniquement pour zones protégées
  if (token && isProtectedRoute) {
    try {
      verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/membre/:path*"],
}