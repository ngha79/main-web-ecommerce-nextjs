import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Product from './Product'
import { Product as IProduct } from '@/lib/interface'
import { cn } from '@/lib/utils'
import productApiRequest from '@/apiRequests/product'

const ProductSuggest = async () => {
  try {
    const { payload: products } = await productApiRequest.handleSearchProduct({
      limit: 20,
      page: 1,
      search: '',
    })
    return (
      <div
        className={cn([
          'space-y-4 w-full',
          products?.data?.length ? '' : 'hidden',
        ])}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-700">
            CÓ THỂ BẠN CŨNG THÍCH
          </h1>
          <Button
            variant={'link'}
            className="text-red-500"
          >
            Xem tất cả <ChevronRight size={20} />
          </Button>
        </div>
        {products ? (
          <div className="grid max-[375px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {products.data?.map((product: IProduct) => (
              <Product
                className=""
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  } catch (error) {
    return null
  }
}

export default ProductSuggest
