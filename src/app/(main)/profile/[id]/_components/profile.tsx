"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import React from "react";

const Profile = ({ profileUser, profileUserId }: any) => {
  return (
    <div className="container py-4">
      <div className="bg-white rounded-lg shadow-login p-4 flex items-center gap-8 w-full flex-col md:flex-row">
        <div className="relative flex md:mr-8 w-full md:max-w-80">
          <div className="z-[1] flex flex-col p-4 text-background items-start justify-center gap-4 w-full">
            <div className="flex gap-4">
              <Image
                alt="avatar-shop"
                src={profileUser.user_avatar}
                width={80}
                height={80}
                className="rounded-full border border-private w-20 h-20"
              />
              <h3>{profileUser.user_userName}</h3>
            </div>
            <div
              className={cn(["flex items-center gap-2 justify-between w-full"])}
            >
              <Button
                className="border-background w-full text-background hover:text-background/90 bg-transparent hover:bg-gray-300/5"
                variant={"outline"}
              >
                Theo dõi
              </Button>
            </div>
          </div>
          <div className="absolute top-0 left-0 size-full z-0 opacity-90">
            {profileUser.user_background ? (
              <Image
                alt="background shop"
                src={profileUser.user_background}
                width={200}
                height={200}
                className="w-full h-full rounded-sm"
              />
            ) : (
              <div className="bg-slate-600/80 size-full rounded-md" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 flex-1 gap-x-12 gap-y-4">
          <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
            <label className="line-clamp-1">Đánh Giá</label>
            <span className="text-private line-clamp-1">
              {profileUser.totalCommentCount}
            </span>
          </div>
          <div className="flex items-center text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
            <label className="line-clamp-1">Người Theo Dõi</label>
            <span className="text-private line-clamp-1">
              {+profileUser.followingCount}
            </span>
          </div>
          <div className="flex items-center w-max text-sm justify-between md:justify-normal text-gray-500 gap-4 md:gap-8 lg:gap-16">
            <label className="line-clamp-1 w-max">Tham Gia</label>
            <span className="text-private line-clamp-1 capitalize">
              {formatDistanceToNow(new Date(profileUser.user_createdAt), {
                addSuffix: true,
                locale: vi,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
