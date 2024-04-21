'use client'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lỗi | Mua ngay | ShopDev',
  description: 'Lỗi | Mua ngay | ShopDev',
}

const ErrorProduct = ({ error }: { error: Error }) => {
  return (
    <div className="container min-h-layout flex items-center justify-center">
      {error.message}
    </div>
  )
}

export default ErrorProduct
