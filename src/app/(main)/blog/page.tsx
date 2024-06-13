import React from "react";
import ListSubject from "./_component/ListSubject";
import ListBlog from "./_component/ListBlog";

const Blog = () => {
  return (
    <section className="container py-4 md:px-8 space-y-4 size-full">
      <ListSubject />
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Danh sách bài viết</h1>
      </div>
      <div className="min-h-96 h-full flex">
        <ListBlog />
      </div>
    </section>
  );
};

export default Blog;
