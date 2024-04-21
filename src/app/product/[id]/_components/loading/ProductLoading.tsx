import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductLoading = () => {
  return (
    <div className="bg-background rounded-md shadow-md overflow-hidden">
      <Skeleton className="w-full h-64 md:h-80 bg-gray-300" />
      <div className="flex flex-col gap-2 p-2">
        <Skeleton className="w-40 h-6 bg-gray-300" />
        <Skeleton className="w-40 h-6 bg-gray-300" />
        <Skeleton className="w-40 h-6 bg-gray-300" />
      </div>
    </div>
  )
}

export default ProductLoading
