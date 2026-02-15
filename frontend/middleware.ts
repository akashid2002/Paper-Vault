import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminKey = request.cookies.get("admin_key")?.value;
  const { pathname } = request.nextUrl;

  const isAdminDashboardRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  const isLoginPage = pathname === "/admin-login";

  // If not logged in and trying to access admin dashboard
  if (!adminKey && isAdminDashboardRoute) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  // If already logged in and trying to access login page
  if (adminKey && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/admin-login"],
};
