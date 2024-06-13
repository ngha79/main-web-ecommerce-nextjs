'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import accountApiRequest from '@/apiRequests/account'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SetDafaultAddress = ({
  disabled,
  addressId,
}: {
  disabled: boolean
  addressId: number
}) => {
  const router = useRouter()
  async function setDefaultAddress() {
    try {
      await accountApiRequest.handleUpdateAddress({
        id: addressId,
        isAddressDefault: true,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }

  return (
    <Button
      variant={'outline'}
      className="text-xs"
      disabled={disabled}
      onClick={() => setDefaultAddress()}
    >
      Thiết lập mặc định
    </Button>
  )
}

export default SetDafaultAddress
