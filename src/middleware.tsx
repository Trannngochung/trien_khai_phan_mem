import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  let isAuthen = false;
  const role = request.cookies.get("role")?.value;
  const username = request.cookies.get("username")?.value;
  if (role && username) {
    isAuthen = true;
  }
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;
  // If not authenticated and trying to access protected routes
  if (
    !isAuthen &&
    (path.startsWith("/user") ||
      path.startsWith("/admin") ||
      path.startsWith("/doctor") ||
      path.startsWith("/staff"))
  ) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
