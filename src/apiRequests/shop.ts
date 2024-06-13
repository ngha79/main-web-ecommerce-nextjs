import http from "@/lib/http";
import { Shop } from "@/lib/interface";

const shopApiRequest = {
  getShopByProduct: (productId: string) =>
    http.get<any>(`/shop/product/${productId}`, {}),
  handleSearchShop: ({ page, limit, search }: any) =>
    http.get<any>(
      `/shop?page=${page}&limit=${limit}&userName=${search}&isActive=active`,
      {}
    ),
  getShopById: (shopId: string) =>
    http.get<Shop>(`/shop/info-shop/${shopId}`, {
      cache: "no-store",
    }),
  checkIsFollow: (shopId: string) =>
    http.get<any>(`/follow-users/user/${shopId}`, {
      token: true,
      cache: "no-store",
    }),
};

export default shopApiRequest;
