import {
  MessageCircle,
  ShoppingCart,
  Star,
  ThumbsUp,
  UserPlus,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

const Shop = ({ shop }: { shop: any }) => {
  return (
    <Link
      href={`/shop/${shop?.shop_id}`}
      className="flex flex-col items-center w-72 justify-center gap-y-2 flex-1 col-span-1"
    >
      <Image
        alt="avatar"
        src={shop?.shop_avatar || './login.png'}
        width={64}
        height={64}
        className="border rounded-full w-16 h-16"
      />
      <span className="line-clamp-2 text-center">{shop?.shop_userName}</span>
      <div className="grid grid-cols-2 gap-2 w-full max-w-md:text-sm md:hidden text-gray-700">
        <span className="flex items-center gap-1 justify-center">
          {shop?.totalCommentCount}
          <MessageCircle className="w-4 h-4 hidden md:block" />
          <span className="md:hidden text-gray-700 line-clamp-1">Đánh giá</span>
        </span>
        <span className="flex items-center gap-1 justify-center">
          {shop?.followersCount}
          <UserPlus className="w-4 h-4 hidden md:block" />
          <span className="md:hidden text-gray-700 line-clamp-1">
            Người theo dõi
          </span>
        </span>
        <span className="flex items-center gap-1 justify-center">
          {shop?.totalLikeCount}
          <ThumbsUp className="w-4 h-4 hidden md:block" />
          <span className="md:hidden text-gray-700 line-clamp-1">
            Lượt thích
          </span>
        </span>
        <span className="flex items-center gap-1 justify-center">
          {shop?.productCount}
          <ShoppingCart className="w-4 h-4 hidden md:block" />
          <span className="md:hidden text-gray-700 line-clamp-1">Sản phẩm</span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 max-w-md:text-sm max-w-md:hidden text-gray-700">
        <span className="flex items-center gap-1 justify-center">
          {shop?.totalCommentCount}
          <Star
            className="w-5 h-5"
            fill="#f53d2d"
            color="#f53d2d"
          />
        </span>
        <span className="flex items-center gap-1 justify-center">
          {shop?.followersCount}
          <span className="line-clamp-1">Followers</span>
        </span>
      </div>
      <Button
        variant={'outline'}
        className="border-blue-500 text-blue-500 hover:text-blue-600"
      >
        Xem Shop
      </Button>
    </Link>
  )
}

export default Shop
