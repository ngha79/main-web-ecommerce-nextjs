"use client";

import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useNotificationStore } from "@/utils/store/notification-store";
import ListNotification from "./ListNotification";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const NotificationHeader = ({ user }: any) => {
  const notifications = useNotificationStore((state) => state.notifications);
  return (
    <div className="text-white cursor-pointer">
      <HoverCard openDelay={200}>
        <HoverCardTrigger
          href={user ? "/user/account/notifications" : undefined}
          className="hover:text-white/70 text-white flex items-center gap-1"
        >
          <Bell size={18} />
          <span>Thông báo</span>
        </HoverCardTrigger>
        <HoverCardContent
          className={
            "w-96 min-h-60 max-h-[550px] overflow-y-auto flex flex-col justify-between"
          }
        >
          {!user ? (
            <div className="flex flex-col">
              <div className="h-60 w-full flex justify-center items-center">
                <span className="text-sm">Đăng nhập để xem thông báo</span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <Link
                  href={"/login"}
                  className="rounded-md text-sm px-2 py-2 w-full text-center bg-gray-100 hover:bg-gray-200 hover:text-red-500"
                >
                  Đăng Nhập
                </Link>
                <Link
                  href={"/register"}
                  className="rounded-md text-sm px-2 py-2 w-full text-center bg-gray-100 hover:bg-gray-200 hover:text-red-500"
                >
                  Đăng Ký
                </Link>
              </div>
            </div>
          ) : null}
          {user && notifications && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-lg font-medium">Danh sách thông báo</h1>
                <Link
                  href={"/user/account/notifications"}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Xem tất cả
                </Link>
              </div>
              <ListNotification />
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default NotificationHeader;
