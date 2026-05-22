import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  /* =========================
     ROUTES PROTEGEES
  ========================= */

  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/membre") ||
    pathname.startsWith("/owner")

  /* =========================
     PAS DE TOKEN
  ========================= */

  if (!token && isProtected) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  try {
    if (token) {
      const user = verify(
        token,
        process.env.JWT_SECRET!
      ) as {
        id: string
        role: string
      }

      /* =========================
         ADMIN ACCESS
      ========================= */

      if (
        pathname.startsWith("/admin") &&
        !["ADMIN", "SUPER_ADMIN"].includes(
          user.role
        )
      ) {
        return NextResponse.redirect(
          new URL("/membre/dashboard", req.url)
        )
      }

      /* =========================
         OWNER ACCESS
      ========================= */

      if (
        pathname.startsWith("/owner") &&
        user.role !== "SUPER_ADMIN"
      ) {
        return NextResponse.redirect(
          new URL("/membre/dashboard", req.url)
        )
      }

      /* =========================
         MEMBRE ACCESS
      ========================= */

      if (
        pathname.startsWith("/membre") &&
        ![
          "MEMBER",
          "ADMIN",
          "SUPER_ADMIN",
        ].includes(user.role)
      ) {
        return NextResponse.redirect(
          new URL("/login", req.url)
        )
      }
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
   MATCHER
========================= */

export const config = {
  matcher: [
    "/admin/:path*",
    "/membre/:path*",
    "/owner/:path*",
  ],
}