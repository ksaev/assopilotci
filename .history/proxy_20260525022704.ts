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

    if (!user?.id) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // =========================
    // OWNER (GLOBAL ROLE DB)
    // =========================
    if (pathname.startsWith("/owner")) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      })

      if (dbUser?.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // ADMIN (GLOBAL ROLE DB)
    // =========================
    if (pathname.startsWith("/admin")) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      })

      if (!dbUser || (dbUser.role !== "ADMIN" && dbUser.role !== "SUPER_ADMIN")) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // =========================
    // MEMBER AREA (MULTI ORG)
    // =========================
    if (pathname.startsWith("/membre")) {
      if (isSelectOrg) {
        return NextResponse.next()
      }

      if (!activeOrgId) {
        return NextResponse.redirect(
          new URL("/select-organization", req.url)
        )
      }

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

      // inject context org
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-user-id", user.id)
      requestHeaders.set("x-org-id", activeOrgId)
      requestHeaders.set("x-org-role", membership.role)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

/**
 * MATCHER
 */
export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
    "/select-organization",
  ],
}