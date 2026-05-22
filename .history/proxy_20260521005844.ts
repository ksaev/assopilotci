import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!token) return NextResponse.next()

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any

    // 🔴 OWNER AREA (STRICT)
    if (pathname.startsWith("/owner")) {
      if (user.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // 🔵 ADMIN AREA
    if (pathname.startsWith("/admin")) {
      if (user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // 🟢 MEMBER AREA
    if (pathname.startsWith("/membre")) {
      if (user.role !== "MEMBER"){
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/admin/:path*", "/owner/:path*", "/membre/:path*"],
}