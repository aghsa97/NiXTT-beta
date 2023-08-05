import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up", "/"],
  afterAuth(auth, req) {
    const isPublicRoute = auth.isPublicRoute;
    const userId = auth.userId;

    if (isPublicRoute) {
      if (userId) {
        return NextResponse.redirect(new URL("/home", req.url));
      }
      return null;
    }
    if (!userId && !isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
