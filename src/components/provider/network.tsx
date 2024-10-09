'use client';

import { useNetwork, useNetworkStore } from '@/hooks/use-network';
import { PropsWithChildren, useContext, createContext, useEffect } from 'react';

const NetworkContext = createContext<useNetworkStore>(null!);

export const useNetworkContext = function () {
    const context = useContext(NetworkContext);
    if (!context) {
        throw new Error('useNetworkContext must be used within a NetworkProvider');
    }
    return context;
};

export default function NetworkProvider({ children }: PropsWithChildren) {
    const network: useNetworkStore = useNetwork();

    useEffect(() => {
        const networkConnection = localStorage.getItem('network');
        if (networkConnection) {
            network.setNetwork(JSON.parse(networkConnection));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (network.network) {
            localStorage.setItem('network', JSON.stringify(network.network));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [network]);

    return <NetworkContext.Provider value={network}>{children}</NetworkContext.Provider>;
}
