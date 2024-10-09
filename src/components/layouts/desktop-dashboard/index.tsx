'use client';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export default function DesktopDashboardlLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            <Sidebar />
            <div className="relative flex h-full min-w-0 flex-1 flex-col">
                <Navbar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
            </div>
        </div>
    );
}
