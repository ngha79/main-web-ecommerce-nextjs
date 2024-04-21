import { Checkbox } from '@/components/ui/checkbox'
import { MessageSquareText, Store } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductCart from './product-cart'
import { CartItem } from '@/lib/interface'

const ShopCart = ({
  cartItem,
  listCartCheckout,
  handleSetProductCartShop,
  handleSetProductCartProduct,
}: {
  cartItem: CartItem
  listCartCheckout: number[]
  handleSetProductCartShop: (e: boolean, id: string) => void
  handleSetProductCartProduct: (id: number) => void
}) => {
  const [isSelectAll, setSelectAll] = useState(false)

  const handleSetShopCart = (e: boolean, shopId: string) => {
    setSelectAll(e)
    handleSetProductCartShop(e, shopId)
  }

  useEffect(() => {
    const isListCheck: boolean[] = []
    cartItem.products.forEach((product) => {
      if (listCartCheckout.includes(product.productAttribute.id)) {
        isListCheck.push(true)
      } else {
        isListCheck.push(false)
      }
    })
    setSelectAll(isListCheck.includes(false) ? false : true)
  }, [cartItem.products, handleSetProductCartProduct, listCartCheckout])
  return (
    <div
      className="bg-white"
      key={cartItem?.shop?.id}
    >
      <div className="flex gap-4 border-b px-8 py-4 items-center">
        <Checkbox
          id="shop"
          checked={isSelectAll}
          onCheckedChange={(e: boolean) =>
            handleSetShopCart(e, cartItem.shop.id)
          }
        />
        <div className="flex gap-2 bg-transparent">
          <Link
            href={`/profile/${cartItem.shop.id}`}
            className="flex items-center gap-2"
          >
            <Store size={18} />
            <span className="text-gray-700 font-medium text-sm">
              {cartItem.shop.userName}
            </span>
          </Link>
          <MessageSquareText
            size={18}
            className="text-red-500"
          />
        </div>
      </div>
      {cartItem.products.map((product) => (
        <ProductCart
          product={product}
          key={product.productAttribute?.id}
          listCartCheckout={listCartCheckout}
          handleSetProductCartProduct={handleSetProductCartProduct}
        />
      ))}
    </div>
  )
}

export default ShopCart
