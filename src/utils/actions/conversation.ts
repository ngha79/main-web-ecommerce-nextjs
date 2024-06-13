import http from "@/lib/http";
import { IResponsePagination } from "../types/response-pagination";

export const getConversations = async () => {
  return await http.get<IResponsePagination>(
    "/conversation/user?page=1&limit=20&search=",
    {
      token: true,
    }
  );
};
