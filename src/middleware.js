import { NextResponse } from "next/server";

export async function middleware(request) {
  // Public paths that don't require authentication
  const publicPaths = ["/login", "/auth/callback", "/auth/failure"];

  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If it's a public path or dashboard (during auth), allow access
  if (
    isPublicPath ||
    request.nextUrl.pathname === "/dashboard" ||
    request.nextUrl.pathname === "/payouts" ||
    request.nextUrl.pathname === "/news"
  ) {
    return NextResponse.next();
  }

  // Check for Appwrite session cookie
  const sessionCookie = request.cookies.get("a_session_");

  if (!sessionCookie) {
    // Redirect to login if no session exists
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
