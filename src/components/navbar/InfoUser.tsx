'use client'

import Link from 'next/link'
import React from 'react'
import Users from './Users'
import { useAppContext } from '@/app/app-provider'

const InfoUser = () => {
  const { user } = useAppContext()
  return (
    <div className="flex items-center h-full">
      {!user ? (
        <>
          <Link
            href={'/login'}
            className="rounded-md text-sm px-2 py-2 hover:text-white/70 text-white"
          >
            Đăng Nhập
          </Link>
          <Link
            href={'/register'}
            className="rounded-md text-sm px-2 py-2 hover:text-white/70 text-white"
          >
            Đăng Ký
          </Link>
        </>
      ) : (
        <Users user={user} />
      )}
    </div>
  )
}

export default InfoUser
