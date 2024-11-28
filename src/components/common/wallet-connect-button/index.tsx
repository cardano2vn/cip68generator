"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Loading from "@/app/(loading)/loading";
import { isNil } from "lodash";
import { useBlockchainContext } from "@/components/providers/blockchain";
import Account from "./account";
import { useRouter } from "next/navigation";

const CardanoWallet = () => {
  const { wallet } = useBlockchainContext();
  const router = useRouter();
  return (
    <div style={{ width: "min-content", zIndex: 50 }}>
      {!isNil(wallet) ? (
        <Account />
      ) : (
        <div>
          <Button onClick={() => router.push("/login")}>Connect Wallet</Button>
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
