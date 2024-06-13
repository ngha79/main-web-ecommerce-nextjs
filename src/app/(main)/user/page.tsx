import { redirect } from 'next/navigation'

const Page = async () => {
  redirect('/user/account/profile')
}

export default Page
