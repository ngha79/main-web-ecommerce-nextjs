import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/lib/interface'

const Directory = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center gap-1 text-sm line-clamp-1 flex-wrap">
      <Link
        href={'/'}
        className="text-blue-700"
      >
        Trang chủ
      </Link>
      <ChevronRight size={16} />
      <Link
        href={`/category/${product?.brand}`}
        className="text-blue-700"
      >
        {product?.brand}
      </Link>
      <ChevronRight size={16} />
      <span className="">{product?.name}</span>
    </div>
  )
}

export default Directory
