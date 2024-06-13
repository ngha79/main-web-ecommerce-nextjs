import React from "react";

import InfoShop from "./_components/InfoShop";
import Search from "@/components/search/search";
import { BrandProduct } from "@/lib/interface";
import ProductShop from "./_components/ProductShop";
import VouchersShop from "./_components/VouchersShop";
import ProductSuggest from "./_components/ProductSuggest";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    search: string;
    sortBy: "ctime" | "price" | "sales";
    page: number;
    orderBy: "asc" | "desc";
    brand: BrandProduct;
  };
}) => {
  return (
    <section className="container py-4 space-y-4">
      <InfoShop params={params} />
      <VouchersShop params={params} />
      <ProductSuggest params={params} />
      <Search param={searchParams} />
      <ProductShop searchParams={searchParams} shopId={params.id} />
    </section>
  );
};

export default Page;
