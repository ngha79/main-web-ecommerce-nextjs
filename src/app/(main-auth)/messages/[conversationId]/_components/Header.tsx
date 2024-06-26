import Image from "next/image";
import React from "react";
import ButtonBack from "./ButtonBack";
import { OptionDefault } from "./OptionDefault";
import { IConversation } from "@/types/conversations";
import Link from "next/link";

const Header = ({ conversation }: { conversation: IConversation }) => {
  return (
    <div className="sticky top-0 w-full z-[2] items-center justify-between shadow-md bg-background px-4 py-3">
      <div className="flex items-center gap-2">
        <ButtonBack />
        <Link
          href={`/shop/${conversation?.shop.id}`}
          className="flex items-center gap-2"
        >
          <Image
            alt="avatar shop"
            src={conversation?.shop.avatar || "/login.png"}
            width={52}
            height={52}
            className="w-14 h-14 rounded-full border"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-[15px]">
              {conversation?.shop.userName}
            </h3>
            <span className="text-gray-700 text-xs">Đang hoạt động</span>
          </div>
        </Link>
      </div>
      <OptionDefault />
    </div>
  );
};

export default Header;
