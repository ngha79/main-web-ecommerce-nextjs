import React from "react";
import { Skeleton } from "../ui/skeleton";

const OrderLoading = () => {
  return (
    <div className="flex flex-col border bg-background h-72 rounded-md shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Skeleton className="h-5 w-64" />
      </div>
      <div className="flex items-center justify-between w-full p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-20 w-20" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="flex flex-col gap-2 items-end w-full p-4">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export default OrderLoading;
