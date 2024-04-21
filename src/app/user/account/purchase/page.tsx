import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ListPurchase from './ListPurchase'
import { HttpError } from '@/lib/http'
import purchaseApiRequest from '@/apiRequests/purchase'
import accountApiRequest from '@/apiRequests/account'
import PurchaseType from './PurchaseType'

export const metadata: Metadata = {
  title: 'Đơn hàng | Mua ngay | ShopDev',
  description: 'Đơn hàng | Mua ngay | ShopDev',
}

const Page = async ({
  searchParams,
}: {
  searchParams: { type: string; keyword: string }
}) => {
  try {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    if (!accessToken) redirect('/login')
    const user = await accountApiRequest.me(accessToken)
    const res = await purchaseApiRequest.handleGetListOrder({
      limit: 1,
      page: 1,
      search: searchParams.keyword || '',
      status: searchParams.type === 'all' ? undefined : searchParams.type,
      userId: user.payload.id,
    })
    return <ListPurchase listOrders={res.payload} />
  } catch (error: any) {
    if (error instanceof HttpError) {
      throw new Error(error.payload.message)
    }
    throw new Error(error.message)
  }
}

export default Page
