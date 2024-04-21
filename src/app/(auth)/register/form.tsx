'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const RegisterForm = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })
  const router = useRouter()
  const signUp = async (
    authCredentialsValidator: TAuthCredentialsValidator
  ) => {
    try {
      const res = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        body: JSON.stringify(authCredentialsValidator),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const account = await res.json()
      if (!res.ok) throw account
      return account
    } catch (error: any) {
      if (error.message && typeof error.message == 'string') {
        toast.error(error.message)
        return
      }
      toast.error('Không thể đăng ký, vui lòng thử lại sau.')
      return
    }
  }
  const onSubmit = async ({
    email,
    password,
    phoneNumber,
    userName,
  }: TAuthCredentialsValidator) => {
    startTransition(async () => {
      const account = await signUp({ email, password, phoneNumber, userName })
      if (!account?.error && account?.id) {
        toast.success('Đăng ký tài khoản thành công.')
        router.push('/login')
      }
    })
  }

  return (
    <form
      className="w-[480px] mx-auto gap-5 p-8 flex flex-col rounded-lg bg-white shadow-login"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2.5">
        <h1 className="leading-tight text-2xl font-bold">Tạo tài khoản</h1>
        <span className="text-sm font-medium text-gray-500 space-x-2">
          <span>Bạn đã có tài khoản?</span>
          <Link
            href={'/login'}
            className="text-blue-600"
          >
            Đăng nhập
          </Link>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium"
        >
          Email
        </Label>
        <Input
          type="email"
          placeholder="name@example.com"
          {...register('email')}
          className={cn({
            'focus-visible:ring-red-500': errors.email,
          })}
        />
        {errors?.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium"
        >
          Mật khẩu
        </Label>
        <Input
          type="password"
          placeholder="............"
          {...register('password')}
          className={cn({
            'focus-visible:ring-red-500': errors.password,
          })}
        />
        {errors?.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="userName"
          className="text-sm font-medium"
        >
          Tên người dùng
        </Label>
        <Input
          type="text"
          {...register('userName')}
          className={cn({
            'focus-visible:ring-red-500': errors.userName,
          })}
          name="userName"
        />
        {errors?.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="phoneNumber"
          className="text-sm font-medium"
        >
          Số điện thoại
        </Label>
        <Input
          type="text"
          placeholder="0129312842"
          {...register('phoneNumber')}
          className={cn({
            'focus-visible:ring-red-500': errors.phoneNumber,
          })}
        />
        {errors?.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>
      <Button
        disabled={isPending}
        type="submit"
        variant={'primary'}
      >
        {isPending ? (
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : (
          <span>Đăng ký</span>
        )}
      </Button>
      {children}
    </form>
  )
}
export default RegisterForm
