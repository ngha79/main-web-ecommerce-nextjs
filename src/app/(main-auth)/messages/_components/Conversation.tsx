import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OptionConversation } from "./OptionConversation";
import { sub, formatDistance } from "date-fns";
import { vi } from "date-fns/locale";
import { IConversation } from "@/types/conversations";

const Conversation = ({ conversation }: { conversation: IConversation }) => {
  return (
    <Link
      href={`/messages/${conversation.id}`}
      className="flex items-center group relative p-2 gap-2 hover:bg-gray-100 rounded-md"
    >
      <Image
        alt="avatar shop"
        src={conversation.shop.avatar || "/login.png"}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="font-medium max-w-24 truncate text-[15px]">
          {conversation.shop.userName}
        </h3>
        {conversation?.latestMessage?.deletedAt ? (
          <span className="text-xs text-gray-700">
            Tin nhắn đã được thu hồi
          </span>
        ) : null}
        {conversation.latestMessage ? (
          <div className="flex flex-col text-sm text-gray-700">
            <span className="max-w-32 text-[13px] truncate">
              {conversation.latestMessage?.content
                ? conversation.latestMessage?.content
                : "Đã gửi một vài ảnh"}
            </span>
            <span className="line-clamp-1 text-xs">
              {formatDistance(
                sub(conversation.latestMessage.createdAt, {}),
                new Date(),
                { addSuffix: true, locale: vi }
              )}
            </span>
          </div>
        ) : null}
      </div>
      <OptionConversation />
    </Link>
  );
};

export default Conversation;
