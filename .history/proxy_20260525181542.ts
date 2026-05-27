import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

type JwtPayload = {
  userId: string
}

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const activeOrgId = req.cookies.get("active_org")?.value
  const { pathname } = req.nextUrl

  /* =========================
     PUBLIC ROUTES
  ========================= */
  const publicRoutes = ["/login", "/register", "/_next", "/favicon.ico"]

  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.next()
  }

  /* =========================
     PROTECTED ROUTES
  ========================= */
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
     OWNER AREA
  ========================= */
  if (pathname.startsWith("/owner")) {
    // OWNER doit être géré côté DB/API, pas middleware
    // ici on bloque juste l’accès structurel
    return NextResponse.next()
  }

  /* =========================
     ADMIN AREA (ORG BASED)
  ========================= */
  if (pathname.startsWith("/admin")) {
    if (!activeOrgId) {
      return NextResponse.redirect(
        new URL("/select-organization", req.url)
      )
    }

    // ❗ IMPORTANT:
    // On ne peut PAS utiliser Prisma ici (Edge runtime)
    // Donc on sécurise via logique token + org presence
    // RBAC réel fait côté server/API

    return NextResponse.next()
  }

  /* =========================
     MEMBER AREA (ORG REQUIRED)
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

/* =========================
   MATCHER
========================= */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}