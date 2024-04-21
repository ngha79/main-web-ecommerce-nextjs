import discountApiRequest from '@/apiRequests/discount'
import Coupon from '@/components/coupon/Coupon'
import React from 'react'

const VouchersShop = async ({ params }: { params: { id: string } }) => {
  try {
    const coupons = await discountApiRequest.getVoucherShop(params.id)
    return (
      <div className="w-full bg-background rounded-md shadow-md p-4 space-y-2">
        <h1 className="uppercase text-lg text-gray-700">VOUCHER</h1>
        <div className="flex items-center gap-2">
          {coupons.payload.data?.map((coupon: any) => (
            <Coupon
              key={coupon.id}
              coupon={coupon}
            />
          ))}
        </div>
      </div>
    )
  } catch (error: any) {
    throw new Error(error.payload.message)
  }
}

export default VouchersShop
