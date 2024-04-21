import React from 'react'
import { FormUpdate } from './FormUpdate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hồ Sơ người dùng | Mua ngay | ShopDev',
  description: 'Hồ Sơ người dùng | Mua ngay | ShopDev',
}

const Profile = () => {
  return (
    <div className="w-full bg-background rounded-md shadow-login">
      <div className="flex flex-col justify-center px-8 py-4 border-b border-gray-300">
        <h1 className="text-lg font-semibold text-gray-700">Hồ Sơ Của Tôi</h1>
        <span className="text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </span>
      </div>
      <FormUpdate />
    </div>
  )
}

export default Profile
