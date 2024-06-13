import React from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { DialogClose } from "../ui/dialog";
import { buttonVariants } from "../ui/button";
import { cartStore } from "@/utils/store/store";
import { cn, ResponseExceptions } from "@/lib/utils";
import productApiRequest from "@/apiRequests/product";
import { checkoutStore } from "@/utils/store/checkout-store";

const Voucher = ({ voucher, shopId }: { voucher: any; shopId: string }) => {
  const cart = cartStore((state) => state.cart);
  const checkout = checkoutStore((state) => state.checkout);
  const setCheckout = checkoutStore((state) => state.setCheckout);

  const isVoucherActive =
    !voucher.discount_is_active ||
    new Date(voucher.discount_start_date) > new Date() ||
    new Date(voucher.discount_end_date) < new Date();
  const voucherIsActive = Boolean(isVoucherActive);

  const handleAddVoucher = async () => {
    if (voucherIsActive) return null;
    try {
      const newShopOrderIds = checkout?.shop_order_ids.map((shop) => {
        if (shop.shopId === shopId) {
          shop.shop_discounts = voucher.discount_code;
        }
        return shop;
      });
      const res = await productApiRequest.handleCheckOutProductPrice({
        cartId: cart?.id,
        shop_order_ids: newShopOrderIds,
      });
      setCheckout(res.payload);
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <div className="gap-4 text-sm flex flex-col w-full rounded-md p-4 md:p-2 border border-private bg-private/10">
      <div className="grid gap-2 grid-cols-3">
        <div className="flex flex-col text-private w-max col-span-2">
          <div className="space-x-1">
            <span>Giảm</span>
            <span>
              {voucher?.discount_type === "percent"
                ? `${voucher.discount_value}%`
                : Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                  }).format(voucher.discount_value)}
            </span>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <span>Đơn Tối Thiểu</span>
            <span>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(voucher.discount_min_order_value)}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>Còn lại</span>
              <span>
                {+voucher.discount_max_uses - +voucher.discount_use_count}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {new Date(voucher.discount_start_date) < new Date() && (
            <div className="text-xs text-gray-700 w-max">
              BĐ: {format(voucher.discount_start_date, "dd.MM.yyyy")}
            </div>
          )}
          <div className="text-xs text-gray-700 w-max">
            HSD: {format(voucher.discount_end_date, "dd.MM.yyyy")}
          </div>
        </div>
      </div>
      <DialogClose
        disabled={voucherIsActive}
        onClick={handleAddVoucher}
        className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
      >
        Sử dụng
      </DialogClose>
    </div>
  );
};

export default Voucher;
