"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { isNil } from "lodash";
import { useWalletContext } from "@/components/providers/wallet";
import Account from "./account";
import { useRouter } from "next/navigation";

const CardanoWallet = () => {
  const { wallet } = useWalletContext();
  const router = useRouter();
  return (
    <div style={{ width: "min-content", zIndex: 50 }}>
      {!isNil(wallet) ? (
        <Account />
      ) : (
        <div>
          <Button onClick={() => router.push("/login")}>Login</Button>
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
