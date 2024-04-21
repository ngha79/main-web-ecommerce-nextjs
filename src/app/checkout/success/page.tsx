'use client'

import { Button } from '@/components/ui/button'
import { ListOrder } from '@/lib/interface'
import { listOrderStore } from '@/utils/store/order'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const CheckoutSuccess = () => {
  const listOrder = listOrderStore((state) => state.listOrder)
  const router = useRouter()
  useEffect(() => {
    if (!listOrder?.length) {
      router.push('/')
    }
  }, [listOrder, router])
  return (
    <div className="flex flex-col min-h-[600px] py-8 gap-y-4 px-4">
      <h1 className="text-lg font-medium">Đặt hàng thành công</h1>
      <div className="flex flex-col gap-y-2 bg-background rounded-md px-4 md:px-8 py-4 shadow-login overflow-hidden">
        <h3 className="flex items-center gap-2 text-red-700 font-medium leading-5">
          <MapPin size={16} />
          <span className="line-clamp-1">Địa Chỉ Nhận Hàng</span>
        </h3>
        <div className="flex flex-wrap items-start md:items-center text-sm gap-1">
          <h3 className="font-semibold leading-5 w-max line-clamp-1 flex items-center gap-2">
            <span>{listOrder?.[0]?.order?.address?.userName}</span>
            <span>{listOrder?.[0]?.order?.address?.phoneNumber}</span>
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="line-clamp-2">
              {listOrder?.[0]?.order.address?.address}
            </span>
          </div>
        </div>
      </div>
      {listOrder?.map((order: ListOrder, index: number) => (
        <div
          className="bg-background rounded-md shadow-login flex flex-col"
          key={index}
        >
          <h3 className="p-4">Thanh toán</h3>
          <div className="flex flex-col bg-background rounded-md shadow-login">
            <div className="grid grid-cols-7 text-gray-500 p-4">
              <span className="col-span-3 text-start font-medium text-foreground">
                Sản phẩm
              </span>
              <span className="col-span-1 text-center text-sm line-clamp-1">
                Đơn Giá
              </span>
              <span className="col-span-1 text-center text-sm line-clamp-1">
                Số Lượng
              </span>
              <span className="col-span-2 text-end text-sm line-clamp-1">
                Thành tiền
              </span>
            </div>
            <div>
              {order?.order?.order?.map((orderItem: any) => (
                <div
                  className="grid grid-cols-7 py-4 px-6 justify-center items-center hover:bg-gray-100"
                  key={index}
                >
                  <div className="flex items-center gap-2 col-span-3">
                    <Image
                      alt="logo-product"
                      src={'/login.png'}
                      width={60}
                      height={60}
                      className="border"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm line-clamp-2">
                        {orderItem?.product?.name}
                      </span>
                      <span className="text-xs line-clamp-1">
                        {orderItem?.productAttribute?.material}
                      </span>
                      <span className="text-xs line-clamp-1">
                        {orderItem?.productAttribute?.size}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    {orderItem?.product?.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </div>
                  <div className="text-xs text-center">
                    {orderItem?.quantity}
                  </div>
                  <div className="text-sm col-span-2 gap-x-2 flex items-center justify-end">
                    <span className="text-xs text-gray-500">
                      {Number(
                        orderItem?.product?.price * orderItem?.quantity
                      )?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end text-xs border-y border-gray-300 p-4">
            <div className="flex items-center w-1/2 justify-end">
              <span className="w-28">Tổng tiền hàng</span>
              <span className="w-32 text-end">
                {order?.order?.total_price?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            </div>

            <div className="flex items-center w-1/2 justify-end">
              <span className="w-28">Voucher giảm giá</span>
              <span className="w-32 text-end">
                {Number(
                  order?.order?.total_price -
                    order?.order?.total_price_apply_discount
                )?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            </div>
            <div className="flex items-center w-1/2 justify-end">
              <span className="w-28">Tổng thanh toán</span>
              <span className="w-32 text-end text-lg text-destructive leading-5">
                {order?.order?.total_price_apply_discount?.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'VND',
                  }
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end p-4">
        <Button
          variant={'destructive'}
          className="w-max"
          onClick={() => router.replace('/')}
        >
          Trở về
        </Button>
      </div>
    </div>
  )
}

export default CheckoutSuccess
