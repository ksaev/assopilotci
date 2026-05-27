import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

type JwtPayload = {
  userId: string
}

export async function proxy(req: NextRequest) {
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

  // ================= OWNER (SUPER ADMIN GLOBAL)
  if (pathname.startsWith("/owner")) {
    // si tu veux garder owner → il faut un champ ailleurs (ou membership spécial)
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: user.userId,
      },
    })

    if (!membership || membership.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // ================= ADMIN / ADMIN ORG
  if (pathname.startsWith("/admin")) {
    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: user.userId,
        organizationId: activeOrgId ?? undefined,
      },
    })

    if (!membership) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (!["ADMIN"].includes(membership.role)) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // ================= MEMBER MULTI ORG
  if (pathname.startsWith("/membre")) {
    if (pathname.startsWith("/select-organization")) {
      return NextResponse.next()
    }

    if (!activeOrgId) {
      return NextResponse.redirect(new URL("/select-organization", req.url))
    }

    const membership = await prisma.organizationMember.findFirst({
      where: {
        userId: user.userId,
        organizationId: activeOrgId,
      },
    })

    if (!membership) {
      return NextResponse.redirect(new URL("/select-organization", req.url))
    }

    // 🔒 autorise UNIQUEMENT MEMBER
  if (membership.role !== "MEMBER") {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }
    

    return NextResponse.next()
  }

  return NextResponse.next()
}