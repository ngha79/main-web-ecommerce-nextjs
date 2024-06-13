import http from "@/lib/http";

const purchaseApiRequest = {
  getListUser: () => http.get(``),
  handleGetListOrder: async ({ page, limit, search, status }: any) => {
    let url = "";
    if (search) url += `&search=${search}`;
    if (status) url += `&status=${status}`;
    return http.get<any>(`/list-orders?page=${page}&limit=${limit}` + url, {
      token: true,
      cache: "no-store",
    });
  },
  handleOrderProduct: (body: any) =>
    http.post<any>(`/list-orders`, body, { token: true }),
};

export default purchaseApiRequest;
