"use client";

import React, { useEffect, useState } from "react";
import BlogIntro from "./BlogIntro";
import { getListBlog } from "@/utils/actions/blog";
import { useParams, useSearchParams } from "next/navigation";

const ListBlog = () => {
  const params = useParams();
  const { topic, author } = params;
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<any[]>();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getListBlog({
          page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
          topic,
          author,
        });
        setBlogs(response.payload.data);
      } catch (error) {
        return null;
      }
    }
    fetchData();
  }, [searchParams, topic, author]);

  return (
    <>
      {blogs?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {blogs.map((blog: any) => (
            <BlogIntro blog={blog} key={blog.id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1 text-gray-700">
          <span>Không tìm thấy bài viết nào</span>
        </div>
      )}
      {/* <PaginationBlog searchParams={searchParams} listPage={blogs} /> */}
    </>
  );
};

export default ListBlog;
