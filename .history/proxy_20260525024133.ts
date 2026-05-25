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

  // =========================
  // PUBLIC ROUTES (CRUCIAL FIX)
  // =========================
  const isPublic =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")

  if (isPublic) {
    return NextResponse.next()
  }

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/membre")

  // =========================
  // NON AUTH
  // =========================
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!token) return NextResponse.next()

  let user: JwtPayload

  try {
    user = verify(token, process.env.JWT_SECRET!) as JwtPayload
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!user?.id) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // =========================
  // OWNER
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
  // ADMIN
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
  // MEMBER / MULTI ORG
  // =========================
  if (pathname.startsWith("/membre")) {

    // autoriser page sélection
    if (pathname.startsWith("/select-organization")) {
      return NextResponse.next()
    }

    // pas d’org active
    if (!activeOrgId) {
      return NextResponse.redirect(
        new URL("/select-organization", req.url)
      )
    }

    // vérification DB
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

    // inject context
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
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
    "/select-organization",
  ],
}