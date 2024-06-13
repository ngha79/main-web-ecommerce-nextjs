import Image from "next/image";
import React from "react";
import OptionHover from "./OptionHover";
import { IMessage } from "@/types/conversations";
import MessageDelete from "./MessageDelete";

const Message = ({ message }: { message: IMessage }) => {
  return (
    <>
      {!message.deletedAt ? (
        <div className="flex items-start gap-2 mx-4 my-2">
          <Image
            alt="avatar user"
            src={message?.user?.avatar || message?.shop?.avatar || "/login.png"}
            width={40}
            height={40}
            className="w-14 h-14 rounded-full border bg-background cursor-pointer"
          />
          <OptionHover message={message} />
        </div>
      ) : (
        <MessageDelete message={message} />
      )}
    </>
  );
};

export default Message;
