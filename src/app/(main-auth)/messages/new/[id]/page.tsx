/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

import { IConversation } from "@/types/conversations";
import http, { HttpError } from "@/lib/http";
import { useConversationStore } from "@/utils/store/conversation-store";
import { useParams, useRouter } from "next/navigation";
import HeaderNewConversation from "./_component/HeaderNewConversation";
import CreateMessage from "./_component/CreateMessage";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const conversation = useConversationStore((state) => state.conversation);
  const setConversation = useConversationStore(
    (state) => state.setConversation
  );
  const [shop, setShop] = useState<any>(null);

  const getShopById = async () => {
    try {
      const response = await http.get<any>(`/shop/${id}`);
      setShop(response.payload);
    } catch (error) {
      if (error instanceof HttpError) {
        console.log(error.payload);
        //   if (error.status === 404) {
        //     return router.replace("/messages");
        //   }
      }
      //   throw new Error();
      console.log(error);
    }
  };

  useEffect(() => {
    getShopById();
  }, [id]);

  if (!shop) {
    return null;
  }
  return (
    <div className="flex flex-col flex-1">
      <HeaderNewConversation shop={shop} />
      <div className="flex-1 overflow-y-auto"></div>
      <CreateMessage shop={shop} />
    </div>
  );
};

export default Page;
