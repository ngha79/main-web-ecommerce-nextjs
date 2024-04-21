import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { HttpError } from '@/lib/http'
import MainContent from './_components/main-content'
import accountApiRequest from '@/apiRequests/account'

const Page = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) redirect('/')
  try {
    const res = await accountApiRequest.handleGetListAddress(accessToken)
    return <MainContent addressList={res.payload || []} />
  } catch (error: any) {
    if (error instanceof HttpError) {
      throw new Error(error.payload.message)
    }
    throw new Error(error?.message)
  }
}

export default Page
