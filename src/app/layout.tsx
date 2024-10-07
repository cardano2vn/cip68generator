import type { Metadata } from 'next';
import { Lexend as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/utils';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/provider';
import { appConfig } from '@/constants';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
    title: appConfig.title,
    description: appConfig.description,
};

const fontSans = FontSans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const RootLayout = function ({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(fontSans.className, 'antialiased')}>
                <Toaster />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
