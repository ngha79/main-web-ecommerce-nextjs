import http from '@/lib/http'

const wishlistApiRequest = {
  getWishlist: (
    url: { page: number; limit: number; search: string },
    accessToken: string
  ) => {
    const { limit, page, search } = url
    return http.get<any>(
      `/wishlist?page=${page}&limit=${limit}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  },
  removeProductWishList: (body: any) => http.delete<any>('/wishlist', body, {}),
  addProductToWishlist: (body: { productId: string }) =>
    http.post<any>('/wishlist', body, {}),
}

export default wishlistApiRequest
