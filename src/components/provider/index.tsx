'use client';

import dynamic from 'next/dynamic';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import Loading from '@/app/(loading)/loading';

export const MeshProvider = dynamic(async () => (await import('@meshsdk/react')).MeshProvider, {
    loading() {
        return <Loading />;
    },
    ssr: false,
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    if (typeof window !== 'undefined') {
        window.addEventListener('unhandledrejection', (event) => {
            toast({
                title: 'Error',
                description: event.reason.message || 'An unknown error occurred',
                variant: 'destructive',
            });
        });
    }

    return (
        <>
            <MeshProvider>{children} </MeshProvider>
        </>
    );
}
