import { Product as IProduct } from '@/lib/interface'
import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Product from './Product'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

const ProductCarousel = ({
  title,
  products,
  link,
}: {
  title: string
  products: IProduct[]
  link: string
}) => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-gray-700 uppercase">{title}</h1>
        <Link href={link}>
          <Button
            variant={'link'}
            className="text-red-500"
          >
            Xem tất cả <ChevronRight size={20} />
          </Button>
        </Link>
      </div>
      {products?.length > 4 ? (
        <Carousel
          opts={{
            align: 'start',
          }}
          className="bg-white p-4"
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem
                key={index}
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
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              className={'hover:-translate-y-0'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCarousel
