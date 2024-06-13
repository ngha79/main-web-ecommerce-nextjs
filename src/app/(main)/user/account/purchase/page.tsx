import React, { Suspense } from "react";
import type { Metadata } from "next";

import ListPurchase from "../../../../../components/order/ListPurchase";
import { HttpError } from "@/lib/http";
import purchaseApiRequest from "@/apiRequests/purchase";

export const metadata: Metadata = {
  title: "Đơn hàng | Mua ngay | ShopDev",
  description: "Đơn hàng | Mua ngay | ShopDev",
};

const Page = async ({
  searchParams,
}: {
  searchParams: { type: string; search: string };
}) => {
  let listOrders = null;
  try {
    listOrders = await purchaseApiRequest.handleGetListOrder({
      limit: 10,
      page: 1,
      search: searchParams.search ? searchParams.search : "",
      status: searchParams.type === "all" ? undefined : searchParams.type,
    });
  } catch (error) {
    throw new Error();
  }

  return (
    <ListPurchase listOrders={listOrders.payload} searchParams={searchParams} />
  );
};

export default Page;
