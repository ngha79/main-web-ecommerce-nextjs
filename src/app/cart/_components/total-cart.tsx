import { toast } from 'sonner'
import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import productApiRequest from '@/apiRequests/product'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Cart, ProductCart, ShopProduct } from '@/lib/interface'
import { checkoutStore } from '@/utils/store/checkout-store'
import { cartStore } from '@/utils/store/store'

const TotalCart = ({
  cart,
  listCartCheckout,
  handleSetAllProductCheckout,
  isSelectAll,
}: {
  cart: Cart
  listCartCheckout: number[]
  handleSetAllProductCheckout: (e: any) => void
  isSelectAll: boolean
}) => {
  const setCart = cartStore((state) => state.setCart)
  const setCheckout = checkoutStore((state) => state.setCheckout)
  const router = useRouter()
  const totalPrice = useMemo(() => {
    return listCartCheckout.reduce((total, index) => {
      const products: ProductCart[] = []
      cart.cartItems.forEach((item) => {
        return products.push(...item.products)
      })
      const valueCurrentProduct = products?.find(
        (item) => item.productAttribute.id === index
      )
      if (valueCurrentProduct) {
        return (
          total +
          valueCurrentProduct?.productAttribute.product.price *
            valueCurrentProduct?.total_product
        )
      }
      return 0
    }, 0)
  }, [cart.cartItems, listCartCheckout])

  const handleCheckOutProduct = async () => {
    if (!listCartCheckout.length) toast({ title: 'Bạn chưa chọn sản phẩm.' })
    const listShop: ShopProduct[] = []
    // Lặp qua các mục trong giỏ hàng
    cart?.cartItems?.forEach((item) => {
      // Kiểm tra xem cửa hàng đã tồn tại trong listShop hay chưa
      let shopIndex = listShop.findIndex((shop) => shop.shopId === item.shop.id)
      // Nếu cửa hàng chưa tồn tại, thêm mới vào listShop
      if (shopIndex === -1) {
        listShop.push({
          shopId: item.shop.id,
          shop_discounts: '',
          item_products: [],
        })
        // Lấy chỉ số của cửa hàng vừa được thêm vào
        shopIndex = listShop.length - 1
      }

      // Lặp qua các sản phẩm trong giỏ hàng
      item.products.forEach((product) => {
        // Kiểm tra xem sản phẩm có trong listCartCheckout hay không
        const cartIndex = listCartCheckout.indexOf(product.productAttribute.id)
        if (cartIndex !== -1) {
          // Thêm thông tin sản phẩm vào item_products của cửa hàng tương ứng
          listShop[shopIndex].item_products.push({
            product: product.productAttribute.product.id,
            productAttribute: product.productAttribute.id,
            price: product.productAttribute.product.price,
            quantity: product.total_product,
          })
        }
      })
    })
    const listCheckOut = listShop.filter(
      (item) => item.item_products.length > 0
    )
    try {
      const res = await productApiRequest.handleCheckOutProductPrice({
        cartId: cart.id,
        shop_order_ids: listCheckOut,
      })
      setCheckout(res.payload)
      router.replace('/checkout')
    } catch (error: any) {
      toast(error.payload.message)
    }
  }

  const handleDeleteAllCart = async () => {
    try {
      await productApiRequest.handleDeleteAllProductFromCart(cart.id)
      setCart({ id: cart.id, cartItems: [] })
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }

  return (
    <div className="static bottom-0 bg-white flex flex-col">
      <div className="flex items-center justify-end px-8 py-4 gap-4">
        <span className="font-light text-sm text-gray-700">Voucher</span>
        <span className="text-blue-500 text-sm font-medium">
          Chọn hoặc nhập mã
        </span>
      </div>
      <div className="w-full flex justify-between flex-wrap items-center px-8 py-4 gap-y-4 border-t">
        <div className="w-full flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              id="set-all"
              onCheckedChange={handleSetAllProductCheckout}
              checked={isSelectAll}
            />
            <Label htmlFor="set-all">
              Chọn tất cả ({listCartCheckout.length})
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant={'cancel'}
              className="text-red-500"
              onClick={handleDeleteAllCart}
            >
              Xóa
            </Button>
            <Button variant={'primary'}>Thêm vào mục Đã thích</Button>
          </div>
        </div>
        <div className="w-full flex items-center gap-4 justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm line-clamp-1">
              Tổng thanh toán ({listCartCheckout?.length} Sản phẩm):
            </span>
            <div className="text-red-500 text-xl flex items-start">
              {totalPrice?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              }) || 0}
            </div>
          </div>
          <Button
            className="uppercase"
            variant={'destructive'}
            onClick={handleCheckOutProduct}
          >
            Mua Hàng
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TotalCart
