import { getProfileShop, handleSearchProduct } from '@/utils/action'
import { notFound } from 'next/navigation'
import React from 'react'
import InfoShop from './_components/InfoShop'
import VouchersShop from './_components/VouchersShop'
import ProductSuggest from './_components/ProductSuggest'
import Search from '@/components/search/search'
import { BrandProduct } from '@/lib/interface'
import Products from '@/components/search/products'
import shopApiRequest from '@/apiRequests/shop'
import productApiRequest from '@/apiRequests/product'

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: {
    search: string
    sortBy: 'ctime' | 'price' | 'sales'
    page: number
    orderBy: 'ASC' | 'DESC'
    brand: BrandProduct
  }
}) => {
  try {
    const infoShop = await shopApiRequest.getShopById(params.id)

    const products = await productApiRequest.handleSearchProduct({
      search: searchParams.search || '',
      limit: 10,
      page: searchParams.page || 1,
      brand: searchParams.brand,
      searchBy: searchParams.sortBy,
      order: searchParams.orderBy,
      shopId: params.id,
    })
    return (
      <section className="container py-4 space-y-4">
        <InfoShop shop={infoShop.payload} />
        <VouchersShop params={params} />
        {infoShop.payload.shop_description ? (
          <div className="w-full grid justify-center">
            <div
              dangerouslySetInnerHTML={{
                __html: infoShop.payload.shop_description,
              }}
            />
          </div>
        ) : null}
        <ProductSuggest params={params} />
        <Search param={searchParams} />
        <Products result={products.payload} />
      </section>
    )
  } catch (error: any) {
    if (error.status === 404) {
      return notFound()
    }
    return null
  }
}

export default Page
