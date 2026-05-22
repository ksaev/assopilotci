import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl

  // pas de token → redirection
  if (!token) {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/membre") || url.pathname.startsWith("/owner")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any

    // protection admin
    if (
      url.pathname.startsWith("/admin") &&
      !["ADMIN"].includes(user.role)
    )     
    if (
      url.pathname.startsWith("/owner") &&
      !["SUPER_ADMIN"].includes(user.role)
    ) {
      return NextResponse.redirect(new URL("/membre/dashboard", req.url))
    }

 

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}