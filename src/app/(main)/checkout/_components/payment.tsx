"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { HttpError } from "@/lib/http";
import { CheckOut } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import purchaseApiRequest from "@/apiRequests/purchase";
import { IAddressUser } from "../../user/account/address/UpdateAddress";

const Payment = ({
  checkout,
  address,
}: {
  checkout: CheckOut | undefined;
  address: IAddressUser | undefined;
}) => {
  const router = useRouter();

  const handleOrder = async () => {
    if (!address) return toast.error("Bạn chưa thêm địa chỉ nhận hàng.");
    try {
      await purchaseApiRequest.handleOrderProduct({
        ...checkout,
        address,
      });
      toast.success("Vui lòng kiểm tra đơn hàng.");
      router.push("/");
    } catch (error: any) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(error.message);
      }
      router.replace("/");
    }
  };

  return (
    <div className="bg-background rounded-md shadow-login flex flex-col">
      <h3 className="p-4">Thanh toán</h3>
      <div className="flex flex-col gap-2 items-end text-xs border-y border-gray-300 p-4">
        <div className="flex items-center w-1/2 justify-end">
          <span className="w-28">Tổng tiền hàng</span>
          <span className="w-32 text-end">
            {checkout?.checkout_order?.total_price?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="flex items-center w-1/2 justify-end">
          <span className="w-28">Phí vận chuyển</span>
          <span className="w-32 text-end">
            {checkout?.checkout_order?.feeship?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
        <div className="flex items-center w-1/2 justify-end">
          <span className="w-28">Voucher giảm giá</span>
          <span className="w-32 text-end">
            {checkout?.checkout_order?.totalDiscount?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            }) || 0}
          </span>
        </div>
        <div className="flex items-center w-1/2 justify-end">
          <span className="w-28">Tổng thanh toán</span>
          <span className="w-32 text-end text-lg text-destructive leading-5">
            {checkout?.checkout_order?.totalCheckout?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <Button variant={"destructive"} className="w-max" onClick={handleOrder}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default Payment;
