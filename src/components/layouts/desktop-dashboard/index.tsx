'use client';
import { Navbar } from './navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar from './sidebar';

export default function DesktopDashboardlLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex-1 items-center overflow-hidden">
                <Navbar />
                <ScrollArea className="h-[calc(100dvh-52px)]">
                    <div className="h-full p-4">{children}</div>
                </ScrollArea>
            </div>
        </div>
    );
}
