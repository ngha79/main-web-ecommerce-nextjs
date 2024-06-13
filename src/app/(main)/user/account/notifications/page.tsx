import React from "react";
import type { Metadata } from "next";

import ListNotification from "@/components/notification/ListNotification";
import UpdateAllNotification from "@/components/notification/UpdateAllNotification";

export const metadata: Metadata = {
  title: "Thông báo | Mua ngay | ShopDev",
  description: "Thông báo | Mua ngay | ShopDev",
};

const Page = () => {
  return (
    <div className="bg-background shadow-login rounded-md">
      <div className="flex items-center justify-between py-4 px-6 border-b">
        <h1 className="font-semibold text-lg text-gray-700">
          Tất cả thông báo
        </h1>
        <UpdateAllNotification />
      </div>
      <ListNotification />
    </div>
  );
};

export default Page;
