import React from 'react'
import type { Metadata } from 'next'
import { getListWishlist } from '@/utils/store/wishlist'
import Pagination from './pagination'
import ListProduct from './list-product'
import wishlistApiRequest from '@/apiRequests/wishlist'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sản phẩm yêu thích | Mua ngay | ShopDev',
  description: 'Sản phẩm yêu thích của bạn | Mua ngay | ShopDev',
}

const Page = async ({
  searchParams,
}: {
  searchParams: { page: number; search: string }
}) => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  if (!accessToken?.value) redirect('/login')
  try {
    const product = await wishlistApiRequest.getWishlist(
      {
        page: searchParams.page || 1,
        search: searchParams.search || '',
        limit: 20,
      },
      accessToken?.value
    )
    return (
      <div className="flex flex-col gap-4 min-h-layout p-4 container">
        <ListProduct products={product?.payload?.data} />
        <Pagination listPage={product?.payload} />
      </div>
    )
  } catch (error: any) {
    throw new Error(error.payload.message)
  }
}

export default Page
