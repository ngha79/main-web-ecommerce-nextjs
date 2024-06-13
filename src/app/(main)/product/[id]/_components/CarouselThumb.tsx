import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'

const CarouselThumb = ({ images }: { images: any[] }) => {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="bg-white p-4"
      >
        <CarouselContent className="w-full">
          {images.map((_: any, index: number) => (
            <CarouselItem
              key={_.id}
              className="pt-1 w-max"
            >
              <Image
                alt="thumb"
                src={_.product_thumb}
                width={80}
                height={80}
                className="border-2 hover:border-private/70 w-20 h-20"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-8" />
        <CarouselNext className="-right-4 md:-right-8" />
      </Carousel>
    </div>
  )
}

export default CarouselThumb
