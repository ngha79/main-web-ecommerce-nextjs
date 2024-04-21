import React from 'react'
import RatingOptions from './RatingOptions'
import productApiRequest from '@/apiRequests/product'

const Rating = async ({ productId }: { productId: string }) => {
  try {
    const { payload: review } = await productApiRequest.getListReviewProduct({
      limit: 20,
      page: 1,
      rating: null,
      order: 'recent',
      productId: productId,
    })
    const { payload: rating } = await productApiRequest.getRatingProduct(
      productId
    )
    return (
      <RatingOptions
        listReview={review}
        rating={rating}
      />
    )
  } catch (error) {
    return null
  }
}

export default Rating
