import Product from "@/components/product/Product";
import React, { Suspense } from "react";
import Pagination from "./pagination";

const Products = async ({ result }: { result: any }) => {
  return (
    <>
      <div className="grid max-[375px]:grid-cols-1 max-sm:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {result?.data?.map((product: any) => (
          <Product product={product} className="" key={product.id} />
        ))}
      </div>
      {!result?.data?.length ? (
        <div className="flex items-center justify-center h-60">
          Không tìm thấy sản phẩm
        </div>
      ) : null}
      <Suspense>
        <Pagination totalPage={result?.lastPage} />
      </Suspense>
    </>
  );
};

export default Products;
