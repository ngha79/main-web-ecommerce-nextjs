import React from "react";
import ListSubject from "./_component/ListSubject";
import ListBlog from "./_component/ListBlog";

const Blog = async ({
  params,
}: {
  params: { topic: string; author: string };
}) => {
  return (
    <section className="container py-4 md:px-8 space-y-4 size-full">
      <ListSubject />
      <ListBlog params={params} />
    </section>
  );
};

export default Blog;
