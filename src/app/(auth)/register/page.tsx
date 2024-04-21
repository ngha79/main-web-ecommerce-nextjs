import RegisterForm from './form'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Đăng ký | Mua ngay | ShopDev',
  description: 'Đăng ký | Mua ngay | ShopDev',
}

export default function RegisterPage() {
  return (
    <div className="container min-h-[calc(100vh-80px)] lg:min-h-layout flex items-center justify-between">
      <Image
        alt="background"
        src={'/login.png'}
        className="w-[50%] top-0 max-md:hidden"
        width={580}
        height={580}
      />
      <RegisterForm>
        <div className="flex items-center gap-6">
          <div className="w-full border border-gray-200"></div>
          <span className="text-base font-medium text-gray-500 text-center">
            Hoặc
          </span>
          <div className="w-full border border-gray-200"></div>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            variant={'outline'}
            className="rounded-lg gap-2 flex items-center justify-center"
          >
            <span className="text-sm font-medium text-gray-900">
              Sign up with Google
            </span>
          </Button>
          <Button
            variant={'outline'}
            className="rounded-lg gap-2 flex items-center justify-center"
          >
            <Github />
            <span className="text-sm font-medium text-gray-900">
              Sign up with Github
            </span>
          </Button>
        </div>
      </RegisterForm>
    </div>
  )
}
