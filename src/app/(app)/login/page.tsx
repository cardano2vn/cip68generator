"use client";
import Link from "next/link";
import Image from "next/image";
import { appImage } from "@/public/images";
import { routes } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { useWallet } from "@/hooks/use-wallet";
import { appNetwork, appUrl } from "@/constants";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WalletItem from "./_components/wallet-item";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrowserWallet, Wallet } from "@meshsdk/core";

export default function SignInViewPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [walletInstalledList, setWalletInstalledList] = useState<Wallet[]>([]);
  useEffect(() => {
    async function get() {
      setWalletInstalledList(await BrowserWallet.getAvailableWallets());
    }
    get();
  }, []);
  const { signIn, wallet } = useWallet();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/dashboard");
    }
  }, [status, router]);

  const handleOpenNetwork = (network: string) => {
    if (network !== appNetwork && appUrl[network as keyof typeof appUrl]) {
      window.open(appUrl[network as keyof typeof appUrl], "_blank");
    }
  };

  return (
    <div className="h-screen">
      <div className="mx-auto my-0 flex h-full w-full max-w-[1200px] flex-col">
        <header className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex h-[60px] w-[150px] items-center justify-center">
            <Link className="relative flex items-center justify-center gap-2" href={routes.landing.redirect}>
              <Image className="h-[35px] w-[35px] object-cover" src={appImage.logo} alt="Logo" />
              <span className="text-2xl">Generator</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-[550px] flex flex-1 flex-col items-center justify-center spacey-y-4">
          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center w-full">
                  <span>Connect Wallet</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-[180px] justify-between">
                        {appNetwork}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] justify-between">
                      {["preview", "mainnet"]
                        .filter((item) => item !== appNetwork)
                        .map((item) => (
                          <DropdownMenuItem key={item} onClick={() => handleOpenNetwork(item)}>
                            {item}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardTitle>

              <CardDescription>Connect a wallet on {appNetwork} to continue</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {walletInstalledList.map((item) => {
                return (
                  <WalletItem
                    key={item.id}
                    wallet={wallet}
                    item={item}
                    onConnectWallet={(wallet) => {
                      return signIn(session, wallet);
                    }}
                    status={walletInstalledList.find((wallet) => wallet.id === item.id) ? "ready" : "not installed"}
                  />
                );
              })}
              {/* {Object.entries(wallets).map(([key, value]) => {
                // if (value.id != "eternl") return;
                return (
                  <WalletItem
                    key={key}
                    wallet={wallet}
                    item={value}
                    onConnectWallet={(wallet) => {
                      return signIn(session, wallet);
                    }}
                    status={walletInstalledList.find((wallet) => wallet.id === value.id) ? "ready" : "not installed"}
                  />
                );
              })} */}
            </CardContent>
          </Card>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Created by cardano2vn , you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </main>
      </div>
    </div>
  );
}
