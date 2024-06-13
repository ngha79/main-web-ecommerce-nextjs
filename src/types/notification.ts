export interface INotification {
  id: string;
  noti_is_read: boolean;
  noti_title: string;
  noti_desc: string;
  noti_url: string;
  notificationImages: INotificationImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationImage {
  id: number;
  url: string;
  url_id: string;
}

export interface INotificationStore {
  notifications: INotification[];
  page: number | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setNotification: (
    notifications: INotification[],
    page: number | null
  ) => void;
  setNotificationPagination: (
    notifications: INotification[],
    page: number | null
  ) => void;
  setAllNotificationIsRead: () => void;
  newNotification: (notification: INotification) => void;
  deleteNotification: (notificationId: string) => void;
}
