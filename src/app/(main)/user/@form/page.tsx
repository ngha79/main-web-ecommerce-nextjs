"use client";

import { Pen } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

import { Account } from "./Account";
import { SocketContext } from "@/components/contexts/SocketContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = () => {
  const { user } = useContext(SocketContext);

  return (
    <div className="bg-background hidden rounded-md md:sticky top-40 shadow-login h-[600px] lg:flex flex-col gap-4 md:min-w-72">
      <div className="flex items-center gap-2 p-4">
        <Avatar className="w-max h-max">
          <AvatarImage
            src={user?.avatar || "/login.png"}
            alt="@shadcn"
            className="w-16 h-16 border rounded-full"
          />
          <AvatarFallback>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white">
              {user?.userName || "user"}
            </div>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-1">
          <span className="text-lg font-medium">
            {user?.userName || "user"}
          </span>
          <Link
            href={"/user/account/profile"}
            className="text-xs text-gray-500 flex items-center gap-1"
          >
            <Pen size={12} /> Sửa hồ sơ
          </Link>
        </div>
      </div>
      <Account />
    </div>
  );
};

export default Page;
