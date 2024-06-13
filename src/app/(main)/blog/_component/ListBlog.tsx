import React from "react";
import BlogIntro from "./BlogIntro";
import PaginationBlog from "./PaginationBlog";
import { getListBlog } from "@/utils/actions/blog";

const ListBlog = async ({
  params,
  searchParams,
}: {
  params?: { topic?: string; author?: string };
  searchParams: { page: string };
}) => {
  const { page } = searchParams;
  const response = await getListBlog({
    page,
    topic: params?.topic,
    author: params?.author,
  });
  const blogs = response.payload;
  if (!blogs?.data?.length) {
    return <NoBlogFoundMessage />;
  }

  return (
    <>
      <BlogGrid blogs={blogs} />
      <PaginationBlog searchParams={searchParams} listPage={blogs} />
    </>
  );
};

const NoBlogFoundMessage = () => (
  <div className="flex items-center justify-center flex-1 text-gray-700">
    <span>Không tìm thấy bài viết nào</span>
  </div>
);

const BlogGrid = ({ blogs }: { blogs: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
    {blogs.data.map((blog: any) => (
      <BlogIntro blog={blog} key={blog.id} />
    ))}
  </div>
);

export default ListBlog;
