import React from 'react'
import Coupon from '../../../../components/coupon/Coupon'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import discountApiRequest from '@/apiRequests/discount'

const CouponShop = async ({ shop }: { shop: any }) => {
  try {
    const response = await discountApiRequest.getVoucherShop(shop.shop_id)
    return (
      <div className="w-full bg-white rounded-md shadow-login p-4 gap-4 h-max">
        <h3 className="text-sm text-gray-500 pb-2">Mã giảm giá của Shop</h3>
        <div className="flex md:flex-col gap-4 max-h-96">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent className="space-x-2">
              {response?.payload.data.map((voucher: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Coupon coupon={voucher} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      </div>
    )
  } catch (error) {
    return null
  }
}

export default CouponShop
