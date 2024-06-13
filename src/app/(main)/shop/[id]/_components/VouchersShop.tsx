import discountApiRequest from "@/apiRequests/discount";
import Coupon from "@/components/coupon/Coupon";
import React from "react";

const VouchersShop = async ({ params }: { params: { id: string } }) => {
  let coupons = null;
  try {
    const response = await discountApiRequest.getVoucherShop(params.id);
    coupons = response.payload.data;
  } catch (error: any) {
    return null;
  }
  if (!coupons?.length) return null;
  return (
    <div className="w-full bg-background rounded-md shadow-login p-4 space-y-2">
      <h1 className="uppercase text-lg text-gray-700 font-medium">VOUCHER</h1>
      <div className="flex items-center gap-2">
        {coupons?.map((coupon: any) => (
          <Coupon key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
};

export default VouchersShop;
