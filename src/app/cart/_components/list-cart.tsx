import InfoShipping from '@/components/cart/InfoShipping'
import React from 'react'
import FormCart from './form-cart'

const ListCart = () => {
  return (
    <div className="flex flex-col gap-4">
      <InfoShipping />
      <FormCart />
    </div>
  )
}

export default ListCart
