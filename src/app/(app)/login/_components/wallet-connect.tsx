"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWalletList } from "@meshsdk/react";
import WalletItem from "./wallet-item";
import { useSession } from "next-auth/react";
import { useBlockchainContext } from "@/components/providers/blockchain";
import { Wallet } from "@meshsdk/core";
import { appNetwork } from "@/constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/(loading)/loading";
import useWindowSize from "@/hooks/use-window-size";

export default function WalletConnect() {
  const router = useRouter();
  const wallets = useWalletList();
  const { data: session, status } = useSession();
  const { signIn } = useBlockchainContext();
  const isMobile: boolean = useWindowSize();

  const handleConnectWallet = async function (wallet: Wallet) {
    await signIn(session, wallet);
  };

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status != "unauthenticated") {
    return <Loading />;
  }

  if (isMobile)
    return (
      <div className="h-screenflex items-center justify-center">
        <div className=" text-white text-center py-6 px-8  max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Important Notice!</h2>
          <p className="text-lg">
            The application is not optimized for mobile devices yet. Please use
            a desktop for the best experience.
          </p>
        </div>
      </div>
    );

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>
          Connect a wallet on {appNetwork} to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {wallets.map((wallet) => (
          <WalletItem
            key={wallet.name}
            wallet={wallet}
            onConnectWallet={handleConnectWallet}
          />
        ))}
      </CardContent>
    </Card>
  );
}
