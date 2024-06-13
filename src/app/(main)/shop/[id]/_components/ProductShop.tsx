import productApiRequest from "@/apiRequests/product";
import Product from "@/components/product/Product";
import Pagination from "@/components/search/pagination";
import React, { Suspense } from "react";

interface TypeColumnInterface {
  [key: string]: string;
}

export const TypeBrandProduct: TypeColumnInterface = {
  all: "",
  fashion: "Thời trang",
  footwear: "Giày dép",
  books: "Sách",
  electronics: "Thiết bị điện tử",
  beauty: "Sắc đẹp",
  health: "Sức khỏe",
  toys: "Đồ chơi",
  petcare: "Chăm sóc thú cưng",
};

const ProductShop = async ({
  shopId,
  searchParams,
}: {
  shopId: string;
  searchParams: {
    search: string;
    sortBy: "ctime" | "price" | "sales";
    page: number;
    orderBy: "asc" | "desc";
    brand: string;
  };
}) => {
  let products = null;
  try {
    const response = await productApiRequest.handleSearchProduct({
      search: searchParams.search || "",
      limit: 10,
      page: searchParams.page || 1,
      brand: TypeBrandProduct[searchParams.brand],
      searchBy: searchParams.sortBy,
      order: searchParams.orderBy,
      shopId: shopId,
    });

    products = response.payload;
  } catch (error) {}
  return (
    <div className="space-y-4">
      <div className="grid max-[375px]:grid-cols-1 max-sm:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products?.data?.map((product: any) => (
          <Product product={product} className="" key={product.id} />
        ))}
      </div>
      {!products?.data?.length ? (
        <div className="flex items-center justify-center h-60">
          Không tìm thấy sản phẩm
        </div>
      ) : null}
      {products?.lastPage ? (
        <Suspense>
          <Pagination totalPage={products?.lastPage} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default ProductShop;
