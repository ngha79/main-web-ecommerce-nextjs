import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Shop from "./_components/shop";
import Product from "./_components/product";
import { Button } from "@/components/ui/button";
import shopApiRequest from "@/apiRequests/shop";
import productApiRequest from "@/apiRequests/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InfoShop from "./_components/info-shop";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) => {
  const { payload: shop } = await shopApiRequest
    .handleSearchShop({
      search: searchParams?.search || "",
      limit: 1,
      page: 1,
    })
    .catch((error) => {
      throw new Error();
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500">
          SHOP LIÊN QUAN ĐẾN &quot;
          <span className="text-destructive uppercase">
            {searchParams.search}
          </span>
          &quot;
        </h3>
        {shop ? (
          <Link href={"/search_user/123"}>
            <Button
              variant={"ghost"}
              className="text-destructive hover:text-destructive/90 text-xs"
            >
              Thêm kết quả <ChevronRight />
            </Button>
          </Link>
        ) : null}
      </div>
      {shop?.data?.length ? <InfoShop shopId={shop.data[0].id} /> : null}
    </div>
  );
};

export default Page;
