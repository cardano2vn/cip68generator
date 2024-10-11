'use client';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import Loading from '@/app/loading';

export const MeshProviderBase = dynamic(async () => (await import('@meshsdk/react')).MeshProvider, {
    loading() {
        return <Loading />;
    },
    ssr: false,
});

export default function MeshProvider({ children }: PropsWithChildren) {
    return <MeshProviderBase>{children}</MeshProviderBase>;
}
