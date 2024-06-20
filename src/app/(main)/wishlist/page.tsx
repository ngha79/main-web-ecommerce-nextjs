import React from "react";
import type { Metadata } from "next";
import ListProduct from "./list-product";
import wishlistApiRequest from "@/apiRequests/wishlist";
import { HttpError } from "@/lib/http";

export const metadata: Metadata = {
  title: "Sản phẩm yêu thích | Mua ngay | ShopDev",
  description: "Sản phẩm yêu thích của bạn | Mua ngay | ShopDev",
};

const WishlistPage = async () => {
  let wishlistResponse = null;
  try {
    const response = await wishlistApiRequest.getWishlist({
      page: 1,
      search: "",
      limit: 20,
    });
    wishlistResponse = response.payload;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
  }

  return (
    <div className="min-h-[750px] flex flex-col gap-4 h-full p-4 container">
      {!wishlistResponse?.data.length ? (
        <div className="flex items-center justify-center flex-1">
          <span>Bạn chưa thêm sản phẩm yêu thích nào</span>
        </div>
      ) : (
        <ListProduct
          products={wishlistResponse.data}
          page={wishlistResponse?.nextPage}
        />
      )}
    </div>
  );
};

export default WishlistPage;
