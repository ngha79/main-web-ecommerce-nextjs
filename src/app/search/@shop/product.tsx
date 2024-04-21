import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Product = ({ product }: any) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col w-full gap-1 hover:-translate-y-2 duration-300 grid-cols-1"
    >
      <div className="flex h-52 items-center justify-center border overflow-hidden">
        <Image
          alt="thumb"
          src={product?.picture?.[0].product_image_url || '/login.png'}
          width={120}
          height={120}
          className="w-full max-w-52 max-h-52"
        />
      </div>
      <div className="text-sm line-clamp-1">{product.name}</div>
      <div className="flex items-center text-xs justify-between w-full">
        <span className="text-destructive">
          {product?.price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
        <span>Đã bán {product.sold}</span>
      </div>
    </Link>
  )
}

export default Product
