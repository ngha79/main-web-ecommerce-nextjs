import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteProductWishlist from "./delete-product-wishlist";
import { slugCategory } from "@/utils/function";

const Product = ({ product, id }: { product: any; id: number }) => {
  const { picture, name, sold, brand, price, isPublish } = product;
  const firstImage = picture?.[0]?.product_image_url;
  const categorySlug = slugCategory(brand);

  return (
    <div className="flex flex-wrap relative justify-between w-full items-center rounded-md bg-background shadow-md p-4">
      <div className="flex items-center gap-2">
        <div className="w-32 h-32 flex items-center justify-center">
          <Image
            alt="Image"
            src={firstImage}
            width={80}
            height={80}
            className="max-w-32 border rounded-md max-h-32 w-auto h-auto"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={`/product/${product.id}`}
            className="line-clamp-2 hover:underline max-w-40 font-medium text-lg"
          >
            {name}
          </Link>
          <div className="text-sm text-gray-700 space-x-1">
            <span>Đã bán:</span>
            <span>{sold}</span>
          </div>
          <div className="text-sm text-gray-700 space-x-1">
            <span>Danh mục:</span>
            <Link
              href={`/category/${categorySlug}`}
              className="text-sm text-gray-700"
            >
              {brand}
            </Link>
          </div>
        </div>
      </div>
      <div className="grid justify-end grid-rows-2 grid-cols-1 w-full">
        <div className="flex items-center justify-end gap-2 text-gray-700">
          <span className="text-sm w-max">Giá sản phẩm:</span>
          <span className="text-lg font-medium">
            {price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="flex items-center flex-wrap justify-end gap-2">
          <DeleteProductWishlist id={id} />
          <Link
            href={`/product/${product.id}`}
            className={cn([buttonVariants({ variant: "primary" })])}
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
      {!isPublish && (
        <div className="absolute top-0 left-0 w-full gap-2 h-full flex flex-col items-center justify-center backdrop-blur-md">
          <h2 className="text-lg font-medium drop-shadow-sm">
            Sản phẩm không còn hoạt động
          </h2>
          <DeleteProductWishlist id={id} />
        </div>
      )}
    </div>
  );
};

export default Product;
