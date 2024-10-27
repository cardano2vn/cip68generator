import { create } from "zustand";

interface useAppStateStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAppState = create<useAppStateStore>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading: isLoading });
  },
}));
