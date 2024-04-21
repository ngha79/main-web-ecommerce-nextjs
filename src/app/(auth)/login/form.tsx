'use client'

import Link from 'next/link'
import { Github, Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AuthLoginCredentialsValidator,
  IAuthLoginCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn, handleErrorApi } from '@/lib/utils'
import { loginForm } from '@/utils/actions/auth'
import { useRouter } from 'next/navigation'
import authApiRequest from '@/apiRequests/auth'

const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IAuthLoginCredentialsValidator>({
    resolver: zodResolver(AuthLoginCredentialsValidator),
  })

  const onSubmit = async ({
    email,
    password,
  }: IAuthLoginCredentialsValidator) => {
    startTransition(async () => {
      try {
        const result = await authApiRequest.login({
          email,
          password,
        })
        await authApiRequest.auth({
          accessToken: result.payload.accessToken,
          refreshToken: result.payload.refreshToken,
        })
        router.push('/')
        router.refresh()
      } catch (error) {
        handleErrorApi({
          error,
          setError: setError,
        })
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[480px] mx-auto gap-5 p-8 flex flex-col rounded-lg bg-white shadow-login"
    >
      <div className="flex flex-col gap-2.5">
        <h1 className="leading-tight text-2xl font-bold">Chào mừng trở lại</h1>
        <span className="text-sm font-medium text-gray-500 space-x-2">
          <span>Bạn chưa có tài khoản?</span>
          <Link
            href={'/register'}
            className="text-blue-600"
          >
            Đăng ký
          </Link>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email')}
          className={cn({
            'focus-visible:ring-red-500': errors.email,
          })}
          placeholder="you@example.com"
        />
        {errors?.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register('password')}
          type="password"
          className={cn({
            'focus-visible:ring-red-500': errors.password,
          })}
          placeholder="Password"
        />
        {errors?.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button
        disabled={isPending}
        variant={'primary'}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Đăng nhập
      </Button>
      {children}
    </form>
  )
}

export default LoginForm
