import BottomTab from './bottom-tab';
import { Navbar } from './navbar';

export default function MobileDashboardlLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <main className="absolute bottom-16 left-0 right-0 top-0 flex-1 overflow-y-auto">
                    <Navbar />
                    <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
                </main>
                <BottomTab />
            </div>
        </>
    );
}
