"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { appNetwork, wallets } from "@/constants";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { isNil } from "lodash";
import { useSession } from "next-auth/react";
import { useWalletContext } from "@/components/providers/wallet";
import Account from "./account";

const CardanoWallet = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { signIn, wallet } = useWalletContext();
  const { data: session } = useSession();
  return (
    <div style={{ width: "min-content", zIndex: 50 }}>
      {!isNil(wallet) ? (
        <Account />
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
                      return (
                        <Button
                          key={index}
                          className="h-15 w-full items-center gap-2 bg-card"
                          onClick={() => signIn(session, wallet)}
                        >
                          <Image
                            src={wallet.image || ""}
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

export const WalletConnectButton = dynamic(
  () => Promise.resolve(CardanoWallet),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);
