"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import http, { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";

const ButtonChat = ({ shopId }: { shopId: string }) => {
  const router = useRouter();
  const handleSetChat = async () => {
    try {
      const response = await http.get<any>(`/conversation/user/${shopId}`, {
        token: true,
      });
      router.push(`/messages/${response.payload.id}`);
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status === 404) {
          return router.push(`/messages/new/${shopId}`);
        }
      }
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <Button
      onClick={handleSetChat}
      className="border-private text-private hover:text-private/80 bg-private/10 hover:bg-private/5"
      variant={"outline"}
    >
      Chat Ngay
    </Button>
  );
};

export default ButtonChat;
