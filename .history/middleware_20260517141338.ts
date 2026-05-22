import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl

  const isAuthPage = url.pathname === "/login"

  // 🔐 si pas de token
  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/membre")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any

    // 🚀 empêcher accès login si déjà connecté
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/membre/dashboard", req.url))
    }

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
  matcher: ["/((?!_next|api|favicon.ico).*)"],
}