import React, { Suspense } from "react";
import type { Metadata } from "next";
import Pagination from "./pagination";
import ListProduct from "./list-product";
import wishlistApiRequest from "@/apiRequests/wishlist";
import { HttpError } from "@/lib/http";

export const metadata: Metadata = {
  title: "Sản phẩm yêu thích | Mua ngay | ShopDev",
  description: "Sản phẩm yêu thích của bạn | Mua ngay | ShopDev",
};

const WishlistPage = async ({
  searchParams: { page = "1", search = "" },
}: {
  searchParams: { page: string; search: string };
}) => {
  let wishlistResponse = null;
  try {
    wishlistResponse = await wishlistApiRequest.getWishlist({
      page,
      search,
      limit: 20,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }

  if (!wishlistResponse?.payload?.data.length) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 h-full p-4 container">
      <ListProduct products={wishlistResponse.payload.data} />
      <Pagination
        listPage={wishlistResponse.payload}
        searchParams={{ page, search }}
      />
    </div>
  );
};

export default WishlistPage;
