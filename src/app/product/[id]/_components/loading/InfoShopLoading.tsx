import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const InfoShopLoading = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-background rounded-md shadow-md">
      <div className="flex items-center gap-4 min-w-80">
        <Skeleton className="w-20 h-20 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-4 bg-gray-200 rounded-sm" />
          <Skeleton className="w-24 h-4 bg-gray-200 rounded-sm" />
          <div className="flex gap-2">
            <Skeleton className="w-24 h-9 bg-gray-200 rounded-md" />
            <Skeleton className="w-24 h-9 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>
      <div className="gap-2 w-full grid grid-cols-2">
        <Skeleton className="w-full bg-gray-200 rounded-sm" />
        <Skeleton className="w-full bg-gray-200 rounded-sm" />
        <Skeleton className="w-full bg-gray-200 rounded-sm" />
        <Skeleton className="w-full bg-gray-200 rounded-sm" />
        <Skeleton className="w-full bg-gray-200 rounded-sm" />
      </div>
    </div>
  )
}

export default InfoShopLoading
