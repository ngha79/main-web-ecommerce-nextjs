import React from "react";
import Shop from "./shop";
import shopApiRequest from "@/apiRequests/shop";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Product from "./product";
import productApiRequest from "@/apiRequests/product";
import { error } from "console";

const InfoShop = async ({ shopId }: { shopId: string }) => {
  const { payload: infoShop } = await shopApiRequest
    .getShopById(shopId)
    .catch((error) => {
      throw new Error();
    });
  let topProducts = await productApiRequest
    .handleSearchProduct({
      page: 1,
      limit: 5,
      shopId: infoShop.shop_id,
      searchBy: "sales",
      search: "",
      ids: [],
    })
    .catch((error) => {
      throw new Error();
    });
  return (
    <div>
      {infoShop ? (
        <div className="bg-background items-center rounded-md shadow-login gap-y-4 p-4 gap-x-6 flex flex-col">
          <Shop shop={infoShop} />
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {topProducts?.payload?.data?.map(
                (product: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="pt-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <Product
                      product={product}
                      className="hover:translate-y-0"
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      ) : (
        <span className="text-sm text-center py-12 text-gray-600">
          Không tìm thấy kết quả liên quan
        </span>
      )}
    </div>
  );
};

export default InfoShop;
