'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PurchaseType from './PurchaseType'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useDebounce from '@/helpers/useDebounce'

const ListPurchase = ({ listOrders }: { listOrders: any }) => {
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const keyword = searchParams.get('keyword') || ''

  const handleSetTypePurchase = (typeOrder: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('type', typeOrder)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleSearchOrder = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearch(e.target.value)
  }

  const searchDebounce = useDebounce(search, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('keyword', searchDebounce)
    router.replace(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchDebounce, searchParams])

  return (
    <Tabs
      defaultValue="all"
      className="space-y-4"
    >
      <TabsList className="w-full flex justify-between overflow-x-auto shadow-login rounded-md">
        <TabsTrigger
          className="w-full"
          value="all"
          onClick={() => handleSetTypePurchase('all')}
        >
          Tất cả
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="shipping"
          onClick={() => handleSetTypePurchase('shipping')}
        >
          Vận chuyển
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="pending"
          onClick={() => handleSetTypePurchase('pending')}
        >
          Chờ giao hàng
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="confirmed"
          onClick={() => handleSetTypePurchase('confirmed')}
        >
          Xác nhận
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="cancelled"
          onClick={() => handleSetTypePurchase('cancelled')}
        >
          Đã hủy
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="delivered"
          onClick={() => handleSetTypePurchase('delivered')}
        >
          Hoàn thành
        </TabsTrigger>
      </TabsList>
      <div className="relative p-4 bg-background shadow-login rounded-md">
        <Search className="absolute text-gray-500 -translate-y-1/2 top-1/2 left-6" />
        <Input
          className="px-10 bg-gray-100"
          type="text"
          defaultValue={keyword}
          onChange={handleSearchOrder}
          placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
        />
      </div>
      <PurchaseType listOrders={listOrders} />
    </Tabs>
  )
}

export default ListPurchase
