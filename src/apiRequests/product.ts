import http from "@/lib/http";

const productApiRequest = {
  getDetail: (id: string) =>
    http.get<any>(`/product/${id}`, {
      cache: "no-store",
      token: true,
    }),
  getLikeProduct: (id: string) =>
    http.get<any>(`/product/like/${id}`, {
      cache: "no-store",
      token: true,
    }),
  userLikeProduct: (id: string, shopId: string) =>
    http.put<any>(
      `/product/like/${id}/${shopId}`,
      {},
      {
        token: true,
      }
    ),
  userUnLikeProduct: (id: string) =>
    http.put<any>(
      `/product/unlike/${id}`,
      {},
      {
        token: true,
      }
    ),
  handleSearchProduct: (header: {
    page: number;
    search: string;
    limit: number;
    order?: string;
    brand?: string;
    shopId?: string;
    searchBy?: string;
    productId?: string;
    ids?: string[];
  }) => {
    let url = "";
    if (header.shopId) url += `&shopId=${header.shopId}`;
    if (header.brand) url += `&brand=${header.brand}`;
    if (header.searchBy) url += `&searchBy=${header.searchBy}`;
    if (header.ids) url += `&ids=${header.ids}`;
    if (header.order) url += `&order=${header.order}`;
    return http.get<any>(
      `/product?page=${header.page}&limit=${header.limit}&search=${header.search}` +
        url,
      {
        cache: "no-store",
      }
    );
  },
  getListReviewProduct: (header: {
    page: number;
    limit: number;
    order: string;
    rating: number | null;
    shopId?: string;
    productId?: string;
  }) => {
    let url = "";
    if (header.rating) url += `&rating=${header.rating}`;
    if (header.shopId) url += `&shopId=${header.shopId}`;
    if (header.productId) url += `&productId=${header.productId}`;
    return http.get<any>(
      `/comment-product?page=${header.page}&limit=${header.limit}&order=${header.order}` +
        url,
      {
        cache: "no-store",
      }
    );
  },
  getRatingProduct: (productId: string) =>
    http.get<any>(`/comment-product/product/${productId}`),
  likeComment: (commentId: string) =>
    http.put<any>(
      `/comment-product/like/${commentId}`,
      {},
      {
        token: true,
      }
    ),
  createReport: (body: { content: string; commentId: string }) =>
    http.post<any>("/comment-product/report", body, {
      token: true,
    }),
  createReviewProduct: (body: any) =>
    http.post<any>(`/comment-product`, body, {
      token: true,
    }),
  handleCheckOutProductPrice: (body: any) =>
    http.post<any>(`/product/checkout`, body, {
      token: true,
    }),
  handleDeleteAllProductFromCart: (id: string) =>
    http.delete<any>(`/cart-item/all/${id}`, {}, { token: true }),
  handleDeleteProductFromCart: (id: number) =>
    http.delete<any>(
      `/cart-item/${id}`,
      {},
      {
        token: true,
      }
    ),
  updateQuantityProductCart: (cartId: string, body: any) =>
    http.patch<any>(`/cart-item/${cartId}`, body, {
      token: true,
    }),
  getProductsShop: ({ page = 1, limit = 20, search = "", shopId = "" }: any) =>
    http.get<any>(
      `/product?page=${page}&limit=${limit}&search${search}&shopId=${shopId}`,
      {}
    ),
  addProductsToWishlist: (productIds: string[]) =>
    http.post<any>(
      `/wishlist/list`,
      {
        productIds,
      },
      { token: true }
    ),
  handleDeleteProductsFromCart: (cartIds: number[]) =>
    http.delete<any>(
      `/cart-item`,
      {
        ids: cartIds,
      },
      { token: true }
    ),
};

export default productApiRequest;
