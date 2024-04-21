'use client'

import { cartStore } from '@/utils/store/store'
import CartProduct from './CartProduct'
import { Cart as ICart, CartItem } from '@/lib/interface'
import { ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import cartApiRequest from '@/apiRequests/cart'
import { toast } from 'sonner'
import { useAppContext } from '@/app/app-provider'

const IsNotLogin = () => {
  return (
    <div className="h-60 w-full flex justify-center items-center gap-4 flex-col">
      <span className="text-sm">Bạn chưa đăng nhập</span>
      <Link href={'/login'}>
        <Button variant={'primary'}>Đăng nhập</Button>
      </Link>
    </div>
  )
}

const CartEmpty = () => {
  return (
    <div className="h-60 w-full flex justify-center items-center">
      <span className="text-sm">Chưa Có Sản Phẩm</span>
    </div>
  )
}

const CartItems = ({ cart }: { cart: ICart }) => {
  return (
    <div className="flex flex-col h-max max-h-80 justify-between gap-2">
      <h1 className="text-sm text-gray-500 text-start w-full">
        Sản Phẩm Mới Thêm
      </h1>
      <div className="flex flex-col justify-start w-full h-full overflow-y-scroll gap-2">
        {cart?.cartItems.map((item: CartItem) => {
          return item?.products.map((product) => (
            <CartProduct
              product={product}
              key={product.productAttribute.id}
            />
          ))
        })}
      </div>
      <div className="flex items-center justify-end pt-4 border-t">
        <Link
          href={'/cart'}
          className="bg-blue-500 text-sm text-white uppercase rounded-md px-8 py-2"
        >
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  )
}

const Cart = () => {
  const { user } = useAppContext()
  const router = useRouter()
  const cart = cartStore((state) => state.cart)
  const updateCart = cartStore((state) => state.setCart)
  useEffect(() => {
    async function getCart() {
      try {
        const res = await cartApiRequest.getCart()
        updateCart(res.payload)
      } catch (error) {
        toast.error('Có lỗi xảy ra khi lấy giỏ hàng.')
      }
    }
    if (user) {
      getCart()
    }
  }, [updateCart, user])

  const handleNavigation = () => {
    const href = user?.id ? '/cart' : '/login'
    router.replace(href)
  }
  return (
    <div className="text-white">
      <HoverCard
        openDelay={200}
        closeDelay={200}
      >
        <HoverCardTrigger onClick={handleNavigation}>
          <ShoppingCart />
        </HoverCardTrigger>
        <HoverCardContent className={'w-96'}>
          {!user ? (
            <IsNotLogin />
          ) : !cart ? (
            <CartEmpty />
          ) : !cart?.cartItems?.length ? (
            <CartEmpty />
          ) : (
            <CartItems cart={cart} />
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default Cart
