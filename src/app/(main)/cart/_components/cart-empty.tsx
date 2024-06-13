import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const CartEmpty = () => {
  return (
    <div className="h-80 text-lg flex items-center justify-center flex-col gap-8">
      <span>Bạn chưa thêm sản phẩm nào vào giỏ hàng</span>
      <Link
        href={"/shopping"}
        className={cn([buttonVariants({ variant: "primary" })])}
      >
        Mua hàng
      </Link>
    </div>
  );
};

export default CartEmpty;
