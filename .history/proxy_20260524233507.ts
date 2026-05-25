import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const { pathname } = req.nextUrl

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  // 🔴 PAS CONNECTÉ → BLOQUAGE ZONES PROTÉGÉES
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // 🟡 PUBLIC ACCESS
  if (!token) return NextResponse.next()

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any

    const activeOrgId = req.cookies.get("activeOrganizationId")?.value

    // =========================
    // 🔵 OWNER AREA (SUPER ADMIN)
    // =========================
    if (pathname.startsWith("/owner")) {
      if (user.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // 🔴 ADMIN AREA
    // =========================
    if (pathname.startsWith("/admin")) {
      if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // 🟢 MEMBER AREA
    // =========================
    if (pathname.startsWith("/membre")) {
      if (user.role !== "MEMBER") {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // 🔥 CAS CRITIQUE : aucune organisation sélectionnée
      if (!activeOrgId && pathname !== "/select-organization") {
        return NextResponse.redirect(new URL("/select-organization", req.url))
      }

      // 🔥 optionnel : bloquer accès dashboard si org pas active
      if (
        pathname.startsWith("/membre/dashboard") &&
        !activeOrgId
      ) {
        return NextResponse.redirect(new URL("/select-organization", req.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    // 🔴 TOKEN INVALID → CLEAN REDIRECT
    const response = NextResponse.redirect(new URL("/login", req.url))
    response.cookies.delete("access_token")
    response.cookies.delete("activeOrganizationId")
    return response
  }
}

// =========================
// MATCHER OPTIMISÉ
// =========================
export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
  ],
}