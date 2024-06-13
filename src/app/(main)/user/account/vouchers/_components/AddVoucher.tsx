'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const AddVoucher = () => {
  const [voucher, setVoucher] = useState('')
  const handleAddVoucherToInventoryUser = () => {
    toast.success('Comming soon')
  }
  return (
    <div className="bg-gray-200 flex items-center justify-center py-8 px-4 gap-4 rounded-sm">
      <Label
        htmlFor="voucher"
        className="text-gray-700 line-clamp-1 w-max"
      >
        Mã Voucher
      </Label>
      <Input
        id="voucher"
        value={voucher}
        onChange={(e) => setVoucher(e.target.value)}
        placeholder="Nhập mã voucher tại đây"
        className="w-auto"
      />
      <Button
        variant={'destructive'}
        disabled={!voucher}
        onClick={handleAddVoucherToInventoryUser}
      >
        Lưu
      </Button>
    </div>
  )
}

export default AddVoucher
