'use client';

import React, { Suspense } from 'react';
import MeshProvider from './mesh';
import QueryClientProvider from './query';
import ErrorClientProvider from './error';
import { Toaster } from '@/components/ui/toaster';
import Loading from '@/app/(loading)/loading';

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <Toaster />
            <ErrorClientProvider>
                <QueryClientProvider>
                    <MeshProvider>{children}</MeshProvider>
                </QueryClientProvider>
            </ErrorClientProvider>
        </Suspense>
    );
}
