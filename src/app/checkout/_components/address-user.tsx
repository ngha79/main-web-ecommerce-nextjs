import { MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ChangeAddress from './change-address'
import { IAddressUser } from '@/app/user/account/address/UpdateAddress'
import { CreateNewAddress } from '@/app/user/account/address/CreateNewAddress'

const AddressUser = ({
  address,
  addressList,
  handleChangeAddress,
  addNewAddress,
  updateAddress,
}: {
  address: IAddressUser | undefined
  addressList: IAddressUser[]
  handleChangeAddress: (address: IAddressUser) => void
  addNewAddress: (address: IAddressUser) => void
  updateAddress: (address: IAddressUser) => void
}) => {
  return (
    <div className="flex flex-col gap-y-2 bg-background rounded-md px-4 md:px-8 py-4 shadow-login overflow-hidden">
      <h3 className="flex items-center gap-2 text-orange-700 md:text-lg font-medium leading-5">
        <MapPin size={16} />
        <span className="line-clamp-1">Địa Chỉ Nhận Hàng</span>
      </h3>
      {address ? (
        <div className="flex flex-wrap items-start md:items-center text-sm gap-1">
          <h3 className="font-semibold leading-5 w-max line-clamp-1 flex items-center gap-2">
            <span>{address?.userName}</span>
            <span>{address?.phoneNumber}</span>
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="line-clamp-2">{address?.address}</span>
            {address?.isAddressDefault ? (
              <span className="border border-destructive text-[11px] px-1 text-destructive line-clamp-1 min-w-20 text-center">
                Mặc định
              </span>
            ) : null}
          </div>
          <ChangeAddress
            addressList={addressList}
            handleChangeAddress={handleChangeAddress}
            addNewAddress={addNewAddress}
            updateAddress={updateAddress}
          />
        </div>
      ) : (
        <CreateNewAddress addNewAddress={addNewAddress} />
      )}
    </div>
  )
}

export default AddressUser
