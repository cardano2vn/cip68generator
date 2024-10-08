import { create } from 'zustand';

interface useSidebarToggleStore {
    isOpen: boolean;
    toggle: () => void;
}

export const useSidebarToggle = create<useSidebarToggleStore>((set, get) => ({
    isOpen: true,
    toggle: () => {
        set({ isOpen: !get().isOpen });
    },
}));
