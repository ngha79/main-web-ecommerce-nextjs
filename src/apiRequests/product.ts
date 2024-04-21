import http from '@/lib/http'

const productApiRequest = {
  getDetail: (id: string) =>
    http.get<any>(`/product/${id}`, {
      cache: 'no-store',
    }),
  getLikeProduct: (id: string) =>
    http.get<any>(`/product/like/${id}`, {
      cache: 'no-store',
    }),
  userLikeProduct: (id: string, shopId: string, accessToken: string) =>
    http.put<any>(`/product/like/${id}/${shopId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  userUnLikeProduct: (id: string, accessToken: string) =>
    http.put<any>(`/product/unlike/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  handleSearchProduct: (header: {
    page: number
    search: string
    limit: number
    order?: string
    brand?: string
    shopId?: string
    searchBy?: string
    productId?: string
    ids?: string[]
  }) => {
    let url = ''
    if (header.shopId) url += `&shopId=${header.shopId}`
    if (header.brand) url += `&brand=${header.brand}`
    if (header.searchBy) url += `&searchBy=${header.searchBy}`
    if (header.ids) url += `&ids=${header.ids}`
    return http.get<any>(
      `/product?page=${header.page}&limit=${header.limit}&search=${header.search}` +
        url,
      {
        cache: 'no-store',
      }
    )
  },
  getListReviewProduct: (header: {
    page: number
    limit: number
    order: string
    rating: number | null
    shopId?: string
    productId?: string
  }) => {
    let url = ''
    if (header.rating) url += `&rating=${header.rating}`
    if (header.shopId) url += `&shopId=${header.shopId}`
    if (header.productId) url += `&productId=${header.productId}`
    return http.get<any>(
      `/comment-product?page=${header.page}&limit=${header.limit}&order=${header.order}` +
        url,
      {
        cache: 'no-store',
      }
    )
  },
  getRatingProduct: (productId: string) =>
    http.get<any>(`/comment-product/product/${productId}`),
  likeComment: (commentId: string, accessToken: string) =>
    http.put<any>(`/comment-product/like/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  createReport: (
    body: { content: string; commentId: string },
    accessToken: string
  ) =>
    http.post<any>('/comment-product/report', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  createReviewProduct: (body: any, accessToken: string) =>
    http.post<any>(`/comment-product`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  handleCheckOutProductPrice: (body: any) =>
    http.post<any>(`/product/checkout`, body, {}),
  handleDeleteAllProductFromCart: (id: string) =>
    http.delete<any>(`/cart-item/all/${id}`, {}),
  handleDeleteProductFromCart: (id: number) =>
    http.delete<any>(`/cart-item/${id}`, {}),
  updateQuantityProductCart: (cartId: string, body: any) =>
    http.patch<any>(`/cart-item/${cartId}`, body),
  getProductsShop: ({ page = 1, limit = 20, search = '', shopId = '' }: any) =>
    http.get<any>(
      `/product?page=${page}&limit=${limit}&search${search}&shopId=${shopId}`,
      {}
    ),
}

export default productApiRequest
