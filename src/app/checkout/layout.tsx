import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | Mua ngay | ShopDev',
  description: 'Checkout Order | Mua ngay | ShopDev',
}

const CheckoutLayout = async ({ children }: { children: React.ReactNode }) => {
  return <section className="container py-4">{children}</section>
}

export default CheckoutLayout
