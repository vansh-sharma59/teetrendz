import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    // If the user is authenticated, the `token` will be available
    const token = req.nextauth.token;

    if (!token) {
      // If no token is present, the user is not authenticated
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login"; // Redirect to the sign-in page
      return NextResponse.redirect(url);
    }

    // Log the token if authenticated (for debugging purposes)
    console.log(token);

    // Continue to the requested page
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.email !== null,
    },
  }
);

export const config = {
  matcher: ["/configure/:path*", "/dashboard", "/thank-you/:path*"],
};
