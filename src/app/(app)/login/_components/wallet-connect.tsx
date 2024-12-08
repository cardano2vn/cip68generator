"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletList } from "@meshsdk/react";
import WalletItem from "./wallet-item";
import { useSession } from "next-auth/react";
import { useBlockchainContext } from "@/components/providers/blockchain";
import { Wallet } from "@meshsdk/core";
import { appNetwork } from "@/constants";
import { redirect, useRouter } from "next/navigation";
import Loading from "@/app/(loading)/loading";
import { useEffect } from "react";

export default function WalletConnect() {
  const router = useRouter();
  const wallets = useWalletList();
  const { data: session, status } = useSession();
  const { signIn } = useBlockchainContext();

  const handleConnectWallet = async function (wallet: Wallet) {
    await signIn(session, wallet);
  };

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  console.log(status);

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>Connect a wallet on {appNetwork} to continue</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {wallets.map((wallet) => (
          <WalletItem key={wallet.name} wallet={wallet} onConnectWallet={handleConnectWallet} />
        ))}
      </CardContent>
    </Card>
  );
}
