"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Order from "./Order";
import LoadMore from "@/components/LoadMore";
import purchaseApiRequest from "@/apiRequests/purchase";
import { IListOrder } from "@/lib/interface";

const PurchaseType = ({ ordersData }: { ordersData: any }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const orderType = searchParams.get("type") || "all";
  const searchKeyword = searchParams.get("keyword") || "";

  const fetchOrders = async (isVisible: boolean) => {
    if (isVisible && nextPage) {
      try {
        const { payload } = await purchaseApiRequest.handleGetListOrder({
          limit: 1,
          page: nextPage,
          search: searchKeyword,
          status: orderType === "all" ? undefined : orderType,
        });
        setOrders((prevOrders) => [...prevOrders, ...payload.data]);
        setNextPage(payload.nextPage);
      } catch {
        toast.error("Có lỗi xảy ra vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {ordersData.data.length ? (
        ordersData.data.map((order: IListOrder) => (
          <Order key={order.id} order={order} />
        ))
      ) : (
        <div className="h-[500px] flex flex-col gap-4 items-center justify-center text-sm text-gray-700">
          <Image
            alt="Empty order"
            src={"/order-image.png"}
            width={80}
            height={80}
          />
          <span>Bạn không có đơn hàng nào.</span>
        </div>
      )}
      {orders.length ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
          {nextPage && <LoadMore handleFetch={fetchOrders} />}
        </div>
      ) : null}
    </div>
  );
};

export default PurchaseType;
