import React from 'react'
import Directory from './Directory'
import { Product } from '@/lib/interface'

const ProductDescription = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-md shadow-login w-full p-4 space-y-8 h-max">
      <div className="flex flex-col">
        <h1 className="text-lg uppercase font-semibold text-gray-600 p-4">
          CHI TIẾT SẢN PHẨM
        </h1>
        <div className="flex flex-col gap-y-4 p-4">
          <div className="flex items-center">
            <label className="text-sm w-32 line-clamp-1 text-gray-500">
              Danh mục
            </label>
            <Directory product={product} />
          </div>
          <div className="flex items-center">
            <label className="text-sm w-32 line-clamp-1 text-gray-500">
              Danh mục
            </label>
            <span className="text-sm">{product?.brand}</span>
          </div>
          <div className="flex items-center">
            <label className="text-sm w-32 line-clamp-1 text-gray-500">
              Đã bán
            </label>
            <span className="text-sm">{product?.sold}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg uppercase font-semibold text-gray-600 p-4">
          MÔ TẢ SẢN PHẨM
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: product?.detail }}
          className="flex flex-col gap-y-4 p-4 break-words"
        />
      </div>
    </div>
  )
}

export default ProductDescription
