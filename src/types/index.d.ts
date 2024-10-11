import { Icons } from '@/components/common/icons';
import { BrowserWallet } from '@meshsdk/core';
import { StaticImageData } from 'next/image';

export type CardanoNetwork = 'mainnet' | 'testnet' | 'preprod';
declare module 'next-auth' {
    interface User {
        address?: string;
        wallet?: string;
    }
}

export type WalletType = {
    name: string;
    image: string | StaticImageData;
    balance?: number;
    address?: string;
    downloadApi?: string;
    api?: () => Promise<void>;
    checkApi?: () => Promise<void>;
};

export type UseWalletHookType = () => {
    name: string;
    connecting: boolean;
    connected: boolean;
    wallet: BrowserWallet;
    connect: (walletName: string, extensions?: number[]) => Promise<void>;
    disconnect: () => void;
    error: unknown;
};

export interface NavItem {
    title: string;
    href: string;
    disabled: boolean;
    icon?: keyof typeof Icons;
}
