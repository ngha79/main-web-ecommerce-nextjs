import ProductSuggest from '@/components/product/ProductSuggest'
import React from 'react'
import InfoShipping from '@/components/cart/InfoShipping'
import FormCart from './_components/form-cart'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giỏ hàng | Mua ngay | ShopDev',
  description: 'Giỏ hàng của bạn | Mua ngay | ShopDev',
}

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 space-y-8">
      <InfoShipping />
      <FormCart />
      <ProductSuggest />
    </div>
  )
}

export default Page
