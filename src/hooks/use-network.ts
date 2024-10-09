import { create } from 'zustand';

export interface useNetworkStore {
    network: string;
    setNetwork: (network: string) => void;
}
export const useNetwork = create<useNetworkStore>((set) => ({
    network: 'preprod',
    setNetwork: (network: string) => {
        set({ network: network });
    },
}));
