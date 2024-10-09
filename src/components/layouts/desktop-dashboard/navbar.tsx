import { WalletConnectButton } from '@/components/common/mesh/wallet-connect';

export function Navbar() {
    return (
        <header className="sticky left-0 right-0 top-0 z-10 h-full max-h-16 flex-1 bg-section">
            <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
                <div className="flex items-center gap-2">
                    <WalletConnectButton />
                </div>
            </nav>
        </header>
    );
}
