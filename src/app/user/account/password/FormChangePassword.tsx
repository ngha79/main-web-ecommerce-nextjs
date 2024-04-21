'use client'

import accountApiRequest from '@/apiRequests/account'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HttpError } from '@/lib/http'
import { IUpdatePassword } from '@/lib/interface'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const userPassword = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: 'Mật khẩu phải trên 8 ký tự.' })
      .max(30, { message: 'Mật khẩu không quá 30 ký tự.' }),
    newPassword: z
      .string()
      .min(8, { message: 'Mật khẩu phải trên 8 ký tự.' })
      .max(30, { message: 'Mật khẩu không quá 30 ký tự.' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Mật khẩu phải trên 8 ký tự.' })
      .max(30, { message: 'Mật khẩu không quá 30 ký tự.' }),
  })
  .refine((data) => data.confirmPassword == data.newPassword, {
    message: 'Mật khẩu chưa trùng khớp.',
    path: ['confirmPassword'],
  })

const FormChangePassword = () => {
  const [isLoading, startTransition] = useTransition()
  const [updatePassword, setUpdatePassword] = useState<IUpdatePassword>({
    confirmPassword: '',
    newPassword: '',
    currentPassword: '',
  })

  const [error, setError] = useState<IUpdatePassword>({
    confirmPassword: '',
    newPassword: '',
    currentPassword: '',
  })

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setError((prev) => ({ ...prev, [e.target.name]: '' }))
    setUpdatePassword((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpdatePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const validateForm = userPassword.safeParse(updatePassword)
    if (!validateForm.success) {
      return validateForm.error.errors.forEach((error) => {
        setError((prev) => ({ ...prev, [error.path[0]]: error.message }))
      })
    }

    startTransition(async () => {
      try {
        const res = await accountApiRequest.handleChangePassword(updatePassword)
        toast.success(res.payload.message)
        setUpdatePassword({
          confirmPassword: '',
          newPassword: '',
          currentPassword: '',
        })
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message)
        }
      }
    })
  }
  return (
    <form
      className="flex flex-col px-8 py-6 gap-6"
      onSubmit={handleUpdatePassword}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Mật khẩu hiện tại</Label>
        <Input
          type="password"
          name="currentPassword"
          value={updatePassword.currentPassword}
          onChange={handleOnChange}
          id="currentPassword"
          placeholder="********"
        />
        <span className="text-sm h-4 text-red-500">
          {error?.currentPassword}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="newPassword">Mật khẩu mới</Label>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          value={updatePassword.newPassword}
          onChange={handleOnChange}
          placeholder="********"
        />
        <span className="text-sm h-4 text-red-500">{error?.newPassword}</span>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={updatePassword.confirmPassword}
          onChange={handleOnChange}
          placeholder="********"
        />
        <span className="text-sm h-4 text-red-500">
          {error?.confirmPassword}
        </span>
      </div>
      <Button
        variant={'primary'}
        type="submit"
        disabled={isLoading}
      >
        Xác nhận
      </Button>
    </form>
  )
}

export default FormChangePassword
