'use client'

import accountApiRequest from '@/apiRequests/account'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

export interface INewAddress {
  userName: string
  phoneNumber: string
  address: string
}

export interface IAddressUser {
  userName: string
  phoneNumber: string
  address: string
  isAddressDefault: boolean
  user: { id: string }
  id: number
}

const userAddress = z.object({
  userName: z
    .string()
    .min(2, { message: 'Tên phải từ 2 ký tự trở lên.' })
    .max(30, { message: 'Tên không quá 30 ký tự.' }),
  phoneNumber: z
    .string()
    .length(10, { message: 'Số điện thoại không đúng định dạng.' }),
  address: z
    .string()
    .min(1, { message: 'Địa chỉ không để trống.' })
    .max(200, { message: 'Địa chỉ không quá 200 ký tự.' }),
})

interface ICreateNewAddress {
  addNewAddress: (address: IAddressUser) => void
}

export function CreateNewAddress({ addNewAddress }: ICreateNewAddress) {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [isAddressDefault, setIsAddressDefault] = useState<boolean>(false)
  const [address, setAddress] = useState<INewAddress>({
    userName: '',
    phoneNumber: '',
    address: '',
  })

  const [error, setError] = useState<INewAddress>({
    userName: '',
    phoneNumber: '',
    address: '',
  })

  const handleOnchange = (e: { target: { name: any; value: any } }) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleAddNewAddress = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const validateForm = userAddress.safeParse(address)
    if (!validateForm.success) {
      return validateForm.error.errors.forEach((error) => {
        setError((prev) => ({ ...prev, [error.path[0]]: error.message }))
      })
    }
    try {
      const newAddress = await accountApiRequest.handleCreateNewAddress({
        ...address,
        isAddressDefault,
      })
      addNewAddress(newAddress.payload)
      toast.success('Thêm địa chỉ nhận hàng thành công.')
      setOpen(false)
      router.refresh()
    } catch (error: any) {
      toast.error(error.payload.message)
    }
  }

  const handleReset = () => {
    setAddress({ userName: '', phoneNumber: '', address: '' })
    setError({ userName: '', phoneNumber: '', address: '' })
    setOpen(true)
  }

  const handleOpen = (value: boolean) => {
    setOpen(value)
    setIsAddressDefault(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => handleOpen(value)}
    >
      <DialogTrigger asChild>
        <Button
          variant={'primary'}
          className={cn(['flex items-center gap-1 text-sm w-max'])}
          onClick={handleReset}
        >
          <Plus size={18} />
          Thêm địa chỉ mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px]">
        <DialogHeader>
          <DialogTitle className="font-medium text-gray-600">
            Địa chỉ mới
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2 relative">
            <Label
              htmlFor="userName"
              className="text-sm"
            >
              Họ và tên
            </Label>
            <Input
              id="userName"
              name="userName"
              className="col-span-3"
              placeholder="Nguyễn Văn A"
              value={address.userName}
              onChange={handleOnchange}
            />
            <span aria-hidden="true" />
            {error?.userName ? (
              <span className="col-span-3 text-sm text-red-500">
                {error?.userName}
              </span>
            ) : null}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="phoneNumber"
              className="text-sm"
            >
              Số điện thoại
            </Label>
            <Input
              id="phoneNumber"
              placeholder="0123456789"
              name="phoneNumber"
              className="col-span-3"
              value={address.phoneNumber}
              onChange={handleOnchange}
            />
            <span aria-hidden="true" />
            {error?.phoneNumber ? (
              <span className="col-span-3 text-sm text-red-500">
                {error?.phoneNumber}
              </span>
            ) : null}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="address"
              className="text-sm"
            >
              Địa chỉ
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Ha Noi"
              className="col-span-3"
              value={address.address}
              onChange={handleOnchange}
            />
            <span aria-hidden="true" />
            {error?.address ? (
              <span className="col-span-3 text-sm text-red-500">
                {error?.address}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              className="w-max"
              size={18}
              name="isAddressDefault"
              id="isAddressDefault"
              onChange={(e) => setIsAddressDefault(e.target.checked)}
            />
            <Label
              className="text-sm"
              htmlFor="isAddressDefault"
            >
              Đặt làm địa chỉ mặc định
            </Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              type="submit"
              variant={'destructive'}
            >
              Hủy
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={'primary'}
            onClick={handleAddNewAddress}
          >
            Hoàn thành
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
