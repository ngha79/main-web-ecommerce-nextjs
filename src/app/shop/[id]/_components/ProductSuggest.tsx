import React from 'react'
import { cn } from '@/lib/utils'
import Product from '@/components/product/Product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import productApiRequest from '@/apiRequests/product'

const ProductSuggest = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  try {
    const { payload: products } = await productApiRequest.getProductsShop({
      shopId: id,
      limit: 10,
    })
    return (
      <div
        className={cn([
          'space-y-4 w-full',
          products?.data?.length ? '' : 'hidden',
        ])}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-700">GỢI Ý CHO BẠN</h1>
        </div>
        <div className="px-4">
          {products?.data?.length > 4 ? (
            <Carousel
              opts={{
                align: 'start',
              }}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <CarouselContent>
                {products?.data?.map((product: any) => (
                  <CarouselItem
                    key={product.id}
                    className="pt-1 basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <Product
                      product={product}
                      className={'hover:-translate-y-0'}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-8" />
              <CarouselNext className="-right-4 md:-right-8" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products?.data?.map((product: any) => (
                <Product
                  key={product.id}
                  product={product}
                  className={'hover:-translate-y-0'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    return null
  }
}

export default ProductSuggest
