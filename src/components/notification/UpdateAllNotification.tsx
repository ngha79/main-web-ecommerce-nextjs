"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ResponseExceptions } from "@/lib/utils";
import http from "@/lib/http";
import { useNotificationStore } from "@/utils/store/notification-store";

const UpdateAllNotification = () => {
  const updateAllNotification = useNotificationStore(
    (state) => state.setAllNotificationIsRead
  );

  const handleUpdateAllNotification = async () => {
    try {
      await http.patch("/notifications", {}, { token: true });
      updateAllNotification();
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  return (
    <Button
      variant={"primary"}
      className="text-xs md:text-[13px]"
      onClick={handleUpdateAllNotification}
    >
      Đánh dấu tất cả là đã đọc
    </Button>
  );
};

export default UpdateAllNotification;
