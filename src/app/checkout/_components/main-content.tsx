'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Payment from './payment'
import ProductCart from './product-cart'
import AddressUser from './address-user'
import { checkoutStore } from '@/utils/store/checkout-store'
import { IAddressUser } from '@/app/user/account/address/UpdateAddress'

const MainContent = ({ addressList }: { addressList: IAddressUser[] }) => {
  const [address, setAddress] = useState<IAddressUser | undefined>(
    addressList?.find((address) => address.isAddressDefault) || addressList?.[0]
  )
  const [listAddress, setAddressList] = useState<IAddressUser[]>(addressList)
  const checkout = checkoutStore((state) => state.checkout)
  const router = useRouter()
  if (!checkout) {
    router.replace('/')
  }
  const handleChangeAddress = (newAddress: IAddressUser) => {
    setAddress(newAddress)
  }

  const addNewAddress = (newAddress: IAddressUser) => {
    if (!address) setAddress(newAddress)
    if (newAddress.isAddressDefault) {
      const updateAddress = listAddress.map((item) => {
        item.isAddressDefault = false
        return item
      })
      setAddressList([...updateAddress, newAddress])
    } else {
      setAddressList([...listAddress, newAddress])
    }
  }

  const updateAddress = (address: IAddressUser) => {
    if (address.isAddressDefault) {
      const newList = addressList?.map((add) => {
        if (add.id === address.id) {
          return address
        }
        add.isAddressDefault = false
        return add
      })
      setAddressList(newList)
    } else {
      const newList = addressList?.map((add) => {
        if (add.id === address.id) {
          return address
        }
        return add
      })
      setAddressList(newList)
    }
  }
  return (
    <div className="flex flex-col gap-y-4 py-8">
      <AddressUser
        address={address}
        addressList={listAddress}
        handleChangeAddress={handleChangeAddress}
        addNewAddress={addNewAddress}
        updateAddress={updateAddress}
      />
      <ProductCart checkout={checkout} />
      <Payment
        checkout={checkout}
        address={address}
      />
    </div>
  )
}

export default MainContent
