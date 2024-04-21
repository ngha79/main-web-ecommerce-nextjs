'use client'

import { Checkbox } from '@/components/ui/checkbox'
import ShopCart from './shop-cart'
import TotalCart from './total-cart'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CartItem, ProductCart } from '@/lib/interface'
import { cn } from '@/lib/utils'
import { cartStore } from '@/utils/store/store'

export default function FormCart() {
  const cart = cartStore((state) => state.cart)
  const [listCartCheckout, setListCartCheckout] = useState<number[]>([])
  const [isSelectAll, setSelectAll] = useState<boolean>(false)
  const totalCartItem = cart?.cartItems?.reduce(
    (current: number, item: any) => item.products.length + current,
    0
  )

  const handleUpdate = (list: number[] | ((prev: number[]) => number[])) => {
    setListCartCheckout(list)
  }

  const handleSetAllProductCheckout = (e: boolean) => {
    const cartItems = cart?.cartItems
    if (e) {
      let newList: number[] = []
      cartItems?.forEach((item: CartItem) => {
        return newList.push(
          ...item.products.map(
            (product: ProductCart) => product.productAttribute.id
          )
        )
      })
      handleUpdate(newList)
    } else {
      handleUpdate([])
    }
  }

  const handleSetProductCartProduct = (id: number) => {
    const existInList = listCartCheckout.includes(id)
    const newArrayList = existInList
      ? [...listCartCheckout.filter((product) => product !== id)]
      : (prev: number[]) => [...prev, id]
    handleUpdate(newArrayList)
  }

  function addAndRemoveElements(
    mainArray: number[],
    elementsToAdd: number[] | undefined,
    elementsToRemove: number[] | undefined
  ) {
    // Thêm mảng elementsToAdd vào mainArray
    if (elementsToAdd) {
      mainArray.push(...elementsToAdd)
    }
    // Xóa các phần tử có trong mảng elementsToRemove khỏi mainArray
    if (elementsToRemove) {
      elementsToRemove.forEach((element) => {
        const index = mainArray.indexOf(element)
        if (index !== -1) {
          mainArray.splice(index, 1)
        }
      })
    }
    return mainArray
  }

  const handleSetProductCartShop = (e: boolean, id: string) => {
    const shop = cart?.cartItems?.find((item: CartItem) => item.shop.id === id)
    const listCart = shop?.products.map(
      (product: any) => product.productAttribute.id
    )
    let newArray = e
      ? addAndRemoveElements(listCartCheckout, listCart, [])
      : addAndRemoveElements(listCartCheckout, [], listCart)
    setListCartCheckout([...newArray])
  }

  useEffect(() => {
    setSelectAll(listCartCheckout.length === totalCartItem)
  }, [listCartCheckout, totalCartItem])

  return (
    <div className="flex flex-col gap-4">
      {!cart?.cartItems?.length ? (
        <div className="h-80 text-lg flex items-center justify-center flex-col gap-8">
          <span>Bạn chưa thêm sản phẩm nào vào giỏ hàng</span>
          <Link
            href={'/shopping'}
            className={cn([buttonVariants({ variant: 'primary' })])}
          >
            Mua hàng
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center bg-white px-8 py-2 w-full">
            <div className="flex items-center gap-4 w-1/2">
              <Checkbox
                id="all"
                onCheckedChange={handleSetAllProductCheckout}
                checked={isSelectAll}
              />
              <span className="w-full text-sm">Sản Phẩm</span>
            </div>
            <div className="md:flex items-center hidden w-1/2 gap-4 text-sm text-gray-500">
              <span className="w-1/4 text-center">Đơn Giá</span>
              <span className="w-1/4 text-center">Số Lượng</span>
              <span className="w-1/4 text-center">Số Tiền</span>
              <span className="w-1/4 text-center">Thao Tác</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {cart?.cartItems?.map((item: CartItem) => (
              <ShopCart
                cartItem={item}
                listCartCheckout={listCartCheckout}
                handleSetProductCartShop={handleSetProductCartShop}
                handleSetProductCartProduct={handleSetProductCartProduct}
                key={item.shop.id}
              />
            ))}
          </div>
          <TotalCart
            cart={cart}
            listCartCheckout={listCartCheckout}
            isSelectAll={isSelectAll}
            handleSetAllProductCheckout={handleSetAllProductCheckout}
          />
        </>
      )}
    </div>
  )
}
