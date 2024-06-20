import React, { useCallback, useEffect, useState, useTransition } from "react";
import BlogIntro from "./BlogIntro";
import { useInView } from "react-intersection-observer";
import { IResponsePagination } from "@/utils/types/response-pagination";
import http, { HttpError } from "@/lib/http";
import { getListBlog } from "@/utils/actions/blog";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ResponseExceptions } from "@/lib/utils";

const Blogs = ({ blogs }: { blogs: any[] }) => {
  const params = useParams();
  const { topic, author } = params;

  const [blogList, setBLogs] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<number | null | undefined>(2);
  const [isLoading, startLoading] = useTransition();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px",
  });

  const handleFetch = useCallback(() => {
    if (isLoading || !nextPage) return;
    startLoading(async () => {
      try {
        const response = await getListBlog({
          page: nextPage,
          topic,
          author,
        });
        setBLogs((prev) => [...prev, ...response.payload.data]);
        setNextPage(response.payload.nextPage);
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  }, [author, isLoading, nextPage, topic]);

  useEffect(() => {
    if (inView && nextPage) {
      handleFetch();
    }
  }, [inView, nextPage, handleFetch]);

  return (
    <div className="flex overflow-auto flex-col-reverse h-full">
      {blogs.map((blog: any) => (
        <BlogIntro blog={blog} key={blog.id} />
      ))}
      {blogList.map((blog: any) => (
        <BlogIntro blog={blog} key={blog.id} />
      ))}
      <div ref={ref}>
        {isLoading ? (
          <div className="flex items-center justify-center pt-8">
            <div
              className="inline-block text-gray-700 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Blogs;
