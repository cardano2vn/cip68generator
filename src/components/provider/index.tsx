'use client';

import React, { Suspense } from 'react';
import MeshProvider from './mesh';
import QueryClientProvider from './query';
import ErrorClientProvider from './error';
import { Toaster } from '@/components/ui/toaster';
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
const WalletProvider = dynamic(async () => await import('@/components/provider/wallet'), {
    loading() {
        return <Loading />;
    },
    ssr: false,
});

const NetworkProvider = dynamic(async () => await import('@/components/provider/network'), {
    loading() {
        return <Loading />;
    },
    ssr: false,
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <Toaster />
            <ErrorClientProvider>
                <QueryClientProvider>
                    <MeshProvider>
                        <NetworkProvider>
                            <WalletProvider>{children}</WalletProvider>
                        </NetworkProvider>
                    </MeshProvider>
                </QueryClientProvider>
            </ErrorClientProvider>
        </Suspense>
    );
}
