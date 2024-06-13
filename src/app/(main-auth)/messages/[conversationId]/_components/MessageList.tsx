import { IMessage } from "@/types/conversations";
import React from "react";
import Message from "./Message";

const MessageList = ({ messages }: { messages: IMessage[] }) => {
  return (
    <>
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </>
  );
};

export default MessageList;
