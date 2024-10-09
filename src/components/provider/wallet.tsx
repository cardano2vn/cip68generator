'use client';

import { wallets } from '@/constants';
import { useWallet, useWalletStore } from '@/hooks/use-wallet';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';

const WalletContext = createContext<useWalletStore>(null!);

export const useWalletContext = function () {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWalletContext must be used within a WalletProvider');
    }
    return context;
};

export default function WalletProvider({ children }: PropsWithChildren) {
    const { connect, wallet, disconnect, refresh, browserWallet }: useWalletStore = useWallet();

    useEffect(() => {
        const walletConnecttion = localStorage.getItem('wallet');
        if (walletConnecttion) {
            const walletConnected = JSON.parse(walletConnecttion);
            wallets.forEach(async function (wallet) {
                if (wallet.name.toLowerCase() === walletConnected.name) {
                    await connect({
                        name: wallet.name.toLowerCase(),
                        api: wallet.api,
                        checkApi: wallet.checkApi,
                        image: wallet.image,
                    });
                    return;
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (wallet) {
            localStorage.setItem(
                'wallet',
                JSON.stringify({
                    name: wallet.name.toLowerCase(),
                    connectedAt: new Date().getTime(),
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet]);

    return (
        <WalletContext.Provider
            value={{
                connect,
                disconnect,
                refresh,
                wallet,
                browserWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}
