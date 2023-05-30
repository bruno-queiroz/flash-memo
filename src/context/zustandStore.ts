import { create } from "zustand";

interface FlashMemoState {
  isCreateDeckModalOpen: boolean;
  setIsCreateDeckModalOpen: (boolean: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (boolean: boolean) => void;
}

export const useFlashMemoStore = create<FlashMemoState>()((set) => ({
  isCreateDeckModalOpen: false,
  isEditModalOpen: false,
  setIsCreateDeckModalOpen: (boolean) =>
    set(() => ({ isCreateDeckModalOpen: boolean })),
  setIsEditModalOpen: (boolean) => set(() => ({ isEditModalOpen: boolean })),
}));
