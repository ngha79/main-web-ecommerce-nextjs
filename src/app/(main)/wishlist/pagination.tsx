"use client";

import React, { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Pagination = ({
  listPage,
  searchParams,
}: {
  listPage: any;
  searchParams: { page: string; search: string };
}) => {
  const { lastPage, nextPage, prevPage } = listPage;
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;
  const handleGetListReviewPage = (page: number | null) => {
    if (page == null) return;
    const params = new URLSearchParams(searchParams);
    if (page <= lastPage) {
      params.set("page", `${page}`);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };
  return (
    <Suspense>
      <div
        className={cn([
          "flex-1 items-center justify-center gap-2",
          lastPage ? "flex" : "hidden",
        ])}
      >
        <Button
          variant={"primary"}
          className="md:hidden"
          disabled={prevPage !== null ? false : true}
          onClick={() => handleGetListReviewPage(prevPage)}
        >
          Trước
        </Button>
        {currentPage > 4 ? (
          <>
            <Button variant={"ghost"}>...</Button>
            <Button
              variant={"primaryHover"}
              onClick={() => handleGetListReviewPage(0)}
              className="hidden md:block text-foreground"
            >
              1
            </Button>
          </>
        ) : null}
        {prevPage !== null ? (
          <Button
            variant={"outline"}
            className="hidden md:block"
            onClick={() => handleGetListReviewPage(prevPage)}
          >
            {prevPage}
          </Button>
        ) : null}
        <Button variant={"primary"} className="hidden md:block">
          {currentPage}
        </Button>
        {nextPage ? (
          <Button
            variant={"primaryHover"}
            onClick={() => handleGetListReviewPage(nextPage)}
            className="hidden md:block text-foreground"
          >
            {nextPage}
          </Button>
        ) : null}
        {lastPage && lastPage > currentPage + 4 ? (
          <>
            <Button variant={"ghost"}>...</Button>
            <Button
              variant={"primaryHover"}
              onClick={() => handleGetListReviewPage(lastPage)}
              className="hidden md:block text-foreground"
            >
              {lastPage + 1}
            </Button>
          </>
        ) : null}
        <Button
          variant={"primary"}
          className="md:hidden"
          onClick={() => handleGetListReviewPage(nextPage)}
          disabled={nextPage ? false : true}
        >
          Sau
        </Button>
      </div>
    </Suspense>
  );
};

export default Pagination;
