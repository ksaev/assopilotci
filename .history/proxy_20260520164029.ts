import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl

  console.log("PROXY RUNNING =>", pathname)

  // =========================
  // ROUTES PUBLIQUES
  // =========================

  const publicRoutes = [
    "/login",
    "/create-organization",
  ]

  const isPublic = publicRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // =========================
  // PAS DE TOKEN
  // =========================

  if (!token) {
    if (!isPublic) {
      console.log("NO TOKEN => REDIRECT")

      return NextResponse.redirect(
        new URL("/login", req.url)
      )
    }

    return NextResponse.next()
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      sub: string
      role: string
    }

    console.log("USER ROLE =>", decoded.role)

    // =========================
    // OWNER
    // =========================

    if (
      pathname.startsWith("/owner") &&
      decoded.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", req.url)
      )
    }

    // =========================
    // ADMIN
    // =========================

    if (
      pathname.startsWith("/admin") &&
      !["ADMIN", "SUPER_ADMIN"].includes(decoded.role)
    ) {
      return NextResponse.redirect(
        new URL("/membre/dashboard", req.url)
      )
    }

    return NextResponse.next()
  } catch (error) {
    console.error("JWT ERROR =>", error)

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