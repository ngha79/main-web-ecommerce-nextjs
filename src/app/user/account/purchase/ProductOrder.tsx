import Image from 'next/image'
import React from 'react'

const ProductOrder = ({ product }: { product: any }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Image
          alt="thumb"
          src={product?.productAttribute?.thumb}
          width={80}
          height={80}
          className="border"
        />
        <div className="flex flex-col gap-y-1 text-xs md:text-sm">
          <span className="line-clamp-2">{product?.product?.name}</span>
          <span className="text-gray-500">
            Phân loại hàng: {product?.productAttribute?.size}
          </span>
          <span className="text-xs">Số lượng: x{product?.quantity}</span>
        </div>
      </div>
      <div className="text-xs md:text-sm gap-2 flex flex-col md:flex-row">
        {/* <span className="text-gray-400 line-through">{product?.quantity}</span> */}
        <span className="text-destructive">
          {product?.product?.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </div>
    </div>
  )
}

export default ProductOrder
