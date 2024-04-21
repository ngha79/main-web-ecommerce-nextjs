import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const RatingLoading = () => {
  return (
    <div className="p-4 rounded-md shadow-md bg-background space-y-8">
      <div className="w-full h-60 flex flex-col gap-12 bg-gray-100 justify-between py-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Skeleton className="w-32 h-9 bg-gray-300" />
          <Skeleton className="w-40 h-9 bg-gray-300" />
        </div>
        <div className="flex items-center gap-4 justify-center">
          <Skeleton className="w-24 h-9 bg-gray-300" />
          <Skeleton className="w-24 h-9 bg-gray-300" />
          <Skeleton className="w-24 h-9 bg-gray-300" />
          <Skeleton className="w-24 h-9 bg-gray-300" />
          <Skeleton className="w-24 h-9 bg-gray-300" />
          <Skeleton className="w-24 h-9 bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-start gap-2 w-full border-b pb-4">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
            </div>
            <div className="flex justify-between w-full">
              <Skeleton className="w-12 h-8" />
              <Skeleton className="w-20 h-9" />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 w-full border-b pb-4">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
            </div>
            <div className="flex justify-between w-full">
              <Skeleton className="w-12 h-8" />
              <Skeleton className="w-20 h-9" />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 w-full border-b pb-4">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
            </div>
            <div className="flex justify-between w-full">
              <Skeleton className="w-12 h-8" />
              <Skeleton className="w-20 h-9" />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 w-full border-b pb-4">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
            </div>
            <div className="flex justify-between w-full">
              <Skeleton className="w-12 h-8" />
              <Skeleton className="w-20 h-9" />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 w-full border-b pb-4">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
              <Skeleton className="w-32 h-4 bg-gray-200" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
              <Skeleton className="w-72 h-4 bg-gray-200" />
            </div>
            <div className="flex justify-between w-full">
              <Skeleton className="w-12 h-8" />
              <Skeleton className="w-20 h-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingLoading
