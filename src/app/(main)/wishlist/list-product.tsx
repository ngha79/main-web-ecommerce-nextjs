"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Product from "./product";
import { IResponsePagination } from "@/utils/types/response-pagination";
import http, { HttpError } from "@/lib/http";
import wishlistApiRequest from "@/apiRequests/wishlist";
import { toast } from "sonner";
import { ResponseExceptions } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const ListProduct = ({
  products,
  page,
}: {
  products: any;
  page: number | null | undefined;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [productWishlists, setProductWishlists] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<number | null | undefined>(page);
  const [isLoading, startLoading] = useTransition();

  const handleFetch = useCallback(() => {
    if (isLoading || !nextPage) return;
    startLoading(async () => {
      try {
        const res = await wishlistApiRequest.getWishlist({
          page: nextPage,
          search: "",
          limit: 20,
        });
        setProductWishlists((prev) => [...prev, ...res.payload.data]);
        setNextPage(res.payload.nextPage);
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  }, [isLoading, nextPage, setProductWishlists]);

  useEffect(() => {
    if (inView && nextPage) {
      handleFetch();
    }
  }, [inView, nextPage]);

  return (
    <div className="flex flex-col gap-4 flex-1">
      {products?.map((item: any) => (
        <Product product={item.product} id={item.id} key={item.id} />
      ))}
      {productWishlists?.map((item: any) => (
        <Product product={item.product} id={item.id} key={item.id} />
      ))}
      <div ref={ref}>
        {isLoading ? (
          <div className="flex items-center justify-center pt-8">
            <div
              className="inline-block text-gray-700 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ListProduct;
