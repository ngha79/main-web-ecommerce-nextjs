import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProductDescriptionLoading = () => {
  return (
    <div className="flex flex-col gap-12 p-8 bg-background rounded-md shadow-md">
      <div className="flex flex-col gap-8">
        <Skeleton className="w-52 h-6 bg-gray-200" />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-28 h-4 bg-gray-200" />
            <Skeleton className="w-52 h-4 bg-gray-200" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-28 h-4 bg-gray-200" />
            <Skeleton className="w-52 h-4 bg-gray-200" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-28 h-4 bg-gray-200" />
            <Skeleton className="w-52 h-4 bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <Skeleton className="w-52 h-6 bg-gray-200" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-5 bg-gray-200" />
          <Skeleton className="w-full h-5 bg-gray-200" />
          <Skeleton className="w-full h-5 bg-gray-200" />
          <Skeleton className="w-full h-5 bg-gray-200" />
          <Skeleton className="w-full h-5 bg-gray-200" />
          <Skeleton className="w-full h-5 bg-gray-200" />
          <Skeleton className="w-60 h-96 bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export default ProductDescriptionLoading
