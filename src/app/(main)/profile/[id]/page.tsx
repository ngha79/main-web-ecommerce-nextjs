import accountApiRequest from '@/apiRequests/account'
import Profile from './_components/profile'

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const { payload: profileUser } = await accountApiRequest.getProfileUser(
      params.id
    )
    return (
      <Profile
        profileUser={profileUser}
        profileUserId={params.id}
      />
    )
  } catch (error) {
    return null
  }
}

export default Page
