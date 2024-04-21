import Products from '@/components/search/products'
import React, { Suspense } from 'react'
import Search from './_components/Search'
import { BrandProductType, ListCategory } from '@/lib/interface'
import { slugToStringCategory } from '@/utils/function'
import { notFound } from 'next/navigation'
import productApiRequest from '@/apiRequests/product'

const Page = async ({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: {
    search: string
    sortBy: 'ctime' | 'price' | 'sales'
    page: number
    orderBy: 'ASC' | 'DESC'
  }
}) => {
  const brand = slugToStringCategory(decodeURIComponent(params.category))
  if (!BrandProductType.includes(brand)) return notFound()
  try {
    const response = await productApiRequest.handleSearchProduct({
      search: searchParams.search || '',
      limit: 10,
      page: searchParams.page || 1,
      brand: ListCategory[brand],
      searchBy: searchParams.sortBy,
      order: searchParams.orderBy,
    })
    return (
      <div className="flex flex-col gap-4 relative container py-4">
        <Search param={searchParams} />
        <Products result={response.payload} />
      </div>
    )
  } catch (error) {
    throw new Error(error.payload.message)
  }
}

export default Page
