import React from "react";
import Image from "next/image";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

import shopApiRequest from "@/apiRequests/shop";
import Follow from "./Follow";
import { notFound } from "next/navigation";

const InfoShop = async ({ params }: { params: { id: string } }) => {
  const response = await shopApiRequest.getShopById(params.id);
  const shop = response.payload;
  if (!shop) notFound();
  return (
    <div className="relative bg-background mt-16 shadow-login rounded-md">
      <div className="w-full relative">
        {/* <AspectRatio ratio={16 / 6} className="bg-background rounded-md"> */}
        <Image
          src={shop?.shop_background || "/login.png"}
          alt="Image"
          fill
          className="rounded-md object-cover"
        />

        {/* </AspectRatio> */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur p-3">
          <div className="w-32 h-32 md:w-40 md:h-40 relative shadow-lg rounded-full overflow-hidden border cursor-pointer bg-background flex items-center justify-center">
            <Image alt="avatar" src={shop?.shop_avatar || "/login.png"} fill />
          </div>
        </div>
      </div>
      <div className="pt-20">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11">
          <h3 className="pb-1.5 mt-4 text-2xl font-medium">
            {shop?.shop_userName}
          </h3>
          <div className="flex items-center max-w-64 mx-auto justify-start text-sm gap-2 font-medium">
            <span className="w-20 text-end">Email:</span>
            <span>{shop?.shop_email}</span>
          </div>
          <div className="mx-auto mb-5 mt-4 text-sm font-medium grid max-w-96 grid-cols-4 rounded-md border border-slate-300 py-2.5 shadow-md">
            <div className="border-r px-2 line-clamp-1">
              {+shop?.productCount} Sản phẩm
            </div>
            <div className="border-r px-2 line-clamp-1 ">
              {+shop?.followersCount} Followers
            </div>
            <div className="border-r px-2 line-clamp-1 ">
              {+shop?.totalCommentCount} Đánh giá
            </div>
            <div className="px-2 line-clamp-1 ">
              {+shop?.totalLikeCount} Lượt thích
            </div>
          </div>
          <div className="flex items-center justify-center max-w-64 mx-auto gap-6 font-medium">
            <span className="w-20 text-end">Tham Gia:</span>
            <span className="text-destructive">
              {formatDistanceToNow(new Date(shop?.shop_createdAt), {
                addSuffix: true,
                locale: vi,
              })}
            </span>
          </div>
          <Follow shopId={shop.shop_id} />
          {shop?.shop_description ? (
            <div className="flex justify-center py-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: shop.shop_description,
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InfoShop;
