import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  getLikeProduct,
  userLikeProduct,
  userUnLikeProduct,
} from '@/utils/actions/product'
import productApiRequest from '@/apiRequests/product'
import { toast } from 'sonner'
import { clientSessionUser } from '@/lib/http'

const LikeProduct = ({
  productId,
  shopId,
}: {
  productId: string
  shopId: string
}) => {
  const [totalLike, setTotalLike] = useState<number>(0)
  const [isLike, setLike] = useState<boolean>(false)

  useEffect(() => {
    const handleGetLikeProduct = async () => {
      try {
        const { payload } = await productApiRequest.getLikeProduct(productId)
        setTotalLike(+payload?.totalLike)
        setLike(payload?.isLike ? true : false)
      } catch (error) {
        setTotalLike(0)
        setLike(false)
      }
    }
    handleGetLikeProduct()
  }, [productId])

  const likeProduct = async () => {
    try {
      await productApiRequest.userLikeProduct(
        productId,
        shopId,
        clientSessionUser.accessToken
      )
      setLike(true)
      setTotalLike(totalLike + 1)
      toast.success('Thích sản phẩm thành công.')
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
    }
  }

  const unLikeProduct = async () => {
    try {
      await productApiRequest.userUnLikeProduct(
        productId,
        clientSessionUser.accessToken
      )
      setLike(false)
      setTotalLike(totalLike - 1)
      toast.success('Bỏ thích sản phẩm thành công.')
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.')
    }
  }

  const handleLikeProduct = () => {
    isLike ? unLikeProduct() : likeProduct()
  }

  return (
    <Button
      variant={'ghost'}
      className="gap-2 w-max"
      onClick={handleLikeProduct}
    >
      <Heart className="text-private" />
      {isLike ? (
        <span>Bạn đã thích ({totalLike})</span>
      ) : (
        <span>Thích sản phẩm ({totalLike})</span>
      )}
    </Button>
  )
}

export default LikeProduct
