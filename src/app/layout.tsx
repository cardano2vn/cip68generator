import type { Metadata } from 'next';
import { Lexend as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import 'react-vertical-timeline-component/style.min.css';
import { cn } from '@/utils';
import { appConfig } from '@/constants';
import { PropsWithChildren } from 'react';
import AppProviders from '@/components/providers';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
    title: appConfig.title,
    description: appConfig.description,
};

const fontSans = FontSans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const RootLayout = async function ({ children }: Readonly<PropsWithChildren>) {
    const session = await auth();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(fontSans.className)}>
                <AppProviders session={session}>{children}</AppProviders>
            </body>
        </html>
    );
};

export default RootLayout;
