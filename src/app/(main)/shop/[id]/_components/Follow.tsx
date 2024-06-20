"use client";

import React, { useContext, useEffect, useState } from "react";

import http, { HttpError } from "@/lib/http";
import FollowShop from "./FollowShop";
import UnFollowShop from "./UnFollowShop";
import { Button } from "@/components/ui/button";
import { SocketContext } from "@/components/contexts/SocketContext";
import { ReportShop } from "./ReportShop";
import { toast } from "sonner";
import { ResponseExceptions } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Follow = ({ shopId }: { shopId: string }) => {
  const { user } = useContext(SocketContext);

  const router = useRouter();

  const [isFollowing, setFollow] = useState<boolean>(false);

  useEffect(() => {
    const handleCheckFollowing = async () => {
      try {
        const response = await http.get<any>(`/follow-users/${shopId}`, {
          token: true,
          cache: "no-store",
        });
        setFollow(response.payload);
      } catch (error) {
        setFollow(false);
      }
    };
    if (user) {
      handleCheckFollowing();
    }
  }, [shopId, user]);

  const handleSetIsFollowing = (isFollowing: boolean) => {
    setFollow(isFollowing);
  };

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
    <div className="flex items-center gap-2 justify-center w-full pt-4">
      <Button variant={"outline"} onClick={handleSetChat}>
        Chat Ngay
      </Button>
      {user ? (
        <>
          {!isFollowing ? (
            <FollowShop
              shopId={shopId}
              handleSetIsFollowing={handleSetIsFollowing}
            />
          ) : (
            <UnFollowShop
              shopId={shopId}
              handleSetIsFollowing={handleSetIsFollowing}
            />
          )}
          <ReportShop shopId={shopId} />
        </>
      ) : null}
    </div>
  );
};

export default Follow;
