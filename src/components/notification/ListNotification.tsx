"use client";

import React from "react";

import { useNotificationStore } from "@/utils/store/notification-store";
import Notification from "./Notification";
import NotificationLoading from "./NotificationLoading";

const ListNotification = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const isLoading = useNotificationStore((state) => state.isLoading);

  return (
    <div className="min-h-[550px] flex flex-col">
      {isLoading ? (
        <>
          <NotificationLoading />
          <NotificationLoading />
        </>
      ) : null}
      {notifications.map((item) => (
        <Notification key={item.id} notification={item} />
      ))}
    </div>
  );
};

export default ListNotification;
