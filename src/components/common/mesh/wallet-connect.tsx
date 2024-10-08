'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useWallet, useWalletList } from '@meshsdk/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { appNetwork } from '@/constants';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const CardanoWallet = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [changeAddress, setChangeAddress] = useState('');
    const { connect, wallet, connected, name, disconnect } = useWallet();
    useEffect(() => {
        (async () => {
            if (!connected || !wallet) return;

            setChangeAddress(await wallet.getChangeAddress());
        })();
    }, [connected, wallet]);

    const wallets = useWalletList();

    const handleConnect = async (walletName: string) => {
        await connect(walletName);
    };

    return (
        <div style={{ width: 'min-content', zIndex: 50 }}>
            {connected && changeAddress ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button
                            variant="outline"
                            className="h-15 w-full items-center gap-2 bg-card px-4"
                        >
                            <Image
                                src={wallets.find((wallet) => wallet.id === name)?.icon || ''}
                                alt={`${name} icon`}
                                height={24}
                                width={24}
                            />
                            {changeAddress?.slice(0, 12)}...{changeAddress?.slice(-4)}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={async () => {
                                await navigator.clipboard.writeText(changeAddress || '');
                            }}
                        >
                            Copy Stake Address
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async () => {
                                await navigator.clipboard.writeText(changeAddress || '');
                            }}
                        >
                            Copy Change Address
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => disconnect()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div>
                    <Button onClick={() => setDialogOpen(true)}>Connect Wallet</Button>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent className="bg-section">
                            <DialogHeader>
                                <DialogTitle>
                                    Connect a wallet on {appNetwork} to continue
                                </DialogTitle>
                                <div className="flex flex-col items-center gap-4 pt-6">
                                    {wallets.length > 0 ? (
                                        wallets.map((wallet, index) => {
                                            if (wallet.name === 'MetaMask') return null;
                                            return (
                                                <Button
                                                    key={index}
                                                    className="h-15 w-full items-center gap-2 bg-card"
                                                    onClick={() => handleConnect(wallet.id)}
                                                >
                                                    <Image
                                                        src={wallet.icon || ''}
                                                        alt={`${wallet.name} icon`}
                                                        width={32}
                                                        height={32}
                                                    />
                                                    {wallet.name}
                                                </Button>
                                            );
                                        })
                                    ) : (
                                        <span>No Wallet Found</span>
                                    )}
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export const WalletConnectButton = dynamic(() => Promise.resolve(CardanoWallet), {
    loading: () => <>loading...</>,
    ssr: false,
});
