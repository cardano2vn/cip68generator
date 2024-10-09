import { create } from 'zustand';
import { BrowserWallet } from '@meshsdk/core';
import { WalletType } from '@/types';

export interface useWalletStore {
    wallet: WalletType;
    browserWallet: BrowserWallet;
    connect: ({ name, image }: WalletType) => Promise<void>;
    refresh: () => Promise<void>;
    disconnect: () => Promise<void>;
}

export const useWallet = create<useWalletStore>((set, get) => ({
    wallet: null!,
    browserWallet: null!,

    connect: async ({ name, image }: WalletType) => {
        const browserWallet: BrowserWallet = await BrowserWallet.enable(name.toLowerCase());
        const address = await browserWallet.getUsedAddress();
        const balance = await browserWallet.getLovelace();

        set({
            browserWallet: browserWallet,
            wallet: {
                name: name,
                image: image,
                balance: Number(balance),
                address: String(address),
            },
        });
    },

    refresh: async () => {
        const { browserWallet, wallet } = get();

        const balance = await browserWallet.getLovelace();
        const address = await browserWallet.getUsedAddress();

        set({
            wallet: {
                name: wallet.name,
                image: wallet.image,
                balance: Number(balance),
                address: String(address),
            },
        });
    },

    disconnect: async () => {
        set({ browserWallet: null!, wallet: null! });
    },
}));
