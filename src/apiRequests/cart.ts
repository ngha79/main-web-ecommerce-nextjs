import http from '@/lib/http'

const cartApiRequest = {
  getCart: () => http.get<any>('/carts', {}),
  handleAddProductToCart: (
    body: {
      productId: number
      total_product: number
    },
    accessToken: string
  ) =>
    http.post<any>('/cart-item', body, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
}

export default cartApiRequest
