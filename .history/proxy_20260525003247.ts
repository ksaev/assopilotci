import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  id: string
  role: string
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const activeOrgId = req.cookies.get("active_org")?.value
  const { pathname } = req.nextUrl

  const isLoginPage = pathname.startsWith("/login")
  const isSelectOrg = pathname.startsWith("/select-organization")

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  // =========================
  // 🚫 NON AUTHENTIFIÉ
  // =========================
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!token) return NextResponse.next()

  try {
    const user = verify(token, process.env.JWT_SECRET!) as JwtPayload

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
    // 🟢 MEMBER AREA (MULTI ORG CORE)
    // =========================
    if (pathname.startsWith("/membre")) {
      if (user.role !== "MEMBER") {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // 👉 toujours autoriser page sélection
      if (isSelectOrg) {
        return NextResponse.next()
      }

      // 🚨 pas d'organisation active
      if (!activeOrgId) {
        return NextResponse.redirect(
          new URL("/select-organization", req.url)
        )
      }

      // 🔒 VALIDATION SÉCURISÉE EN DB (IMPORTANT)
      const membership = await prisma.organizationMember.findFirst({
        where: {
          userId: user.id,
          organizationId: activeOrgId,
        },
      })

      if (!membership) {
        return NextResponse.redirect(
          new URL("/select-organization", req.url)
        )
      }

      // 👉 inject context org dans headers (option pro)
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-org-id", activeOrgId)
      requestHeaders.set("x-user-id", user.id)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

/**
 * =========================
 * MATCHER CLEAN
 * =========================
 */
export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
    "/select-organization",
  ],
}