import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import React from "react";

const Coupon = ({ coupon }: { coupon: any }) => {
  const {
    discount_type,
    discount_value,
    discount_min_order_value,
    discount_start_date,
    discount_end_date,
  } = coupon;

  const startDateFormatted = format(discount_start_date, "dd.MM.yyyy");
  const endDateFormatted = format(discount_end_date, "dd.MM.yyyy");

  const discountTypeLabel =
    discount_type === "percent"
      ? `${discount_value}%`
      : discount_value.toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        });
  const minOrderValueFormatted = discount_min_order_value.toLocaleString(
    "en-US",
    { style: "currency", currency: "VND" }
  );

  return (
    <div className="flex w-full rounded-md min-w-max max-w-64 gap-4 p-4 md:p-2 justify-between flex-col md:flex-row items-center border border-private bg-private/10">
      <div className="gap-4 text-xs md:text-sm flex md:flex-col">
        <div className="flex flex-col text-private w-max">
          <span>Giảm {discountTypeLabel}</span>
          <span>Đơn Tối Thiểu</span>
          <span>{minOrderValueFormatted}</span>
        </div>
        <div className="flex items-center gap-4">
          {new Date(discount_start_date) < new Date() && (
            <div className="text-xs text-gray-700 w-max">
              BĐ: {startDateFormatted}
            </div>
          )}
          <div className="text-xs text-gray-700 w-max">
            HSD: {endDateFormatted}
          </div>
        </div>
      </div>
      <Button className="text-sm" variant="destructive">
        Lưu
      </Button>
    </div>
  );
};

export default Coupon;
