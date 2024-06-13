import { Button } from "@/components/ui/button";
import http from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { IConversation, IMessage } from "@/types/conversations";
import { useConversationStore } from "@/utils/store/conversation-store";
import {
  Image as ImageIcon,
  SendHorizontal,
  ShoppingCart,
  Smile,
  Ticket,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const UpdateMessage = ({
  message,
  handleCancelUpdate,
}: {
  message: IMessage;
  handleCancelUpdate: () => void;
}) => {
  const params = useParams();
  const [content, setContent] = useState<string>(() => message.content || "");

  const handleOnChange = (e: React.ChangeEvent<any>) => {
    setContent(e.target.value);
  };
  const handleUpdateMessage = async () => {
    if (!message.user) return;
    try {
      await http.patch<IMessage>(
        `/conversation/message/${params.conversationId}/${message.id}`,
        { message: { ...message, content } },
        {
          token: true,
        }
      );
      handleCancelUpdate();
      setContent("");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <div className="w-full bg-background p-2 border-t flex items-center gap-4">
      <div className="w-full flex items-center rounded-2xl bg-gray-200 px-2">
        <textarea
          placeholder="Aa"
          value={content}
          onChange={handleOnChange}
          className="outline-none bg-transparent rounded-lg w-full p-2 text-sm resize-none overflow-auto scrollbar-hide"
          cols={2}
        />
        <button>
          <Smile className="fill-blue-500 text-background w-7 h-7" />
        </button>
      </div>
      <Button variant={"ghost"} size={"sm"} onClick={handleUpdateMessage}>
        <SendHorizontal className="text-background fill-blue-500 w-7 h-7" />
      </Button>
    </div>
  );
};

export default UpdateMessage;
