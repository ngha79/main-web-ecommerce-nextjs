'use client'

import accountApiRequest from '@/apiRequests/account'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const DeleteAddress = ({
  addressId,
  hidden,
}: {
  addressId: number
  hidden: boolean
}) => {
  console.log(hidden)
  const router = useRouter()
  async function deleteAddress() {
    try {
      await accountApiRequest.handleDeleteAddress(addressId)
      router.refresh()
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }
  return (
    <Button
      variant={'link'}
      className={cn(
        'text-red-500 hover:text-red-600 text-xs',
        hidden && 'hidden'
      )}
      onClick={deleteAddress}
    >
      Xóa
    </Button>
  )
}

export default DeleteAddress
