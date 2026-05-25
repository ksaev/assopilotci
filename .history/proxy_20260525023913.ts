import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  id: string
}

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const activeOrgId = req.cookies.get("active_org")?.value
  const { pathname } = req.nextUrl

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  const isSelectOrg = pathname.startsWith("/select-organization")

  // =========================
  // NON AUTH
  // =========================
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!token) return NextResponse.next()

  try {
    const user = verify(token, process.env.JWT_SECRET!) as JwtPayload

    // =========================
    // OWNER (GLOBAL ROLE OK)
    // =========================
    if (pathname.startsWith("/owner")) {
      const globalRole = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      })

      if (globalRole?.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // ADMIN (OPTION GLOBAL OU ORG-BASED)
    // =========================
    if (pathname.startsWith("/admin")) {
      const globalRole = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      })

      if (globalRole?.role !== "ADMIN" && globalRole?.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // MEMBER AREA (MULTI-ORG CLEAN)
    // =========================
    if (pathname.startsWith("/membre")) {
      const isSelecting = isSelectOrg

      if (isSelecting) return NextResponse.next()

      if (!activeOrgId) {
        return NextResponse.redirect(
          new URL("/select-organization", req.url)
        )
      }

      // 🔥 CHECK REAL MEMBERSHIP (SOURCE OF TRUTH)
      const membership = await prisma.organizationMember.findFirst({
        where: {
          userId: user.id,
          organizationId: activeOrgId,
        },
        select: {
          role: true,
        },
      })

      if (!membership) {
        return NextResponse.redirect(
          new URL("/select-organization", req.url)
        )
      }

      // 👉 inject org context
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-org-id", activeOrgId)
      requestHeaders.set("x-user-id", user.id)
      requestHeaders.set("x-org-role", membership.role)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
    "/select-organization",
  ],
}