"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import HoverCard from "./HoverCartProduct";
import { Product as IProduct } from "@/lib/interface";
import { Star } from "lucide-react";

const Product = ({
  product,
  className,
}: {
  product: IProduct;
  className: string;
}) => {
  return (
    <Link
      href={`/product/${product?.id}`}
      className={cn([
        "flex flex-col h-full shadow-md group bg-white hover:bg-white/90 hover:shadow-login hover:border-gray-200 border border-transparent duration-300 cursor-pointer rounded-md relative",
        className ? "" : "hover:-translate-y-2",
      ])}
    >
      <HoverCard productId={product.id} />
      <div className="h-64 lg:h-72 flex items-center justify-center">
        <Image
          alt="thumb"
          src={product?.picture?.[0].product_image_url || "/login.png"}
          width={120}
          height={120}
          className="w-full rounded-md h-auto max-h-64 lg:max-h-72"
        />
      </div>
      <div className="flex flex-col p-2 gap-y-2">
        <span className="line-clamp-2 hover:underline text-gray-700 text-sm">
          {product?.name}
        </span>
        <div className="flex items-center justify-start gap-0.5 text-yellow-300">
          <Star size={12} fill="#fcd34d" />
          <Star size={12} fill="#fcd34d" />
          <Star size={12} fill="#fcd34d" />
          <Star size={12} fill="#fcd34d" />
          <Star size={12} fill="#fcd34d" />
        </div>
        <span className="text-lg font-semibold">
          {product?.price.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        <span className="text-sm text-gray-500">Đã bán: {product?.sold}</span>
      </div>
    </Link>
  );
};

export default Product;
