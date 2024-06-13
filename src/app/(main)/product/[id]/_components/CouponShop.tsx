import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import discountApiRequest from "@/apiRequests/discount";
import Coupon from "@/components/coupon/Coupon";

const CouponShop = async ({ shop }: { shop: any }) => {
  let coupons = null;
  try {
    const response = await discountApiRequest.getVoucherShop(shop.shop_id);
    coupons = response.payload.data;
    if (!coupons?.length) return null;
  } catch (error) {
    return null;
  }
  return (
    <div className="w-full bg-white rounded-md shadow-login p-4 gap-4 h-max">
      <h3 className="text-sm text-gray-500 pb-2">Mã giảm giá của Shop</h3>
      <div className="flex md:flex-col gap-4 max-h-96">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="space-x-2">
            {coupons.map((voucher: any, index: number) => (
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
  );
};

export default CouponShop;
