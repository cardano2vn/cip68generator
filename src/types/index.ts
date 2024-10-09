import { Icons } from '@/components/common/icons';
import { BrowserWallet } from '@meshsdk/core';

export type CardanoNetwork = 'mainnet' | 'testnet' | 'preprod';

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
