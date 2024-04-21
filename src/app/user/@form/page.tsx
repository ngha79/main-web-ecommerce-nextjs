'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Pen } from 'lucide-react'
import Link from 'next/link'
import { Account } from './Account'
import { useAppContext } from '@/app/app-provider'

const Page = () => {
  const { user } = useAppContext()
  return (
    <div className="bg-background hidden rounded-md md:sticky top-40 shadow-login h-[600px] lg:flex flex-col gap-4 md:min-w-72">
      <div className="flex items-center gap-2 p-4">
        <Avatar className="w-max h-max">
          <AvatarImage
            src={user?.avatar || '/login.png'}
            alt="@shadcn"
            className="w-12 h-12 border rounded-full"
          />
          <AvatarFallback>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white">
              {user?.userName?.[0] ?? 'USER'}
            </div>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-sm font-semibold line-clamp-1 w-24 break-words">
            {user?.userName}
          </h3>
          <Link
            href={'/user/account/profile'}
            className="text-xs text-gray-500 flex items-center gap-1"
          >
            <Pen size={12} /> Sửa hồ sơ
          </Link>
        </div>
      </div>
      <Account />
    </div>
  )
}

export default Page
