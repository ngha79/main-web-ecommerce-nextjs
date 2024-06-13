import React from "react";
import { BrandProduct } from "@/lib/interface";
import productApiRequest from "@/apiRequests/product";
import Search from "@/components/search/search";
import Products from "@/components/search/products";

export const generateMetadata = async ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => ({
  title: `${search} | Mua ngay | ShopDev`,
  description: "Mua ngay | ShopDev",
});

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  try {
    const { search, sortBy, page = 1, orderBy, brand } = searchParams;
    const products = await productApiRequest.handleSearchProduct({
      search: search || "",
      limit: 10,
      page: page || 1,
      brand,
      searchBy: sortBy,
      order: orderBy,
    });
    console.log(products, searchParams);
    return (
      <div className="flex flex-col gap-4">
        <Search param={searchParams} />
        <Products result={products.payload} />
      </div>
    );
  } catch {
    return (
      <div className="flex items-center justify-center h-52">
        Error occurred, please try again later
      </div>
    );
  }
};

type SearchParams = {
  search: string;
  sortBy: "ctime" | "price" | "sales";
  page: number;
  orderBy: "asc" | "desc";
  brand: BrandProduct;
};

export default Page;
