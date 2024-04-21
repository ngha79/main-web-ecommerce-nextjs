import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import { Toaster } from 'sonner'
import { cookies } from 'next/headers'
import { AccountResType } from '@/schemaValidations/account.schema'
import accountApiRequest from '@/apiRequests/account'
import AppProvider from './app-provider'
import RefreshToken from '@/helpers/refresh-token'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopDev | Mua ngay | ShopDev',
  description: 'Trang mua bán mà bạn cần | Mua ngay | ShopDev',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  let user: AccountResType | null = null
  if (accessToken) {
    try {
      const data = await accountApiRequest.me(accessToken)
      user = data.payload
    } catch (error: any) {
      user = null
    }
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider
          inititalAccessToken={accessToken}
          inititalRefreshToken={refreshToken}
          user={user}
        >
          <div className="w-full min-h-screen relative flex flex-col">
            <Navbar user={user} />
            <div className="absolute min-h-[calc(100vh-80px)] lg:min-h-layout top-20 lg:top-32 left-0 w-full bg-gray-100">
              {children}
            </div>
            <Toaster
              position="top-center"
              richColors
            />
            <RefreshToken />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
