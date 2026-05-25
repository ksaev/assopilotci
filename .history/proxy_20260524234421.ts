import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const activeOrgId = req.cookies.get("active_org")?.value
  const { pathname } = req.nextUrl

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  // 🚫 pas connecté
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!token) return NextResponse.next()

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any

    // =========================
    // 🔴 OWNER AREA
    // =========================
    if (pathname.startsWith("/owner")) {
      if (user.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // 🔵 ADMIN AREA
    // =========================
    if (pathname.startsWith("/admin")) {
      if (user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // 🟢 MEMBER AREA + MULTI ORGANIZATION
    // =========================
    if (pathname.startsWith("/membre")) {
      if (user.role !== "MEMBER") {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // 🚨 PAS D'ORGANISATION ACTIVE
      const isSelectingOrg = pathname.startsWith("/membre/select-organization")

      if (!activeOrgId && !isSelectingOrg) {
        return NextResponse.redirect(
          new URL("/membre/select-organization", req.url)
        )
      }

      // 🔒 empêcher retour dashboard sans org
      if (
        pathname.startsWith("/membre/dashboard") &&
        !activeOrgId
      ) {
        return NextResponse.redirect(
          new URL("select-organization", req.url)
        )
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