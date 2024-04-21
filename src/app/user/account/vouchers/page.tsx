import React from 'react'
import type { Metadata } from 'next'
import AddVoucher from './_components/AddVoucher'
import ListVouchers from './_components/ListVouchers'
import discountApiRequest from '@/apiRequests/discount'

export const metadata: Metadata = {
  title: 'Vouchers | Mua ngay | ShopDev',
  description: 'Vouchers | Mua ngay | ShopDev',
}

const Page = async () => {
  try {
    const vouchers = await discountApiRequest.getVoucherShopServer({})
    return (
      <div className="container bg-background min-h-[600px] rounded-md shadow-md p-4 space-y-4">
        <h1 className="text-xl font-semibold">Kho Voucher</h1>
        <AddVoucher />
        <ListVouchers vouchers={vouchers.payload} />
      </div>
    )
  } catch (error) {
    throw new Error('Có lỗi xảy ra.')
  }
}

export default Page
