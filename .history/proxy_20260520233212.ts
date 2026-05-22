import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  const token =
    req.cookies.get("access_token")?.value

  const { pathname } = req.nextUrl

  const protectedRoutes = [
    "/admin",
    "/owner",
    "/membre",
  ]

  const isProtected = protectedRoutes.some((r) =>
    pathname.startsWith(r)
  )

  if (!token && isProtected) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  if (!token) return NextResponse.next()

  try {
    const user = verify(
      token,
      process.env.JWT_SECRET!
    ) as any

    // 🔴 OWNER ONLY
    if (
      pathname.startsWith("/owner") &&
      user.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    // 🔵 ADMIN ONLY
    if (
      pathname.startsWith("/admin") &&
      user.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
  ],
}