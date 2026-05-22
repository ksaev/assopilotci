import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // toujours laisser login accessible
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // si pas de token → redirect
  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/membre")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const user = verify(token, process.env.JWT_SECRET!) as any;

    // protection admin
    if (
      pathname.startsWith("/admin") &&
      !["ADMIN", "SUPER_ADMIN"].includes(user.role)
    ) {
      return NextResponse.redirect(new URL("/membre/dashboard", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/membre/:path*"],
};