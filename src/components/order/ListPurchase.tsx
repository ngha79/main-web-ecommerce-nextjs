"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import useDebounce from "@/helpers/useDebounce";
import PurchaseType from "./PurchaseType";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ListPurchase = ({
  listOrders,
  searchParams,
}: {
  listOrders: any;
  searchParams: { type: string; search: string };
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.search || "");
  const [status, setStatus] = useState(searchParams.type || "all");

  const handleSetTypePurchase = (typeOrder: string) => {
    setStatus(typeOrder);
    const params = new URLSearchParams(searchParams);
    params.set("type", typeOrder);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchDebounce = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchDebounce);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchDebounce, pathname]);

  return (
    <Tabs value={status} className="space-y-4">
      <TabsList className="w-full flex justify-between overflow-x-auto shadow-login rounded-md">
        <TabsTrigger
          className="w-full"
          value="all"
          onClick={() => handleSetTypePurchase("all")}
        >
          Tất cả
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="shipping"
          onClick={() => handleSetTypePurchase("shipping")}
        >
          Vận chuyển
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="pending"
          onClick={() => handleSetTypePurchase("pending")}
        >
          Chờ xác nhận
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="confirmed"
          onClick={() => handleSetTypePurchase("confirmed")}
        >
          Xác nhận
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="cancelled"
          onClick={() => handleSetTypePurchase("cancelled")}
        >
          Đã hủy
        </TabsTrigger>
        <TabsTrigger
          className="w-full"
          value="delivered"
          onClick={() => handleSetTypePurchase("delivered")}
        >
          Hoàn thành
        </TabsTrigger>
      </TabsList>
      <div className="relative p-4 bg-background shadow-login rounded-md">
        <Search className="absolute text-gray-500 -translate-y-1/2 top-1/2 left-6" />
        <Input
          className="px-10 bg-gray-100"
          type="text"
          value={search}
          onChange={handleSearchOrder}
          placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
        />
      </div>

      <PurchaseType ordersData={listOrders} />
    </Tabs>
  );
};

export default ListPurchase;
