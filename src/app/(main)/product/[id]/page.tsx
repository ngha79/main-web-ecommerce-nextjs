import React from "react";
import InfoShop from "./_components/InfoShop";
import InfoProduct from "./_components/InfoProduct";
import ProductDescription from "./_components/ProductDescription";
import Directory from "./_components/Directory";
import CouponShop from "./_components/CouponShop";
import TopProduct from "./_components/TopProduct";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductSuggest from "@/components/product/ProductSuggest";
import Rating from "./_components/rating/Rating";
import { Product as IProduct } from "@/lib/interface";
import { notFound } from "next/navigation";
import productApiRequest from "@/apiRequests/product";
import shopApiRequest from "@/apiRequests/shop";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  try {
    const { payload }: any = await productApiRequest.getDetail(id);
    return {
      title: `${payload.brand} | ${payload.name}`,
      description: payload.brand,
    };
  } catch (error) {
    return {
      title: "Có lỗi xảy ra | Mua ngay | ShopDev",
      description: "Có lỗi xảy ra | Mua ngay | ShopDev",
    };
  }
};

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const { payload: product }: any = await productApiRequest.getDetail(
      params.id
    );
    const { payload: shop }: any = await shopApiRequest.getShopByProduct(
      params.id
    );
    let { payload: products } = await productApiRequest.handleSearchProduct({
      page: 1,
      limit: 5,
      search: "",
      shopId: shop.id,
      ids: [product?.id],
      searchBy: "sale",
    });
    let ListTopProducts: IProduct[] = products.data;
    const otherProducts = ListTopProducts?.map((product) => product.id) || [];
    let { payload: searchProduct } =
      await productApiRequest.handleSearchProduct({
        page: 1,
        limit: 10,
        search: "",
        shopId: shop.id,
        ids: [product?.id, ...otherProducts],
      });
    return (
      <section className="flex flex-col container gap-4 py-4">
        <Directory product={product} />
        <InfoProduct product={product} shop={shop} />
        <InfoShop shop={shop} />
        <CouponShop shop={shop} />
        {ListTopProducts.length ? (
          <TopProduct topProducts={ListTopProducts} />
        ) : null}
        <ProductDescription product={product} />
        <Rating productId={product.id} />
        {searchProduct?.data?.length ? (
          <ProductCarousel
            title="CÁC SẢN PHẨM KHÁC CỦA SHOP"
            products={searchProduct.data}
            link={`/from-same-shop/${shop.id}/${product.id}`}
          />
        ) : null}
        <ProductSuggest />
      </section>
    );
  } catch (error: any) {
    if (error.status === 404) {
      return notFound();
    }
    throw new Error();
  }
};

export default Page;
