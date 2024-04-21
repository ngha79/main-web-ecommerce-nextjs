'use client'

import { toast } from 'sonner'
import React, { useState } from 'react'

import LoadMore from '@/components/LoadMore'
import Coupon from '@/components/coupon/Coupon'
import discountApiRequest from '@/apiRequests/discount'

interface IListVoucher {
  data: any[]
  nextPage: number | null
  lastPage: number | null
  prevPage: number | null
}

const ListVouchers = ({ vouchers }: any) => {
  const [listVouchers, setListVoucher] = useState<IListVoucher>(vouchers)

  const handleFetchVouchers = async (isVisible: boolean) => {
    if (isVisible) {
      toast.error('Có lỗi xảy ra vui lòng thử lại sau.')
      if (listVouchers.nextPage) {
        try {
          const res = await discountApiRequest.getVoucherShopServer({
            limit: 20,
            page: listVouchers.nextPage,
            search: '',
          })
          setListVoucher((prev) => ({ ...prev, data: [...prev.data] }))
        } catch (error) {
          toast.error('Có lỗi xảy ra vui lòng thử lại sau.')
        }
      }
    }
  }
  return (
    <section className="flex flex-col gap-4 py-4">
      <div className="flex flex-wrap gap-4">
        {listVouchers?.data?.map((voucher) => (
          <Coupon
            coupon={voucher}
            key={voucher.id}
          />
        ))}
      </div>
      {vouchers.nextPage ? (
        <LoadMore handleFetch={handleFetchVouchers} />
      ) : null}
    </section>
  )
}

export default ListVouchers
