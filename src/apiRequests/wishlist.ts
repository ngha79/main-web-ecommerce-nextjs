import http from "@/lib/http";

const wishlistApiRequest = {
  getWishlist: (url: { page: string; limit: number; search: string }) => {
    const { limit, page, search } = url;
    return http.get<any>(
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
