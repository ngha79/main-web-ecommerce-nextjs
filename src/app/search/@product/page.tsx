import React from 'react'
import Search from '../../../components/search/search'
import { BrandProduct } from '@/lib/interface'
import Products from '../../../components/search/products'
import productApiRequest from '@/apiRequests/product'

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { search: string }
}) => {
  const { search } = searchParams

  return {
    title: `${search} | Mua ngay | ShopDev`,
    description: 'Mua ngay | ShopDev',
  }
}

const Page = async ({
  searchParams,
}: {
  searchParams: {
    search: string
    sortBy: 'ctime' | 'price' | 'sales'
    page: number
    orderBy: 'ASC' | 'DESC'
    brand: BrandProduct
  }
}) => {
  try {
    const products = await productApiRequest.handleSearchProduct({
      search: searchParams.search,
      limit: 10,
      page: searchParams.page | 1,
      brand: searchParams.brand,
      searchBy: searchParams.sortBy,
      order: searchParams.orderBy,
    })
    return (
      <div className="flex flex-col gap-4 relative">
        <Search param={searchParams} />
        <Products result={products.payload} />
      </div>
    )
  } catch (error) {
    return (
      <div className="flex items-center justify-center h-52">
        Có lỗi xảy ra vui lòng thử lại sau
      </div>
    )
  }
}

export default Page
