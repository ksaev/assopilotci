import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const { pathname } = req.nextUrl

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  // ❌ pas connecté
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!token) return NextResponse.next()

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any

    // 🔴 OWNER
    if (pathname.startsWith("/owner") && user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // 🔵 ADMIN
    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // 🟢 MEMBER
    if (pathname.startsWith("/membre") && user.role !== "MEMBER") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*", "/owner/:path*", "/membre/:path*"],
}