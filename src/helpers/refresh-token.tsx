'use client'

import authApiRequest from '@/apiRequests/auth'
import { clientSessionUser } from '@/lib/http'
import { useEffect } from 'react'
import jsonwebtoken from 'jsonwebtoken'
import { differenceInMinutes } from 'date-fns'

export default function RefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      if (clientSessionUser.refreshToken) {
        const verifyToken: any = jsonwebtoken.decode(
          clientSessionUser.accessToken
        )
        if (verifyToken?.exp) {
          const now = new Date()
          const expiresAt = new Date(verifyToken.exp * 1000)
          if (differenceInMinutes(expiresAt, now) < 30) {
            const res: any = await authApiRequest.refreshTokenFromServer()
            if (res.payload.tokens) {
              clientSessionUser.accessToken = res.payload.tokens.accessToken
              clientSessionUser.refreshToken = res.payload.tokens.refreshToken
            }
          }
        } else {
          const res: any = await authApiRequest.refreshTokenFromServer()
          if (res.payload.tokens) {
            clientSessionUser.accessToken = res.payload.tokens.accessToken
            clientSessionUser.refreshToken = res.payload.tokens.refreshToken
          }
        }
      }
    }, 1000 * 10)

    return () => clearInterval(interval)
  }, [])
  return null
}
