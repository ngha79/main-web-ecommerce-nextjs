import React from "react";
import ListSubject from "./_component/ListSubject";
import ListBlog from "./_component/ListBlog";

const Blog = async () => {
  return (
    <section className="container py-4 md:px-8 space-y-4 size-full">
      <ListSubject />
      <ListBlog />
    </section>
  );
};

export default Blog;
