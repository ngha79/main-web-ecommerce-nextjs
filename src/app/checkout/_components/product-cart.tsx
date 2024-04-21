'use client'

import { useMemo } from 'react'
import { CheckOut } from '@/lib/interface'
import Shop from './shop'

const ProductCart = ({ checkout }: { checkout: CheckOut | undefined }) => {
  const totalProduct = useMemo(() => {
    const totalProduct = checkout?.shop_order_ids_new.reduce(
      (total, shop) => total + shop.item_products.length,
      0
    )
    return totalProduct
  }, [checkout])
  return (
    <div className="flex flex-col bg-background rounded-md shadow-login">
      <div className="grid grid-cols-7 text-gray-500 p-4">
        <span className="col-span-3 text-start font-medium text-foreground">
          Sản phẩm
        </span>
        <span className="col-span-1 text-center text-sm line-clamp-1">
          Đơn Giá
        </span>
        <span className="col-span-1 text-center text-sm line-clamp-1">
          Số Lượng
        </span>
        <span className="col-span-2 text-end text-sm line-clamp-1">
          Thành tiền
        </span>
      </div>
      <div>
        {checkout?.shop_order_ids_new?.map((shop) => (
          <Shop
            key={shop.shop.id}
            shop={shop.shop}
            productItems={shop.item_products}
            discount={shop.shop_discounts}
          />
        ))}
      </div>
      <div className="flex justify-end gap-4 items-center p-4">
        <span className="text-xs text-gray-500">
          Tổng số tiền ({totalProduct} sản phẩm):
        </span>
        <span className="text-lg text-destructive">
          {checkout?.checkout_order?.totalCheckout?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </div>
    </div>
  )
}

export default ProductCart
