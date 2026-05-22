import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl

  /* =========================
     NO TOKEN
  ========================= */

  if (!token) {
    if (
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/membre") ||
      url.pathname.startsWith("/owner")
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    return NextResponse.next()
  }

  try {
    const user = verify(
      token,
      process.env.JWT_SECRET!
    ) as any

    /* =========================
       ADMIN ACCESS
    ========================= */

    if (
      url.pathname.startsWith("/admin") &&
      user.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    /* =========================
       OWNER ACCESS
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
      ![
        "MEMBRE",
        "ADMIN",
        "SUPER_ADMIN",
      ].includes(user.role)
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    return NextResponse.next()

  } catch (error) {
    console.error(error)

    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }
}

/* =========================
   MATCHER
========================= */

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/membre/:path*",
  ],
}