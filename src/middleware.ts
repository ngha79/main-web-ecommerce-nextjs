import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const urlAuth = ['/login', '/register']
  const urlIsLogin = ['/checkout', '/user', '/product', '/cart', '/wishlist']
  const isPrivateRoute = urlIsLogin.some((url) => pathname.startsWith(url))
  const isAuthRoute = urlAuth.some((url) => pathname.startsWith(url))
  const isLoggin = request.cookies.get('refreshToken')?.value
  if (isAuthRoute) {
    if (isLoggin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  if (!isLoggin && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

// FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware
