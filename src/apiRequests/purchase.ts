import http from '@/lib/http'

const purchaseApiRequest = {
  getListUser: () => http.get(``),
  handleGetListOrder: ({ page, limit, search, status, userId }: any) => {
    let url = ''
    if (search) url += `&search=${search}`
    if (status) url += `&status=${status}`
    return http.get<any>(
      `/list-orders?page=${page}&limit=${limit}&userId=${userId}` + url
    )
  },
  handleOrderProduct: (body: any) => http.post<any>(`/list-orders`, body),
}

export default purchaseApiRequest
