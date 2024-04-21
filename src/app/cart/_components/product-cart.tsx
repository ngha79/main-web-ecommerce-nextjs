import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProductCart as IProductCart } from '@/lib/interface'
import FormUpdateTotalProduct from '@/components/utils/FormUpdateTotalProduct'
import { handleDeleteProductFromCart } from '@/utils/action'
import { cartStore } from '@/utils/store/store'
import { updateQuantityProductCart } from '@/utils/actions/cart'
import { toast } from 'sonner'
import productApiRequest from '@/apiRequests/product'
import DeleteCartItem from './delete-cart-item'

const ProductCart = ({
  product,
  listCartCheckout,
  handleSetProductCartProduct,
}: {
  product: IProductCart
  listCartCheckout: number[]
  handleSetProductCartProduct: (id: number) => void
}) => {
  const cart = cartStore((state) => state.cart)
  const removeProductToCart = cartStore((state) => state.removeProductToCart)
  const [productItem, setProductItem] = useState<IProductCart>(product)
  const handleDeleteProductCart = async () => {
    try {
      await productApiRequest.handleDeleteProductFromCart(
        product.productAttribute.id
      )
      removeProductToCart(product.productAttribute.id)
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }

  const handleOnchangeProductQuantity = async (total: number) => {
    try {
      if (cart) {
        if (total <= 0) return

        await productApiRequest.updateQuantityProductCart(cart.id, {
          productId: product.productAttribute.id,
          total_product: total,
        })
        setProductItem((prev) => ({
          ...prev,
          total_product: total,
        }))
      }
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }

  return (
    <div className="w-full gap-y-4 flex flex-col md:flex-row md:items-center px-8 py-4 border-b last:border-b-0">
      <div className="w-full md:w-1/2 flex items-center gap-4">
        <Checkbox
          checked={listCartCheckout.includes(product.productAttribute.id)}
          onClick={() =>
            handleSetProductCartProduct(product.productAttribute.id)
          }
        />
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 flex items-center justify-center">
            <Image
              alt="logo-shop"
              src={product.productAttribute.picture}
              width={80}
              height={80}
              className="max-w-32 max-h-32 w-auto h-auto"
            />
          </div>
          <div className="flex flex-col">
            <span className="line-clamp-2 text-sm">
              {product.productAttribute?.product?.name}
            </span>
            <span className="line-clamp-1 text-xs">
              Size: {product.productAttribute?.size}
            </span>
            <span className="line-clamp-1 text-xs">
              Chất liệu: {product.productAttribute?.material}
            </span>
          </div>
        </div>
        {/* <ProductOptions /> */}
      </div>
      <div className="w-full md:w-1/2 flex items-center gap-4">
        <span className="text-sm text-gray-700 w-1/4 text-center">
          <span className="md:hidden">Đơn giá: </span>
          {product.productAttribute.product.price?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          }) || 0}
        </span>
        <FormUpdateTotalProduct
          value={productItem.total_product}
          handleOnChange={handleOnchangeProductQuantity}
        />
        <span className="text-sm text-red-500 w-1/4 text-center">
          {Number(
            product.productAttribute.product.price * productItem.total_product
          )?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          }) || 0}
        </span>
      </div>
      <DeleteCartItem handleDeleteProductCart={handleDeleteProductCart} />
    </div>
  )
}

export default ProductCart
