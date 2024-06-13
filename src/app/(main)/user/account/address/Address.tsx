import React from 'react'
import { UpdateAddress } from './UpdateAddress'
import DeleteAddress from './delete-address'
import SetDafaultAddress from './set-default-address'

interface IAddressUser {
  userName: string
  phoneNumber: string
  address: string
  isAddressDefault: boolean
  id: number
}

const Address = ({ address }: { address: IAddressUser }) => {
  return (
    <div className="flex justify-between items-center border-b last:border-b-0 pb-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">{address?.userName}</h3>
          <div
            aria-hidden="true"
            className="h-4 w-px bg-gray-600"
          />
          <span className="text-xs text-gray-500">{address?.phoneNumber}</span>
        </div>
        <span className="text-xs line-clamp-2 max-w-64">
          {address?.address}
        </span>
        {address?.isAddressDefault ? (
          <div className="w-max text-xs border px-1 border-red-500 text-red-500 hover:text-red-500 cursor-default">
            Mặc định
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end">
          <UpdateAddress addressData={address} />
          <DeleteAddress
            addressId={address.id}
            hidden={address?.isAddressDefault}
          />
        </div>
        <SetDafaultAddress
          disabled={address?.isAddressDefault}
          addressId={address.id}
        />
      </div>
    </div>
  )
}

export default Address
