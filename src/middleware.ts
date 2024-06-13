import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  logoutMiddleware,
  newToken,
  refreshToken,
} from "./utils/actions/account";

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const { pathname } = request.nextUrl;
  const urlAuth = ["/login", "/register", "/verify"];
  const isAuthRoute = urlAuth.some((url) => pathname.startsWith(url));
  const urlIsLogin = [
    "/checkout",
    "/user",
    "/product",
    "/messages",
    "/cart",
    "/wishlist",
  ];
  const isPrivateRoute = urlIsLogin.some((url) => pathname.startsWith(url));
  const isLoggin = cookies.get("refreshToken");
  const accessToken = cookies.get("accessToken");

  if (isLoggin) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!accessToken) {
      try {
        const tokens = await refreshToken(isLoggin.value);
        return await newToken(tokens);
      } catch (error) {
        return await logoutMiddleware(request);
      }
    }
  }
  if (!isLoggin) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware
