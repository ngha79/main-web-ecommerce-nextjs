import React from "react";

import Blogs from "./Blogs";
import { getListBlog } from "@/utils/actions/blog";

const ListBlog = async ({
  params,
}: {
  params: { topic?: string; author?: string };
}) => {
  let blogs = null;
  try {
    const response = await getListBlog({
      page: 1,
      topic: params?.topic,
      author: params?.author,
    });
    blogs = response.payload.data;
  } catch (error) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 min-h-[550px]">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Danh sách bài viết</h1>
      </div>
      {blogs?.length ? (
        <Blogs blogs={blogs} />
      ) : (
        <div className="flex items-center justify-center flex-1 text-gray-700">
          <span>Không tìm thấy bài viết nào</span>
        </div>
      )}
    </div>
  );
};

export default ListBlog;
