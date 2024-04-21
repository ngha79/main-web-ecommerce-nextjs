import http from '@/lib/http'

const shopApiRequest = {
  getShopByProduct: (productId: string) =>
    http.get<any>(`/shop/product/${productId}`, {}),
  handleSearchShop: ({ page, limit, search }: any) =>
    http.get<any>(
      `/shop?page=${page}&limit=${limit}&userName=${search}&isActive=active`,
      {}
    ),
  getShopById: (shopId: string) => http.get<any>(`/shop/info/${shopId}`, {}),
}

export default shopApiRequest
