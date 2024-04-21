import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    accessToken: string
    refreshToken: string
    userId: string
    email: string
    id: string
    avatar: string
    background: string
    phoneNumber: string
  }

  interface Account {
    accessToken: string
    refreshToken: string
    userId: string
    email: string
    id: string
    avatar: string
    background: string
    phoneNumber: string
  }

  interface Profile {
    accessToken: string
    refreshToken: string
    userId: string
    email: string
    id: string
    avatar: string
    background: string
    phoneNumber: string
  }

  interface JWT {
    token: {
      userName?: string
      avatar?: string
      background?: string
      phoneNumber?: string
      accessTokenExpires?: number
      error?: string
      refreshToken?: string
      accessToken?: string
      email?: string
      picture?: string
      userId?: string
      sub?: string
      iat?: number
      exp?: number
      jti?: string
    }
    user: User
  }

  interface Session {
    user: {
      userName?: string
      avatar?: string
      background?: string
      phoneNumber?: string
      accessTokenExpires?: number
      error?: string
      refreshToken?: string
      accessToken?: string
      email?: string
      picture?: string
      userId?: string
    }
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    userName?: string
    avatar?: string
    background?: string
    phoneNumber?: string
    accessTokenExpires: number
    error?: string
    refreshToken?: string
    accessToken?: string
    email?: string
    picture?: string
    userId?: string
    sub?: string
    iat?: number
    exp?: number
    jti?: string
  }
}
