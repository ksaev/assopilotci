import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

type JwtPayload = {
  userId: string
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const activeOrgId = req.cookies.get("active_org")?.value
  const { pathname } = req.nextUrl

  const publicRoutes = ["/login", "/register", "/_next", "/favicon.ico"]

  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.next()
  }

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  let user: JwtPayload

  try {
    user = verify(token!, process.env.JWT_SECRET!) as JwtPayload
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!user?.userId) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  /* =========================
     OWNER
  ========================= */
  if (pathname.startsWith("/owner")) {
    return NextResponse.next()
  }

  /* =========================
     ADMIN (FIX IMPORTANT)
  ========================= */
  if (pathname.startsWith("/admin")) {
    // ❌ PLUS DE PRISMA ICI

    // simple check org context
    if (!activeOrgId) {
      return NextResponse.redirect(
        new URL("/select-organization", req.url)
      )
    }

    return NextResponse.next()
  }

  /* =========================
     MEMBER
  ========================= */
  if (pathname.startsWith("/membre")) {
    if (pathname.startsWith("/select-organization")) {
      return NextResponse.next()
    }

    if (!activeOrgId) {
      return NextResponse.redirect(
        new URL("/select-organization", req.url)
      )
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}