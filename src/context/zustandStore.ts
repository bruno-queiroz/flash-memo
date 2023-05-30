import { create } from "zustand";

interface FlashMemoState {
  isCreateDeckModalOpen: boolean;
  toggleCreateDeckModal: () => void;
}

export const useFlashMemoStore = create<FlashMemoState>()((set) => ({
  isCreateDeckModalOpen: false,
  toggleCreateDeckModal: () =>
    set((state) => ({ isCreateDeckModalOpen: !state.isCreateDeckModalOpen })),
}));
