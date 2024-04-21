'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { SelectPrice } from './select-price'
import { SelectBrand } from './select-brand'
import { BrandProduct } from '@/lib/interface'

const Search = ({
  param,
}: {
  param: {
    search: string
    sortBy: 'ctime' | 'price' | 'sales'
    page: number
    orderBy: 'ASC' | 'DESC'
    brand: BrandProduct
  }
}) => {
  const router = useRouter()
  const { search, sortBy, page, orderBy, brand } = param
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSetSort = (sort: string, order?: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sortBy', sort)
    if (sort === 'price' && order) {
      params.set('orderBy', order)
    } else {
      params.delete('orderBy')
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  const handleSetBrand = (type: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('brand', type)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }
  return (
    <div className="bg-background rounded-md shadow-login px-4 py-2 gap-4 flex items-center flex-wrap sticky top-32 left-0 z-[1]">
      <span>Sắp xếp theo</span>
      <Button
        variant={
          sortBy
            ? sortBy !== 'ctime'
              ? 'default'
              : 'destructive'
            : 'destructive'
        }
        className={cn([
          sortBy && sortBy !== 'ctime'
            ? 'bg-background border hover:bg-gray-200 text-gray-800 hover:text-gray-700'
            : '',
        ])}
        onClick={() => handleSetSort('ctime')}
      >
        Mới nhất
      </Button>
      <Button
        variant={sortBy === 'sales' ? 'destructive' : 'default'}
        className={cn([
          sortBy !== 'sales'
            ? 'bg-background border hover:bg-gray-200 text-gray-800 hover:text-gray-700'
            : '',
        ])}
        onClick={() => handleSetSort('sales')}
      >
        Bán chạy
      </Button>
      <SelectPrice
        handleSetSort={handleSetSort}
        sortBy={sortBy}
        orderBy={orderBy}
      />
      <SelectBrand
        handleSetBrand={handleSetBrand}
        brand={brand}
      />
    </div>
  )
}

export default Search
