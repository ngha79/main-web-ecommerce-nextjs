import http from "@/lib/http";
import { IResponsePagination } from "@/utils/types/response-pagination";

const wishlistApiRequest = {
  getWishlist: (url: { page: number; limit: number; search: string }) => {
    const { limit, page, search } = url;
    return http.get<IResponsePagination>(
      `/wishlist?page=${page}&limit=${limit}&search=${search}`,
      {
        token: true,
        next: {
          tags: ["wishlist"],
          revalidate: 3600,
        },
      }
    );
  },
  removeProductWishList: (body: any) =>
    http.delete<any>("/wishlist", body, {
      token: true,
    }),
  addProductToWishlist: (body: { productId: string }) =>
    http.post<any>("/wishlist", body, {
      token: true,
    }),
};

export default wishlistApiRequest;
