import { INotification, INotificationStore } from "@/types/notification";
import { create } from "zustand";

type State = {
  notifications: INotification[];
  page: number | null;
  isLoading: boolean;
};

const setNotification = (
  notis: INotification[],
  page: number | null,
  state: State
) => {
  return {
    ...state,
    notifications: notis,
    page,
  };
};

const setNotificationPagination = (
  notis: INotification[],
  page: number | null,
  state: State
) => {
  return {
    ...state,
    notifications: [...state.notifications, ...notis],
    page,
  };
};

const setAllNotificationIsRead = (state: State) => {
  const newNotifications = state.notifications.map((item) => {
    item.noti_is_read = true;
    return item;
  });
  return {
    ...state,
    notifications: newNotifications,
  };
};

const newNotification = (noti: INotification, state: State) => {
  return {
    ...state,
    notifications: [noti, ...state.notifications],
  };
};

const deleteNotification = (notiId: string, state: State) => {
  const newNotifications = state.notifications.filter(
    (item) => item.id !== notiId
  );
  return {
    ...state,
    notifications: newNotifications,
  };
};

const setLoading = (state: State, isLoading: boolean) => {
  return { ...state, isLoading: isLoading };
};

export const useNotificationStore = create<INotificationStore>()((set) => ({
  notifications: [],
  page: null,
  isLoading: true,
  setNotification: (notis: INotification[], page: number | null) =>
    set((state: State) => setNotification(notis, page, state)),
  setLoading: (isLoading: boolean) =>
    set((state: State) => setLoading(state, isLoading)),
  setNotificationPagination: (notis: INotification[], page: number | null) =>
    set((state: State) => setNotificationPagination(notis, page, state)),
  setAllNotificationIsRead: () =>
    set((state: State) => setAllNotificationIsRead(state)),
  newNotification: (noti: INotification) =>
    set((state: State) => newNotification(noti, state)),
  deleteNotification: (notiId: string) =>
    set((state: State) => deleteNotification(notiId, state)),
}));
