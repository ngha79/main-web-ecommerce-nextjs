'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Order from './Order'
import LoadMore from '@/components/LoadMore'
import purchaseApiRequest from '@/apiRequests/purchase'
import { useAppContext } from '@/app/app-provider'

const PurchaseType = ({ listOrders }: { listOrders: any }) => {
  const { user } = useAppContext()
  const [orders, setOrders] = useState<any[]>([])
  const [nextPage, setNextPage] = useState<number | null>(null)
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'all'
  const keyword = searchParams.get('keyword') || ''

  useEffect(() => {
    if (listOrders.data) {
      setOrders(listOrders.data)
      setNextPage(listOrders.nextPage)
    }
  }, [listOrders])

  const handleFetch = async (isVisible: boolean) => {
    if (isVisible) {
      if (nextPage) {
        try {
          const { payload } = await purchaseApiRequest.handleGetListOrder({
            limit: 1,
            page: nextPage,
            search: keyword,
            status: type === 'all' ? undefined : type,
            userId: user?.id,
          })
          setOrders([...orders, ...payload.data])
          setNextPage(payload.nextPage)
        } catch (error) {
          toast.error('Có lỗi xảy ra vui lòng thử lại sau.')
        }
      }
    }
  }

  return (
    <>
      {orders.length ? (
        <div className="flex flex-col gap-4">
          {orders?.map((order: any) => (
            <Order
              key={order?.id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="h-[700px] flex flex-col gap-4 items-center justify-center text-sm text-gray-700">
          <Image
            alt="logo"
            src={'/order-image.png'}
            width={80}
            height={80}
          />
          <span>Chưa có đơn hàng</span>
        </div>
      )}
      {nextPage ? <LoadMore handleFetch={handleFetch} /> : null}
    </>
  )
}

export default PurchaseType
