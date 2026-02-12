import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Protect all /admin routes except /admin/login
        if (req.nextUrl.pathname.startsWith("/admin/login")) {
          return true;
        }
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token !== null;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
