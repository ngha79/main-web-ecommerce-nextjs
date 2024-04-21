'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HoverCard from './HoverCartProduct'
import { Product as IProduct } from '@/lib/interface'
import { cn } from '@/lib/utils'

const Product = ({
  product,
  className,
}: {
  product: IProduct
  className: string
}) => {
  return (
    <Link
      href={`/product/${product?.id}`}
      className={cn([
        'flex flex-col h-full group bg-white hover:bg-white/90 hover:shadow-login hover:border-gray-200 border border-transparent duration-300 cursor-pointer rounded-md relative',
        className ? '' : 'hover:-translate-y-2',
      ])}
    >
      <HoverCard productId={product.id} />
      <div className="h-64 lg:h-72 flex items-center justify-center">
        <Image
          alt="thumb"
          src={product?.picture?.[0].product_image_url || '/login.png'}
          width={120}
          height={120}
          className="w-full h-auto max-h-64 lg:max-h-72"
        />
      </div>
      <div className="flex flex-col p-2 gap-y-2">
        <span className="line-clamp-2 hover:underline font-medium">
          {product?.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-blue-500 lg:text-lg text-sm font-bold flex items-center">
            <span className="text-sm font-medium">đ</span> {product?.price}
          </span>
        </div>
        <span className="text-sm text-gray-500">Đã bán: {product?.sold}</span>
        {/* <Button
          onClick={handleAddProductToCart}
          className="p-0 overflow-hidden bg-blue-500 hover:bg-blue-500"
        >
          <div className="flex flex-col py-8 items-center justify-center -translate-y-4  md:translate-y-5 md:hover:-translate-y-4 w-full duration-200">
            <span className="pb-4 text-sm">Thêm vào giỏ hàng</span>
            <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
        </Button> */}
      </div>
    </Link>
  )
}

export default Product
