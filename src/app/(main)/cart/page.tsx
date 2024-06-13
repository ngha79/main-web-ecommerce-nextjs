import React from "react";
import type { Metadata } from "next";

import FormCart from "./_components/form-cart";
import InfoShipping from "@/components/cart/InfoShipping";

export const metadata: Metadata = {
  title: "Giỏ hàng | Mua ngay | ShopDev",
  description: "Giỏ hàng của bạn | Mua ngay | ShopDev",
};

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 space-y-8">
      <InfoShipping />
      <FormCart />
    </div>
  );
};

export default Page;
