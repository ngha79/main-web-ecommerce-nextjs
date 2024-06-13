import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = async () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen w-full p-4 container">
      <div className="bg-background rounded-md shadow-md p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-32 h-32 rouned-md" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-40 rounded-sm" />
            <Skeleton className="h-5 w-32 rounded-sm" />
            <Skeleton className="h-5 w-32 rounded-sm" />
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 justify-end gap-2">
          <Skeleton className="w-40 h-5 rounded-sm" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-12 rounded-md" />
            <Skeleton className="w-24 h-12 rounded-md" />
          </div>
        </div>
      </div>
      <div className="bg-background rounded-md shadow-md p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-32 h-32 rouned-md" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-40 rounded-sm" />
            <Skeleton className="h-5 w-32 rounded-sm" />
            <Skeleton className="h-5 w-32 rounded-sm" />
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 justify-end gap-2">
          <Skeleton className="w-40 h-5 rounded-sm" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-12 rounded-md" />
            <Skeleton className="w-24 h-12 rounded-md" />
          </div>
        </div>
      </div>
      <div className="bg-background rounded-md shadow-md p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-32 h-32 rouned-md" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-40 rounded-sm" />
            <Skeleton className="h-5 w-32 rounded-sm" />
            <Skeleton className="h-5 w-32 rounded-sm" />
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 justify-end gap-2">
          <Skeleton className="w-40 h-5 rounded-sm" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-12 rounded-md" />
            <Skeleton className="w-24 h-12 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
