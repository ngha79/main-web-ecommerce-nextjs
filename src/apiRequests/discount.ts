import http from "@/lib/http";
import { IResponsePagination } from "@/utils/types/response-pagination";

const discountApiRequest = {
  getVoucherShop: (id: string) =>
    http.get<IResponsePagination>(
      `/discounts?page=1&limit=10&shopId=${id}&isActive=true&search=`,
      {
        cache: "no-store",
      }
    ),
  getVoucherShopServer: ({ page = 1, limit = 20, search = "" }) =>
    http.get<any>(
      `/discounts?page=${page}&limit=${limit}&isActive=false&search=${search}`,
      {}
    ),
};

export default discountApiRequest;
