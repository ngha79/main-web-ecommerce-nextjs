import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";

import ProductOrder from "./ProductOrder";
import { IListOrder } from "@/lib/interface";
import orderRequest from "@/apiRequests/order";
import { cn, ResponseExceptions } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const StatusOrder: { [key: string]: { message: string; status: string } } = {
  pending: {
    message: "Đơn hàng đang chờ xử lý",
    status: "ĐANG CHỜ",
  },
  delivered: {
    message: "Đơn hàng đã giao thành công",
    status: "HOÀN THÀNH",
  },
  confirmed: {
    message: "Đơn hàng đã được xác nhận",
    status: "XÁC NHẬN",
  },
  cancelled: {
    message: "Đơn hàng đã hủy",
    status: "ĐÃ HỦY",
  },
  shipping: {
    message: "Đơn hàng đang trên đường vận chuyển",
    status: "ĐANG GIAO",
  },
};

const Order = ({ order }: { order: IListOrder }) => {
  const [isLoading, startTrasition] = useTransition();
  const [orderState, setOrder] = useState<IListOrder>(order);
  const totalPrice = +order?.total_price;
  const totalPriceDiscount =
    +order?.total_price - +order?.total_price_apply_discount;
  const products = order?.order;

  const handleCancelOrder = async () => {
    if (isLoading) return null;
    startTrasition(async () => {
      try {
        await orderRequest.cancelOrder(order.id);
        setOrder({ ...order, status: "cancelled" });
        toast.success("Hủy đơn hàng thành công");
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    });
  };

  return (
    <div className="flex flex-col border-y bg-background shadow-login rounded-md">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between max-[540px]:flex-col max-[540px]:items-start flex-row gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium line-clamp-1 w-20 md:w-max">
              {orderState?.shop?.userName}
            </span>
            <Button variant="destructive" size="sm">
              Chat
            </Button>
            <Link
              className={cn([
                buttonVariants({ variant: "outline", size: "sm" }),
              ])}
              href={`/shop/${orderState?.shop?.id}`}
            >
              Xem Shop
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-green-700 line-clamp-1">
              {StatusOrder[orderState?.status]?.message}
            </span>
            <span className="h-4 w-px bg-gray-300" aria-hidden></span>
            <span className="uppercase text-red-500 text-xs line-clamp-1">
              {StatusOrder[orderState?.status]?.status}
            </span>
          </div>
        </div>
        <div aria-hidden="true" className="w-full h-px bg-gray-300"></div>
        {products?.map((product) => (
          <ProductOrder key={product?.id} product={product} />
        ))}
      </div>
      <div className="flex flex-col gap-2 items-end p-4 bg-gray-100 border-t rounded-b-md">
        <div className="flex items-center gap-2">
          <span className="text-xs">Thành tiền:</span>
          {totalPriceDiscount !== totalPrice ? (
            <span className="line-through text-xs">
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          ) : null}
          <span className="text-red-500">
            {totalPriceDiscount.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="flex items-start gap-4 flex-wrap justify-end">
          {orderState.status === "pending" ? (
            <Dialog>
              <DialogTrigger
                className={cn(buttonVariants({ variant: "destructive" }))}
                disabled={isLoading}
              >
                Hủy
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Hủy đơn hàng</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn hủy đơn hàng chứ!
                </DialogDescription>
                <div className="flex items-center justify-end gap-4">
                  <DialogClose
                    onClick={handleCancelOrder}
                    className={cn(buttonVariants({ variant: "primary" }))}
                    disabled={isLoading}
                  >
                    Xác nhận
                  </DialogClose>
                  <DialogClose
                    className={cn(buttonVariants({ variant: "destructive" }))}
                    disabled={isLoading}
                  >
                    Hủy
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          ) : null}
          <Button variant="outline">Liên hệ người bán</Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
