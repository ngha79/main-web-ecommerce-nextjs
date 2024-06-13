import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import http, { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { IResponsePagination } from "@/utils/types/response-pagination";
import Conversation from "./Conversation";
import { useConversationStore } from "@/utils/store/conversation-store";

const GetNextConversation = () => {
  const conversations = useConversationStore((state) => state.conversations);
  const paginationConversation = useConversationStore(
    (state) => state.paginationConversation
  );
  const nextPage = useConversationStore((state) => state.page);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && nextPage) {
      handleFetchConversations();
    }
  }, [inView, nextPage]);

  const handleFetchConversations = async () => {
    try {
      const res = await http.get<IResponsePagination>(
        `/conversation/user?page=${nextPage}&limit=20&search=`
      );
      paginationConversation(res.payload.data, res.payload.nextPage);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    }
  };
  return (
    <div className="flex overflow-auto flex-col h-full">
      {conversations.map((conver: any, index: number) => (
        <Conversation conversation={conver} key={index} />
      ))}
      <div ref={ref}>
        {nextPage ? (
          <div className="flex items-center justify-center pt-8">
            <div
              className="inline-block text-gray-700 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GetNextConversation;
