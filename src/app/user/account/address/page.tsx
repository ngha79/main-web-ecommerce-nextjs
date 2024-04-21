import type { Metadata } from 'next'
import accountApiRequest from '@/apiRequests/account'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CreateNewAddress, IAddressUser } from './CreateNewAddress'
import Address from './Address'

export const metadata: Metadata = {
  title: 'Địa chỉ | Mua ngay | ShopDev',
  description: 'Địa chỉ | Mua ngay | ShopDev',
}

const Page = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  try {
    if (!accessToken) redirect('/login')
    const address = await accountApiRequest.handleGetListAddress(accessToken)
    return (
      <div className="bg-background shadow-login rounded-md">
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-300">
          <h1 className="text-lg font-semibold text-gray-700 ">
            Địa chỉ của tôi
          </h1>
          <CreateNewAddress />
        </div>
        <div className="flex flex-col px-8 py-4 gap-4">
          {address.payload?.length ? (
            <div className="min-h-[500px] space-y-4">
              {address.payload?.map((address: IAddressUser) => (
                <Address
                  address={address}
                  key={address.id}
                />
              ))}
            </div>
          ) : (
            <div className="min-h-[500px] flex items-center justify-center">
              Bạn chưa thêm địa chỉ
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    return null
  }
}

export default Page
