import React from 'react'

import {
  IAddressUser,
  UpdateAddress,
} from '@/app/user/account/address/UpdateAddress'
import { Input } from '@/components/ui/input'

const Address = ({
  address,
  addressChoose,
  handleChange,
  updateAddress,
}: {
  address: IAddressUser
  addressChoose: IAddressUser
  handleChange: (address: IAddressUser) => void
  updateAddress: (address: IAddressUser) => void
}) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b last:border-b-0 pb-4">
      <div className="flex items-center gap-4">
        <Input
          type="checkbox"
          checked={addressChoose?.id === address?.id}
          onChange={() => handleChange(address)}
          className="w-4 h-max p-1"
        />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm border-r w-max line-clamp-1 pr-2 border-r-gray-500">
              {address?.userName}
            </h3>
            <span className="text-xs text-gray-500 line-clamp-1">
              {address?.phoneNumber}
            </span>
          </div>
          <span className="text-xs text-gray-500 line-clamp-2">
            {address?.address}
          </span>
          {address?.isAddressDefault ? (
            <span className="border border-destructive text-[11px] px-1 text-destructive line-clamp-1 w-max text-center">
              Mặc định
            </span>
          ) : null}
        </div>
      </div>
      <UpdateAddress
        addressData={address}
        updateAddress={updateAddress}
      />
    </div>
  )
}

export default Address
