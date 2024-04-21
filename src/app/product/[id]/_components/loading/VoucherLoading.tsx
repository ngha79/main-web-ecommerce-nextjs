import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const VoucherLoading = () => {
  return (
    <div className="w-full p-4 bg-background space-y-4">
      <Skeleton className="w-40 h-4 bg-gray-200 rounded-sm" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Skeleton className="h-28 bg-gray-200" />
        <Skeleton className="h-28 bg-gray-200" />
        <Skeleton className="h-28 bg-gray-200 hidden md:block" />
        <Skeleton className="h-28 bg-gray-200 hidden md:block" />
      </div>
    </div>
  )
}

export default VoucherLoading
