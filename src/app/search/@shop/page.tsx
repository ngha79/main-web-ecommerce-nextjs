import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import Shop from './shop'
import Product from './product'
import { Button } from '@/components/ui/button'
import shopApiRequest from '@/apiRequests/shop'
import productApiRequest from '@/apiRequests/product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const Page = async ({
  searchParams,
}: {
  searchParams: {
    search: string
  }
}) => {
  try {
    const { payload: shop } = await shopApiRequest.handleSearchShop({
      search: searchParams.search,
      limit: 1,
      page: 1,
    })

    const { payload: infoShop } = await shopApiRequest.getShopById(
      shop?.data?.[0].id
    )
    let topProducts = await productApiRequest.handleSearchProduct({
      page: 1,
      limit: 5,
      shopId: shop.id,
      searchBy: 'sales',
      search: '',
      ids: [],
    })
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500">
            SHOP LIÊN QUAN ĐẾN &quot;
            <span className="text-destructive uppercase">
              {searchParams.search}
            </span>
            &quot;
          </h3>
          {shop ? (
            <Link href={'/search_user/123'}>
              <Button
                variant={'ghost'}
                className="text-destructive hover:text-destructive/90 text-xs"
              >
                Thêm kết quả <ChevronRight />
              </Button>
            </Link>
          ) : null}
        </div>
        {infoShop ? (
          <div className="bg-background items-center rounded-md shadow-login gap-y-4 p-4 gap-x-6 flex flex-col">
            <Shop shop={infoShop} />
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {topProducts.payload?.data?.map(
                  (product: any, index: number) => (
                    <CarouselItem
                      key={index}
                      className="pt-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <Product
                        product={product}
                        className="hover:translate-y-0"
                      />
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        ) : (
          <span className="text-sm text-center py-12 text-gray-600">
            Không tìm thấy kết quả liên quan
          </span>
        )}
      </div>
    )
  } catch (error) {
    return null
  }
}

export default Page
