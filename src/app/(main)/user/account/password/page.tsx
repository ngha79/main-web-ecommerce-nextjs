import React from 'react'
import FormChangePassword from './FormChangePassword'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đổi mật khẩu | Mua ngay | ShopDev',
  description: 'Đổi mật khẩu | Mua ngay | ShopDev',
}
const Page = () => {
  return (
    <div className="bg-background shadow-login rounded-md">
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-300">
        <h1 className="text-lg font-semibold text-gray-700 ">Đổi mật khẩu</h1>
      </div>
      <FormChangePassword />
    </div>
  )
}

export default Page
