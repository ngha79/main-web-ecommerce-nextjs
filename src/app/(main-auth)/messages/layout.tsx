import React from "react";
import ListConversation from "./_components/ListConversation";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex pt-24 lg:pt-36 h-screen overflow-hidden">
      <ListConversation />
      {children}
    </div>
  );
};

export default MessagesLayout;
