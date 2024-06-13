import React from "react";
import type { Metadata } from "next";

import MainContent from "./_components/main-content";
import accountApiRequest from "@/apiRequests/account";

export const metadata: Metadata = {
  title: "Checkout | Mua ngay | ShopDev",
  description: "Checkout Order | Mua ngay | ShopDev",
};

const Page = async () => {
  const res = await accountApiRequest.handleGetListAddress();
  return <MainContent addressList={res.payload || []} />;
};

export default Page;
