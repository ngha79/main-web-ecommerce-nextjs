import { BrandProductType } from '@/lib/interface'
import { slugCategory } from '@/utils/function'
import Link from 'next/link'
import React from 'react'

const Category = () => {
  return (
    <div className="flex flex-col gap-y-4 bg-white rounded-md w-full p-4">
      <h1 className="uppercase text-lg">Danh mục</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {BrandProductType.map((cate, i) => (
          <Link
            key={i}
            href={`/category/${slugCategory(cate)}`}
            className="bg-blue-100 h-24 rounded-md flex items-center justify-center hover:bg-blue-200 text-sm md:text-base p-6 text-center"
          >
            {cate}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Category
