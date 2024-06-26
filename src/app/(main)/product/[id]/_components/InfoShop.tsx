import React from "react";
import Image from "next/image";
import Link from "next/link";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import { Shop } from "@/lib/interface";
import ButtonChat from "@/components/conversation/ButtonChat";

const InfoShop = ({ shop }: { shop: Shop }) => {
  return (
    <div className="bg-white rounded-lg shadow-login p-4 flex items-center gap-8 w-full flex-col md:flex-row">
      <div className="flex items-center justify-center gap-4 border-b md:border-b-0 pb-8 md:pb-0 md:border-r border-gray-200 w-full md:w-max pr-8">
        <Link href={`/shop/${shop.shop_id}`} className="w-20 h-20 rounded-full">
          <Image
            alt="avatar-shop"
            src={shop.shop_avatar || "/login.png"}
            width={80}
            height={80}
            className="rounded-full border border-private w-20 h-20"
          />
        </Link>
        <div className="space-y-2">
          <div className="flex flex-col">
            <h3 className="text-gray-700">{shop.shop_userName}</h3>
            <span className="text-sm text-gray-500">Online 3 Giờ Trước</span>
          </div>
          <div className="flex items-center gap-2">
            <ButtonChat shopId={shop.shop_id} />
            <Link href={`/shop/${shop.shop_id}`}>
              <Button className="" variant={"outline"}>
                Xem Shop
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 flex-1 gap-x-12 gap-y-4">
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Đánh Giá</label>
          <span className="text-private line-clamp-1">
            {shop.totalcommentcount}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Tham Gia</label>
          <span className="text-private line-clamp-1">
            {formatDistanceToNow(new Date(shop.shop_createdAt), {
              addSuffix: true,
              locale: vi,
            })}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Sản Phẩm</label>
          <span className="text-private line-clamp-1">
            {+shop.productcount}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Người Theo Dõi</label>
          <span className="text-private line-clamp-1">
            {+shop.followerscount}
          </span>
        </div>
        <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
          <label className="line-clamp-1">Yêu thích sản phẩm</label>
          <span className="text-private line-clamp-1">
            {+shop.totallikecount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoShop;
