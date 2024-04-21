import http from '@/lib/http'

const discountApiRequest = {
  getVoucherShop: (id: string) =>
    http.get<any>(
      `/discounts?page=1&limit=10&shopId=${id}&isActive=true&search=`,
      {}
    ),
  getVoucherShopServer: ({ page = 1, limit = 20, search = '' }) =>
    http.get<any>(
      `/discounts?page=${page}&limit=${limit}&isActive=false&search=${search}`,
      {}
    ),
}

export default discountApiRequest
