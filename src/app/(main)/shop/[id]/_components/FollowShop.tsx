"use client";

import { Button } from "@/components/ui/button";
import http, { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

const FollowShop = ({
  shopId,
  handleSetIsFollowing,
}: {
  shopId: string;
  handleSetIsFollowing: (isFollow: boolean) => void;
}) => {
  const handleFollowShop = async () => {
    try {
      await http.post("/follow-users", { followId: shopId }, { token: true });
      handleSetIsFollowing(true);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    }
  };

  return (
    <Button variant={"primary"} onClick={handleFollowShop}>
      Theo dõi
    </Button>
  );
};

export default FollowShop;
