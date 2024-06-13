import React, { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ListBlog from "../../_component/ListBlog";

const Blog = async () => {
  return (
    <section className="container py-4 space-y-4 h-full flex flex-col gap-4">
      <Link href={"/blog"} className={cn(buttonVariants(), "w-max")}>
        Quay lại
      </Link>
      <div className="min-h-96 h-full flex">
        <Suspense>
          <ListBlog />
        </Suspense>
      </div>
    </section>
  );
};

export default Blog;
