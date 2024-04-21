'use client'

import Link from 'next/link'
import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Bell } from 'lucide-react'
import { useAppContext } from '@/app/app-provider'

const Notification = () => {
  const { user } = useAppContext()
  return (
    <button className="text-white">
      <HoverCard>
        <HoverCardTrigger
          href={user ? '/user/account/notifications' : undefined}
        >
          <div className="hover:text-white/70 text-white flex items-center gap-1">
            <Bell size={18} />
            Thông báo
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className={'w-96 min-h-60 max-h-80 flex flex-col justify-between'}
        >
          {user ? (
            <>
              <div className="h-60 w-full flex justify-center items-center">
                <span className="text-sm">Bạn không có thông báo</span>
              </div>
            </>
          ) : (
            <>
              <div className="h-60 w-full flex justify-center items-center">
                <span className="text-sm">Đăng nhập để xem thông báo</span>
              </div>
              <div className="w-full flex items-center justify-between">
                <Link
                  href={'/login'}
                  className="rounded-md text-sm px-2 py-2 w-full bg-gray-100 hover:bg-gray-200 hover:text-red-500"
                >
                  Đăng Nhập
                </Link>
                <Link
                  href={'/register'}
                  className="rounded-md text-sm px-2 py-2 w-full bg-gray-100 hover:bg-gray-200 hover:text-red-500"
                >
                  Đăng Ký
                </Link>
              </div>
            </>
          )}
        </HoverCardContent>
      </HoverCard>
    </button>
  )
}

export default Notification
