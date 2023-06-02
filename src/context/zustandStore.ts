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
  deckData: {
    deckId: string;
    deckName: string;
  };
  isUserLogged: boolean;
  isSessionExpired: boolean;
  setIsCreateDeckModalOpen: (boolean: boolean) => void;
  setIsEditModalOpen: (boolean: boolean) => void;
  setCardEditData: (cardEditData: CardEditData) => void;
  setNotificationContent: (content: NotificationContent) => void;
  setIsDeleteDeckModalOpen: (boolean: boolean) => void;
  setDeckData: (deckData: { deckId: string; deckName: string }) => void;
  setIsUserLogged: (boolean: boolean) => void;
  setIsSessionExpired: (boolean: boolean) => void;
}

export const useFlashMemoStore = create<FlashMemoState>()((set) => ({
  isCreateDeckModalOpen: false,
  isEditModalOpen: false,
  cardEditData: {} as CardEditData,
  notificationContent: {} as NotificationContent,
  isDeleteDeckModalOpen: false,
  deckData: {
    deckId: "",
    deckName: "",
  },
  isUserLogged: false,
  isSessionExpired: false,
  setIsCreateDeckModalOpen: (boolean) =>
    set(() => ({ isCreateDeckModalOpen: boolean })),
  setIsEditModalOpen: (boolean) => set(() => ({ isEditModalOpen: boolean })),
  setCardEditData: (cardEditData) => set(() => ({ cardEditData })),
  setNotificationContent: (notificationContent) =>
    set(() => ({ notificationContent })),
  setIsDeleteDeckModalOpen: (boolean) =>
    set(() => ({ isDeleteDeckModalOpen: boolean })),
  setDeckData: (deckData) => set(() => ({ deckData })),
  setIsUserLogged: (boolean) => set(() => ({ isUserLogged: boolean })),
  setIsSessionExpired: (boolean) => set(() => ({ isSessionExpired: boolean })),
}));
