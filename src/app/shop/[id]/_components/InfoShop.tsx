import { Button } from '@/components/ui/button'
import { Shop } from '@/lib/interface'
import Image from 'next/image'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

const InfoShop = ({ shop }: { shop: Shop }) => {
  return (
    <div className="bg-white rounded-lg shadow-login p-4 flex items-center gap-8 w-full flex-col md:flex-row">
      <div className="relative flex md:mr-8 w-full md:max-w-80">
        <div className="z-[1] flex flex-col p-4 text-background items-start justify-center gap-4 w-full">
          <div className="flex gap-4">
            <Image
              alt="avatar-shop"
              src={shop.shop_avatar}
              width={80}
              height={80}
              className="rounded-full border border-private w-20 h-20"
            />
            <div className="flex flex-col">
              <h3>{shop.shop_userName}</h3>
              <span className="text-xs">Online 3 Giờ Trước</span>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between w-full">
            <Button
              className="border-background w-full text-background hover:text-background/90 bg-transparent hover:bg-private/5"
              variant={'outline'}
            >
              Chat Ngay
            </Button>
            <Button
              className="border-background w-full text-background hover:text-background/90 bg-transparent hover:bg-private/5"
              variant={'outline'}
            >
              Theo dõi
            </Button>
          </div>
        </div>
        <div className="absolute top-0 left-0 size-full z-0 opacity-90">
          {shop.shop_background ? (
            <Image
              alt="background shop"
              src={shop.shop_background}
              width={200}
              height={200}
              className="size-full rounded-sm"
            />
          ) : (
            <div className="bg-gray-800/80 size-full rounded-md" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 flex-1 gap-x-12 gap-y-4">
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Đánh Giá</label>
          <span className="text-private line-clamp-1">
            {shop.totalCommentCount}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Tham Gia</label>
          <span className="text-private line-clamp-1">
            {formatDistanceToNow(new Date(shop.shop_createdAt), {
              addSuffix: true,
              locale: vi,
            })}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Sản Phẩm</label>
          <span className="text-private line-clamp-1">
            {+shop.productCount}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Người Theo Dõi</label>
          <span className="text-private line-clamp-1">
            {+shop.followersCount}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Yêu thích sản phẩm</label>
          <span className="text-private line-clamp-1">
            {+shop.totalLikeCount}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InfoShop
