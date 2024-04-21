'use client'

import authApiRequest from '@/apiRequests/auth'
import { clientSessionUser } from '@/lib/http'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken')
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    if (accessToken === clientSessionUser.accessToken) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then((res) => {
          router.push(`/login`)
        })
    }
    return () => {
      controller.abort()
    }
  }, [accessToken, router, pathname])
  return <div>page</div>
}
