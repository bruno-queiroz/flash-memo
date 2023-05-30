import { create } from "zustand";
import { Card } from "../fetch/getStudyDeck";

type CardEditData = Pick<Card, "back" | "front" | "id">;

interface FlashMemoState {
  isCreateDeckModalOpen: boolean;
  isEditModalOpen: boolean;
  cardEditData: CardEditData;
  setIsCreateDeckModalOpen: (boolean: boolean) => void;
  setIsEditModalOpen: (boolean: boolean) => void;
  setCardEditData: (cardEditData: CardEditData) => void;
}

export const useFlashMemoStore = create<FlashMemoState>()((set) => ({
  isCreateDeckModalOpen: false,
  isEditModalOpen: false,
  cardEditData: {} as CardEditData,
  setIsCreateDeckModalOpen: (boolean) =>
    set(() => ({ isCreateDeckModalOpen: boolean })),
  setIsEditModalOpen: (boolean) => set(() => ({ isEditModalOpen: boolean })),
  setCardEditData: (cardEditData) => set(() => ({ cardEditData })),
}));
