import http from "@/lib/http";
import { IResponsePagination } from "../types/response-pagination";
import { GetListBlogParams } from "@/lib/interface";

export const getListTopicBlog = async () => {
  return await http.get<any[]>("/blog/topic", {
    next: {
      tags: ["topics"],
      revalidate: 3600,
    },
  });
};

export const getListBlog = async ({
  page = "1",
  limit = "20",
  search = "",
  author = "",
  topic = "",
}: GetListBlogParams) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    search,
    author,
    topic,
  }).toString();

  return await http.get<IResponsePagination>(`/blog?${queryParams}`, {
    next: {
      tags: ["blogs"],
    },
  });
};

export const getBlog = async (id: string) => {
  return await http.get<any>(`/blog/${id}`, { cache: "no-store" });
};

export const createTopic = async (body: any) => {
  return await http.post("/blog/topic", body);
};

export const createBlog = async (body: any) => {
  return await http.post("/blog", body);
};

export const deleteTopic = async (id: number) => {
  return await http.delete(`/blog/topic/${id}`, {});
};

export const updateTopic = async (id: number, body: any) => {
  return await http.put(`/blog/topic/${id}`, body);
};
