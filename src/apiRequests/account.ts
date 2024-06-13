import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
  me: () =>
    http.get<AccountResType>("users/me", {
      token: true,
    }),
  getProfileUser: (id: string) =>
    http.get<any>(`users/profile/${id}`, {
      cache: "no-store",
    }),
  updateProfile: (body: any) =>
    http.put<any>(`users`, body, {
      token: true,
    }),
  handleDeleteAddress: (id: number) =>
    http.delete<any>(
      `/address/${id}`,
      {},
      {
        token: true,
      }
    ),
  handleUpdateAddress: (data: {
    userName?: string;
    phoneNumber?: string;
    address?: string;
    isAddressDefault?: boolean;
    id: number;
  }) =>
    http.put<any>(`/address/${data.id}`, data, {
      token: true,
    }),
  handleGetListAddress: () =>
    http.get<any>(`address`, {
      token: true,
    }),
  handleCreateNewAddress: (body: any) =>
    http.post<any>(`address`, body, {
      token: true,
    }),
  handleChangePassword: (body: any) =>
    http.put<any>(`/users/password`, body, {
      token: true,
    }),
};

export default accountApiRequest;
