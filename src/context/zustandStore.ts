import { create } from "zustand";

interface FlashMemoState {
  isCreateDeckModalOpen: boolean;
  setIsCreateDeckModalOpen: (boolean: boolean) => void;
}

export const useFlashMemoStore = create<FlashMemoState>()((set) => ({
  isCreateDeckModalOpen: false,
  setIsCreateDeckModalOpen: (boolean) =>
    set(() => ({ isCreateDeckModalOpen: boolean })),
}));
