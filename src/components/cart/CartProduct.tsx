import { ProductCart } from '@/lib/interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CartProduct = ({ product }: { product: ProductCart }) => {
  return (
    <Link
      href={`/product/${product?.productAttribute?.product?.id}`}
      className="flex items-start justify-between gap-2 hover:bg-gray-100 p-2"
    >
      <div className="flex items-start gap-2">
        <div className="w-10 h-10">
          <Image
            src={product.productAttribute.picture}
            width={40}
            height={40}
            className="max-w-10 max-h-10 w-auto h-auto"
            alt="logo"
          />
        </div>
        <span className="line-clamp-2 text-xs">
          {product?.productAttribute?.product?.name}
        </span>
      </div>
      <span className="text-destructive text-xs">
        {product?.productAttribute?.product?.price.toLocaleString('vi', {
          style: 'currency',
          currency: 'VND',
        })}
      </span>
    </Link>
  )
}

export default CartProduct
