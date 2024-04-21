import Product from '@/components/product/Product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Product as IProduct } from '@/lib/interface'
import React from 'react'

const TopProduct = ({ topProducts }: { topProducts: IProduct[] }) => {
  return (
    <div className="w-full bg-white rounded-md shadow-login p-4 gap-4">
      <h3 className="text-base md:text-lg text-gray-700 font-medium pb-2">
        Top Sản Phẩm Nổi Bật
      </h3>
      <div className="flex md:flex-col gap-4">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {topProducts?.map((product: IProduct, index: number) => (
              <CarouselItem
                key={index}
                className="pt-1 max-[375px]:basis-full basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Product
                  product={product}
                  className="hover:translate-y-0"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </div>
    </div>
  )
}

export default TopProduct
