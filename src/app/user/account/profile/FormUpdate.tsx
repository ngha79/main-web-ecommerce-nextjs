'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { format, setDate } from 'date-fns'
import React, { useRef, useState, useTransition } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { vi } from 'date-fns/locale'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select'
import Image from 'next/image'
import { updateProfile } from '@/utils/action'
import { IUpdateProfile } from '@/lib/interface'
import { useAppContext } from '@/app/app-provider'
import { toast } from 'sonner'
import { HttpError } from '@/lib/http'
import accountApiRequest from '@/apiRequests/account'

interface InfoUser {
  userName: string
  email: string
  phoneNumber: string
  avatar: string
  background: string
  gender: 'male' | 'female' | 'other'
  dateOfBirdth: Date
}

export const FormUpdate = () => {
  const { user } = useAppContext()
  const [isUpdate, setUpdate] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [info, setInfo] = useState<IUpdateProfile>({
    userName: user?.userName,
    phoneNumber: user?.phoneNumber,
    // gender: user?.gender,
    // dateOfBirdth: new Date(),
    avatar: user?.avatar,
    background: user?.background,
  })
  const [date, setDate] = React.useState<Date>(new Date())
  const [gender, setGender] = React.useState<string>('male')
  const image = useRef<HTMLInputElement>(null)

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const clickBtn = () => {
    image.current?.click()
  }

  const handleSetUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: boolean | ((prevState: boolean) => boolean)
  ) => {
    e.preventDefault()
    setUpdate(value)
  }

  const handleUpdateProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await accountApiRequest.updateProfile(info)
        toast.success('Cập nhật thông tin thành công.')
        setUpdate(false)
      } catch (error: any) {
        toast.error(error.payload.message)
      }
    })
  }
  return (
    <form
      className="flex flex-col gap-4 py-4 px-6"
      onSubmit={handleUpdateProfile}
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image
          alt="avatar user"
          src={'/login.png'}
          width={120}
          height={120}
          className="border rounded-full cursor-pointer"
          onClick={clickBtn}
        />
        <Input
          type="file"
          id="image"
          className="hidden"
          ref={image}
        />
        <div className="flex items-center gap-4">
          <Button
            variant={'outline'}
            type="button"
            onClick={clickBtn}
          >
            Chọn ảnh
          </Button>
          {/* <Button
            variant={'destructive'}
            type="button"
          >
            Hủy
          </Button> */}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="userName"
          className="w-32"
        >
          Tên người dùng
        </Label>
        <Input
          type="text"
          placeholder="Nguyễn Văn A"
          value={info?.userName}
          disabled={!isUpdate}
          name="userName"
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="email"
          className="w-32"
        >
          Email
        </Label>
        <Input
          type="email"
          placeholder="123@gmail.com"
          value={user?.email}
          className="bg-background border rounded-md px-4 py-2"
          name="email"
          disabled
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="phoneNumber"
          className="w-32"
        >
          Số điện thoại
        </Label>
        <Input
          type="text"
          placeholder="0123456789"
          value={info?.phoneNumber}
          className="bg-background border rounded-md px-4 py-2"
          disabled={!isUpdate}
          name="phoneNumber"
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="gender"
          className="w-32"
        >
          Giới tính
        </Label>
        <Select
          defaultValue={gender}
          disabled={!isUpdate}
          onValueChange={(value) => setGender(value)}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Chọn" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectItem value="male">Nam</SelectItem>
              <SelectItem value="female">Nữ</SelectItem>
              <SelectItem value="other">Khác</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label
          htmlFor="dateOfBirdth"
          className="w-32"
        >
          Ngày sinh
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, 'dd/MM/yyyy', { locale: vi })
              ) : (
                <span>Chọn ngày</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background shadow-login">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={!isUpdate || isPending}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-end w-full gap-2">
        {isUpdate ? (
          <>
            <Button
              type="submit"
              variant={'primary'}
              className="w-24"
              disabled={isPending}
            >
              {!isPending ? (
                'Xác nhận'
              ) : (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
            </Button>
            <Button
              type="reset"
              variant={'destructive'}
              onClick={(e) => handleSetUpdate(e, false)}
              disabled={isPending}
            >
              Hủy
            </Button>
          </>
        ) : (
          <Button
            type="reset"
            className="w-max"
            variant={'primary'}
            onClick={(e) => handleSetUpdate(e, true)}
          >
            Chỉnh sửa
          </Button>
        )}
      </div>
    </form>
  )
}
