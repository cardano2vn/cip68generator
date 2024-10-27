"use client";

import { WalletConnectButton } from "@/components/common/wallet-connect-button";
import SignMessage from "./sign-message";

export default function Page() {
  return (
    <>
      <div className="mb-2">
        <p className="text-lg font-bold">Submit Only</p>
        <WalletConnectButton />
        <SignMessage />
      </div>
    </>
  );
}
