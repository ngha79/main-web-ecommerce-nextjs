import { Button, buttonVariants } from "@/components/ui/button";
import { IProductItems, IShopCheckout } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddVoucher from "./add-voucher";

const Shop = ({ shop, productItems, discount }: IShopCheckout) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b px-6 border-gray-300 text-sm py-2">
        <Link
          href={`/shop/${shop?.id}`}
          className="pr-4 border-r border-gray-400"
        >
          {shop?.userName}
        </Link>
        <Link
          href={`/shop/${shop?.id}`}
          className={cn([
            buttonVariants({ variant: "ghost" }),
            "text-green-500 hover:text-green-600",
          ])}
        >
          <MessageCircle size={20} />
          Chat ngay
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {productItems?.map((product: IProductItems, index: number) => {
          const {
            productAttribute,
            quantity,
            total_price,
            total_price_apply,
            price,
          } = product;
          console.log(product);
          return (
            <div
              className="grid grid-cols-7 py-4 px-6 justify-center items-center hover:bg-gray-100"
              key={index}
            >
              <div className="flex items-center gap-2 col-span-3">
                <Image
                  alt="logo-product"
                  src={"/login.png"}
                  width={60}
                  height={60}
                  className="border"
                />
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-2 font-medium max-w-40">
                    {productAttribute?.product?.name}
                  </span>
                  <span className="text-xs line-clamp-1">
                    {productAttribute?.material}
                  </span>
                  <span className="text-xs line-clamp-1">
                    {productAttribute?.size}
                  </span>
                </div>
              </div>
              <div className="text-sm text-center">
                {productAttribute?.product?.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="text-sm text-center">{quantity}</div>
              <div className="text-sm col-span-2 gap-x-2 flex items-center justify-end">
                {total_price && total_price_apply && (
                  <>
                    <span className="text-xs line-through text-gray-500">
                      {total_price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <span className="text-red-500">
                      {Number(total_price - total_price_apply)?.toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </span>
                  </>
                )}
                {price && (
                  <span className="text-red-500">
                    {Number(price * quantity)?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2 border-y border-gray-300 text-xs flex justify-end gap-12 items-center">
        <span>Voucher của Shop</span>
        <span>{discount}</span>
        <AddVoucher shopId={shop.id} />
      </div>
    </div>
  );
};

export default Shop;
