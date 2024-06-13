import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ProductAttribute } from "@/lib/interface";

const TypeProduct = ({
  product,
  handleAddSize,
  attribute,
  handleMouseLeave,
  handleMouseEnter,
}: {
  product: ProductAttribute;
  handleAddSize: (product: ProductAttribute) => void;
  handleMouseLeave: (id: number, image: string) => void;
  handleMouseEnter: (id: number, image: string) => void;
  attribute: ProductAttribute | null;
}) => {
  return (
    <div
      className={cn([
        "border py-1 px-4 flex items-center gap-2 text-sm cursor-pointer hover:border-private hover:bg-private/10",
        attribute?.id === product.id ? "border-private bg-private/10" : "",
      ])}
      onClick={() => handleAddSize(product)}
      onMouseEnter={() => handleMouseEnter(product.id, "")}
      onMouseLeave={() => handleMouseLeave(product.id, "")}
    >
      <Image
        alt="thumb_product"
        src={product.picture}
        width={30}
        height={30}
        className="border w-8 h-8"
      />
      <span>{product.material}</span>-<span>{product.size}</span>
    </div>
  );
};

export default TypeProduct;
