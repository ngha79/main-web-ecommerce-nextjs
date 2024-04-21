'use client'

import wishlistApiRequest from '@/apiRequests/wishlist'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const DeleteProductWishlist = ({ id }: any) => {
  const router = useRouter()

  const handleDeleteProductWishlist = async () => {
    try {
      await wishlistApiRequest.removeProductWishList({ ids: [id] })
      router.refresh()
    } catch (error) {
      toast.error('Có lỗi xảy ra vui lòng thử lại sau.')
    }
  }
  return (
    <Button
      variant={'destructive'}
      onClick={handleDeleteProductWishlist}
    >
      Xóa
    </Button>
  )
}

export default DeleteProductWishlist
