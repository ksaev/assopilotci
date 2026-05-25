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

  const isLogin = pathname.startsWith("/login")
  const isRegister = pathname.startsWith("/register")

  // =========================
  // PUBLIC ROUTES SAFE
  // =========================
  if (isLogin || isRegister) {
    return NextResponse.next()
  }

  // =========================
  // AUTH CHECK
  // =========================
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
  // MEMBER
  // =========================
  if (pathname.startsWith("/membre")) {
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