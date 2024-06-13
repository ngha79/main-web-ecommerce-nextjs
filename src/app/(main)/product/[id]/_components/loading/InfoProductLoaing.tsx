import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const InfoProductLoading = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-background rounded-md shadow-md">
      <div className="md:w-max w-full h-max flex flex-col gap-4 items-center p-4">
        <div className="md:min-w-[400px] w-full md:max-w-[50%] h-max flex items-center justify-center">
          <Skeleton className="w-full bg-gray-200 md:max-w-[450px] h-[300px] md:h-[450px]" />
        </div>
        <Skeleton className="w-full bg-gray-200 rounded-sm h-32" />
        <Skeleton className="h-12 w-40 bg-gray-200" />
      </div>
      <div className="flex flex-col gap-4 w-full p-4">
        <Skeleton className="w-full h-6 bg-gray-200 rounded-sm" />
        <Skeleton className="w-full h-10 bg-gray-200 rounded-sm" />
        <Skeleton className="w-full h-8 bg-gray-200 rounded-sm" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-28 h-12 bg-gray-200 rounded-sm" />
          <Skeleton className="w-40 h-12 bg-gray-200 rounded-sm" />
        </div>
        <div className="flex items-center gap-4 justify-end md:justify-start">
          <Skeleton className="w-40 h-12 bg-gray-200 rounded-sm" />
          <Skeleton className="w-28 h-12 bg-gray-200 rounded-sm" />
        </div>
      </div>
    </div>
  )
}

export default InfoProductLoading
