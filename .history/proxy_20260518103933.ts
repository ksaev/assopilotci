import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value
    const url = req.nextUrl

    /* =========================
       NO TOKEN
    ========================= */

    if (!token) {
      if (
        url.pathname.startsWith("/admin") ||
        url.pathname.startsWith("/owner") ||
        url.pathname.startsWith("/membre")
      ) {
        return NextResponse.redirect(
          new URL("/login", req.url)
        )
      }

      return NextResponse.next()
    }

    /* =========================
       VERIFY TOKEN
    ========================= */

    const user = verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string
      role: string
    }

    /* =========================
       ADMIN PROTECTION
    ========================= */

    if (
      url.pathname.startsWith("/admin") &&
      user.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/membre/dashboard", req.url)
      )
    }

    /* =========================
       OWNER PROTECTION
    ========================= */

    if (
      url.pathname.startsWith("/owner") &&
      user.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/membre/dashboard", req.url)
      )
    }

    /* =========================
       MEMBER ACCESS
    ========================= */

    if (
      url.pathname.startsWith("/membre") &&
      !["MEMBER", "ADMIN", "SUPER_ADMIN"].includes(
        user.role
      )
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    return NextResponse.next()
  } catch (error) {
    console.error("PROXY ERROR:", error)

    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }
}

/* =========================
   ROUTES MATCHER
========================= */

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
  ],
}