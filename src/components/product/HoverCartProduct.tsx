'use client'

import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import wishlistApiRequest from '@/apiRequests/wishlist'

// import { QuickView } from './QuickView'

const HoverCard = ({ productId }: { productId: string }) => {
  const handleQuickViewProduct = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      await wishlistApiRequest.addProductToWishlist({
        productId,
      })
      toast.success('Thêm sản phẩm vào danh sách yêu thích thành công.')
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }

  return (
    <div
      onClick={(e) => handleQuickViewProduct(e)}
      className="opacity-0 group-hover:opacity-100 flex flex-col w-max animate-wiggle-out transition-all group-hover:animate-wiggle-in bg-white border rounded-md absolute top-4 right-4 gap-2"
    >
      {/* <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild><QuickView /> </TooltipTrigger>
          <TooltipContent>
            <p>Xem sản phẩm</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Thêm Wishlist</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default HoverCard
