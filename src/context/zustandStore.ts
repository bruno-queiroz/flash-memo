import { create } from "zustand";
import { Card } from "../fetch/getStudyDeck";

type CardEditData = Pick<Card, "back" | "front" | "id">;

interface NotificationContent {
  isOk: boolean | undefined;
  msg: string | undefined;
  isNotificationShowing: boolean;
}

interface FlashMemoState {
  isCreateDeckModalOpen: boolean;
  isEditModalOpen: boolean;
  cardEditData: CardEditData;
  notificationContent: NotificationContent;
  isDeleteDeckModalOpen: boolean;
  setIsCreateDeckModalOpen: (boolean: boolean) => void;
  setIsEditModalOpen: (boolean: boolean) => void;
  setCardEditData: (cardEditData: CardEditData) => void;
  setNotificationContent: (content: NotificationContent) => void;
  setIsDeleteDeckModalOpen: (boolean: boolean) => void;
}

export const useFlashMemoStore = create<FlashMemoState>()((set) => ({
  isCreateDeckModalOpen: false,
  isEditModalOpen: false,
  cardEditData: {} as CardEditData,
  notificationContent: {} as NotificationContent,
  isDeleteDeckModalOpen: false,
  setIsCreateDeckModalOpen: (boolean) =>
    set(() => ({ isCreateDeckModalOpen: boolean })),
  setIsEditModalOpen: (boolean) => set(() => ({ isEditModalOpen: boolean })),
  setCardEditData: (cardEditData) => set(() => ({ cardEditData })),
  setNotificationContent: (notificationContent) =>
    set(() => ({ notificationContent })),
  setIsDeleteDeckModalOpen: (boolean) =>
    set(() => ({ isDeleteDeckModalOpen: boolean })),
}));
