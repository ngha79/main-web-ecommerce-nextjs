import http from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'

const accountApiRequest = {
  me: (accessToken: string) =>
    http.get<AccountResType>('users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  meClient: () => http.get<AccountResType>('users/me'),
  getProfileUser: (id: string) =>
    http.get<any>(`users/profile/${id}`, {
      cache: 'no-store',
    }),
  updateProfile: (body: any) => http.put<any>(`users`, body),
  handleDeleteAddress: (id: number) => http.delete<any>(`/address/${id}`, {}),
  handleUpdateAddress: (data: {
    userName?: string
    phoneNumber?: string
    address?: string
    isAddressDefault?: boolean
    id: number
  }) => http.put<any>(`/address/${data.id}`, data, {}),
  handleGetListAddress: (accessToken: string) =>
    http.get<any>(`address`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  handleCreateNewAddress: (body: any) => http.post<any>(`address`, body),
  handleChangePassword: (body: any) => http.put<any>(`/users/password`, body),
}

export default accountApiRequest
