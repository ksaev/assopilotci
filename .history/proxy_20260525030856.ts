import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  userId: string
  role: string
}

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value
  const activeOrgId = req.cookies.get("active_org")?.value
  const { pathname } = req.nextUrl

  // PUBLIC ROUTES
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

  if (!token) return NextResponse.next()

  let user: JwtPayload

  try {
    user = verify(token, process.env.JWT_SECRET!) as JwtPayload
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!user?.userId) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // ================= ADMIN GLOBAL
  if (pathname.startsWith("/owner")) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { role: true },
    })

    if (dbUser?.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // ================= ADMIN / GLOBAL ADMIN
  if (pathname.startsWith("/admin")) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { role: true },
    })

    if (!dbUser || !["ADMIN", "SUPER_ADMIN"].includes(dbUser.role)) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // ================= MEMBER MULTI ORG
  if (pathname.startsWith("/membre")) {
    if (pathname.startsWith("/select-organization")) {
      return NextResponse.next()
    }

    if (!activeOrgId) {
      return NextResponse.redirect(
        new URL("/select-organization", req.url)
      )
    }

    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: user.userId,
        organizationId: activeOrgId,
      },
    })

    if (!membership) {
      return NextResponse.redirect(
        new URL("/select-organization", req.url)
      )
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}