"use client";

import { Button } from "@/components/ui/button";
import http, { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

const UnFollowShop = ({
  shopId,
  handleSetIsFollowing,
}: {
  shopId: string;
  handleSetIsFollowing: (isFollow: boolean) => void;
}) => {
  const handleFollowShop = async () => {
    try {
      await http.delete("/follow-users", { followId: shopId }, { token: true });
      handleSetIsFollowing(false);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    }
  };

  return (
    <Button variant={"destructive"} onClick={handleFollowShop}>
      Bỏ theo dõi
    </Button>
  );
};

export default UnFollowShop;
