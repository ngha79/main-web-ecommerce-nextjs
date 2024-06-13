import http from "@/lib/http";

const cartApiRequest = {
  getCart: () =>
    http.get<any>("/carts", {
      token: true,
    }),
  handleAddProductToCart: (body: {
    productId: number;
    total_product: number;
  }) =>
    http.post<any>("/cart-item", body, {
      token: true,
    }),
};

export default cartApiRequest;
