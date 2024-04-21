import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import React from 'react'

const Coupon = ({ coupon }: any) => {
  return (
    <div className="flex w-full min-w-max max-w-64 gap-4 p-4 md:p-2 justify-between flex-col md:flex-row items-center border border-private bg-private/10">
      <div className="gap-4 text-xs md:text-sm flex md:flex-col">
        <div className="flex flex-col text-private w-max">
          <span>
            Giảm{' '}
            {coupon?.discount_type === 'percent'
              ? `${coupon.discount_value}%`
              : coupon.discount_value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'VND',
                })}
          </span>
          <span>Đơn Tối Thiểu</span>
          <span>
            {coupon?.discount_min_order_value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'VND',
            }) || 0}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {new Date(coupon.discount_start_date) < new Date() ? (
            <div className="text-xs text-gray-700 w-max">
              BĐ: {format(coupon.discount_start_date, 'dd.MM.yyyy')}
            </div>
          ) : null}
          <div className="text-xs text-gray-700 w-max">
            HSD: {format(coupon.discount_end_date, 'dd.MM.yyyy')}
          </div>
        </div>
      </div>
      <Button
        className="text-sm"
        variant={'destructive'}
      >
        Lưu
      </Button>
    </div>
  )
}

export default Coupon
