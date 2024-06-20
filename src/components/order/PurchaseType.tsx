"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";

import Order from "./Order";
import purchaseApiRequest from "@/apiRequests/purchase";
import { IListOrder } from "@/lib/interface";
import { useInView } from "react-intersection-observer";
import { ResponseExceptions } from "@/lib/utils";
import { HttpError } from "@/lib/http";

const PurchaseType = ({ ordersData }: { ordersData: any }) => {
  const searchParams = useSearchParams();
  const orderType = searchParams.get("type") || "all";
  const searchKeyword = searchParams.get("keyword") || "";

  const [listOrders, setListOrders] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<number | null | undefined>(
    ordersData.nextPage
  );
  const [isLoading, startLoading] = useTransition();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const handleFetch = useCallback(() => {
    if (isLoading || !nextPage) return;
    startLoading(async () => {
      try {
        const { payload } = await purchaseApiRequest.handleGetListOrder({
          limit: 10,
          page: nextPage,
          search: searchKeyword,
          status: orderType === "all" ? undefined : orderType,
        });
        setListOrders((prev) => [...prev, ...payload.data]);
        setNextPage(payload.nextPage);
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  }, [isLoading, nextPage, orderType, searchKeyword]);

  useEffect(() => {
    if (inView && nextPage) {
      handleFetch();
    }
  }, [inView, nextPage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col h-full gap-4">
        {ordersData.data.length ? (
          ordersData.data.map((order: IListOrder) => (
            <Order key={order.id} order={order} />
          ))
        ) : (
          <div className="flex h-96 flex-col gap-4 items-center justify-center text-sm text-gray-700">
            <Image
              alt="Empty order"
              src={"/order-image.png"}
              width={80}
              height={80}
            />
            <span>Bạn không có đơn hàng nào.</span>
          </div>
        )}
        {listOrders.map((order: IListOrder) => (
          <Order key={order.id} order={order} />
        ))}
        <div ref={ref}>
          {isLoading ? (
            <div className="flex items-center justify-center pt-8">
              <div
                className="inline-block text-gray-700 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PurchaseType;
