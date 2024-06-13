import React from "react";
import { ChevronRight } from "lucide-react";

import Product from "./Product";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Product as IProduct } from "@/lib/interface";

const ProductSuggest = ({ products }: any) => {
  return (
    <div
      className={cn([
        "space-y-4 w-full",
        products?.data?.length ? "" : "hidden",
      ])}
    >
      <div className="flex items-center justify-between bg-background rounded-md py-2 px-4">
        <h1 className="text font-medium text-gray-700">
          Có thể bạn cũng thích
        </h1>
        <Button variant={"link"} className="text-red-500">
          Xem tất cả <ChevronRight size={20} />
        </Button>
      </div>
      {products ? (
        <div className="grid max-[375px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {products.data?.map((product: IProduct) => (
            <Product className="" key={product.id} product={product} />
          ))}
        </div>
      ) : null}
      <div className="flex justify-center">
        <Button variant={"primary"}>Xem thêm</Button>
      </div>
    </div>
  );
};

export default ProductSuggest;
