import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thông báo | Mua ngay | ShopDev',
  description: 'Thông báo | Mua ngay | ShopDev',
}

const Page = () => {
  return (
    <div className="bg-background shadow-login rounded-md">
      <div className="flex items-center justify-between py-4 px-6 border-b">
        <h1 className="font-semibold text-lg text-gray-700">
          Tất cả thông báo
        </h1>
        <Button
          variant={'primary'}
          className="text-xs md:text-[13px]"
        >
          Đánh dấu tất cả là đã đọc
        </Button>
      </div>
      <div className="min-h-[550px] flex flex-col">
        <div className="flex items-start gap-4 px-8 py-4 hover:bg-gray-200 border-y">
          <Image
            alt="thumb noti"
            src={'/login.png'}
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-y-1 w-full">
            <h3 className="line-clamp-1 font-medium">he hasd idasj asdpasd</h3>
            <span className="line-clamp-2 text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus non consectetur accusantium natus libero sed,
              repellat placeat, possimus dolore fuga saepe consequatur atque
              alias? Soluta corrupti iste ullam earum alias.
            </span>
            <Image
              alt="thumb noti"
              src={'/login.png'}
              width={200}
              height={120}
            />
            <span className="text-sm text-gray-500">
              {format(new Date(), 'hh:mm dd-MM-yyyy')}
            </span>
          </div>
          <Button variant={'outline'}>Xem chi tiết</Button>
        </div>
      </div>
    </div>
  )
}

export default Page
