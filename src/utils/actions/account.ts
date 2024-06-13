"use server";

import http from "@/lib/http";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function login(tokens: any) {
  const expires = 24 * 60 * 60;
  const cookieStore = cookies();
  cookieStore.set("accessToken", tokens.accessToken, {
    maxAge: expires,
    httpOnly: true,
    path: "/",
  });
  cookieStore.set("refreshToken", tokens.refreshToken, {
    maxAge: expires * 30,
    httpOnly: true,
    path: "/",
  });
  cookieStore.set("userId", tokens.userId, {
    maxAge: expires * 30,
    httpOnly: true,
    path: "/",
  });
  return tokens;
}

export async function getMe() {
  return await http.get("users/me", { token: true, cache: "no-store" });
}

export async function logoutMiddleware(request: NextRequest) {
  let response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("userId");
  return response;
}

export async function logout() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  cookies().delete("userId");
}

export async function getSession() {
  const session = cookies().get("accessToken")?.value;
  if (!session) return null;
  return session;
}

export async function getRefreshToken() {
  const session = cookies().get("refreshToken")?.value;
  if (!session) return null;
  return session;
}

export async function getUserId() {
  const session = cookies().get("userId")?.value;
  if (!session) return undefined;
  return session;
}

export async function decrypt(session: string) {
  return await JSON.parse(session);
}

export async function encrypt(session: string) {
  return await JSON.stringify(session);
}

export async function refreshToken(refreshToken: string | null) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/shop/refresh-token`,
    {
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return response.json();
}

export async function newToken(newToken: any) {
  const accessTokenExpires = 24 * 60 * 60;
  let response = NextResponse.next();
  response.cookies.set("accessToken", newToken.tokens.accessToken, {
    maxAge: accessTokenExpires,
    httpOnly: true,
    path: "/",
  });
  response.cookies.set("refreshToken", newToken.tokens.refreshToken, {
    maxAge: accessTokenExpires * 30,
    httpOnly: true,
    path: "/",
  });
  response.cookies.set("userId", newToken.user.id, {
    maxAge: accessTokenExpires,
    httpOnly: true,
    path: "/",
  });
  return response;
}
