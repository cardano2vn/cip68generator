import { WalletConnectButton } from '@/components/common/mesh/wallet-connect';

export function Navbar() {
    return (
        <header className="sticky inset-x-0 top-0 w-full bg-section">
            <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
                <div className="flex items-center gap-2">
                    <WalletConnectButton />
                </div>
            </nav>
        </header>
    );
}
