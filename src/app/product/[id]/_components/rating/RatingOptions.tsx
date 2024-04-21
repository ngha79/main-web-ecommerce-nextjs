'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import React, { useState } from 'react'
import ListRating from './ListRating'
import Pagination from './Pagination'
import productApiRequest from '@/apiRequests/product'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'

enum RatingEnum {
  ALL = 0,
  Star5 = 5,
  Star4 = 4,
  Star3 = 3,
  Star2 = 2,
  Star1 = 1,
}

interface IListPage {
  page: number | null
  lastPage: number | null
  nextPage: number | null
  prevPage: number | null
}

const RatingOptions = ({
  listReview,
  rating,
}: {
  listReview: any
  rating: [{ rating: number; count: number }]
}) => {
  const params = useParams()
  const productId = params.id as string
  const [isSelected, setIsSelected] = useState<number>(0)
  const [listRating, setListRating] = useState<any[]>(listReview.data || [])
  const [listPage, setListPage] = useState<IListPage>({
    page: 1,
    lastPage: listReview.lastPage,
    nextPage: listReview.nextPage,
    prevPage: listReview.prevPage,
  })
  const totalReview = rating?.reduce((total, item) => (total += item.count), 0)
  const ratingAverage =
    rating?.reduce((total, item) => (total += item.count * item.rating), 0) /
    totalReview
  const handleAddComment = (comment: any) => {
    setListRating((listRating) => [comment, ...listRating])
  }

  const handleSetRatingShow = (type: number) => {
    setIsSelected(type)
    listReviewProduct({ page: 1, rating: type })
  }

  const handleSetPage = (page: number) => {
    setListPage((listPage) => ({ ...listPage, page: page }))
    listReviewProduct({ page, rating: isSelected })
  }

  async function listReviewProduct({
    page,
    rating,
  }: {
    page: number
    rating: number
  }) {
    try {
      const { payload } = await productApiRequest.getListReviewProduct({
        limit: 20,
        page: page || 1,
        rating: rating ? rating : null,
        order: 'recent',
        productId: productId,
      })
      setListPage((listPage) => ({
        ...listPage,
        lastPage: payload.lastPage,
        nextPage: payload.nextPage,
        prevPage: payload.prevPage,
      }))
      setListRating(payload.data || [])
    } catch (error) {
      setListRating([])
      toast.error('Có lỗi xảy ra khi lấy đánh giá của sản phẩm.')
    }
  }

  return (
    <div className="flex flex-col gap-8 bg-white shadow-login rounded-md w-full h-max p-4">
      <div className="flex items-center flex-wrap gap-12 justify-center bg-private/10 rounded-md p-4">
        <div className="space-y-2 p-2">
          <div className="text-private gap-x-2 font-medium text-lg flex items-end justify-center">
            <h3 className="text-3xl">{+ratingAverage.toFixed(1) || 0}</h3>
            <span>trên</span>
            <span>5</span>
          </div>
          <div className="flex items-center">
            <Star
              fill="#f53d2d"
              color="#f53d2d"
            />
            <Star
              fill="#f53d2d"
              color="#f53d2d"
            />
            <Star
              fill="#f53d2d"
              color="#f53d2d"
            />
            <Star
              fill="#f53d2d"
              color="#f53d2d"
            />
            <Star
              fill="#f53d2d"
              color="#f53d2d"
            />
          </div>
        </div>
        <div className="p-2 flex flex-wrap gap-4">
          <Button
            className={cn([
              'rounded-sm',
              isSelected === RatingEnum.ALL
                ? 'border-private/50 text-private/80'
                : 'border-gray-300',
            ])}
            variant={'outline-destructive'}
            onClick={() => handleSetRatingShow(0)}
          >
            Tất Cả ({totalReview})
          </Button>
          {rating?.map((item) => (
            <Button
              key={item.rating}
              className={cn([
                'rounded-sm',
                isSelected === item.rating
                  ? 'border-private/50 text-private/80'
                  : 'border-gray-300',
              ])}
              variant={'outline-destructive'}
              onClick={() => handleSetRatingShow(item.rating)}
            >
              {item.rating} Sao ({item.count})
            </Button>
          ))}
        </div>
      </div>
      <ListRating
        listRating={listRating}
        handleAddComment={handleAddComment}
      />
      <Pagination
        listPage={listPage}
        handleSetPage={handleSetPage}
      />
    </div>
  )
}

export default RatingOptions
