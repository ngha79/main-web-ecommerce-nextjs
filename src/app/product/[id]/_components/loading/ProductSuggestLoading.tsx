import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import ProductLoading from './ProductLoading'

const ProductSuggestLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Skeleton className="w-52 h-8 bg-gray-200" />
        <Skeleton className="w-32 h-6 bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
        <ProductLoading />
      </div>
    </div>
  )
}

export default ProductSuggestLoading
