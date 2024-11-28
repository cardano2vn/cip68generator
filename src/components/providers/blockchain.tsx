"use client";

import { isEmpty, isNil } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useWalletList } from "@meshsdk/react";
import { useWallet, WalletStoreType } from "@/hooks/use-wallet";

type BlockchainContextType = WalletStoreType & {};

const BlockchainContext = createContext<BlockchainContextType>(null!);

export const useBlockchainContext = function () {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error(
      "useBlockchainContext must be used within a BlockchainProvider",
    );
  }
  return context;
};

export default function BlockchainProvider({ children }: PropsWithChildren) {
  const {
    signIn,
    connect,
    wallet,
    disconnect,
    refresh,
    browserWallet,
    address,
    getBalance,
    signTx,
    submitTx,
  }: WalletStoreType = useWallet();
  const { data: session, status } = useSession();
  const wallets = useWalletList();

  useEffect(() => {
    (async () => {
      if (isEmpty(wallets)) {
        return;
      }
      if (isNil(session) || status === "unauthenticated") {
        disconnect();
        return;
      }
      if (isNil(wallet)) {
        const walletConnect = session?.user
          ? wallets.find(
              (w) =>
                w.name.toLocaleLowerCase() ===
                session.user?.wallet?.toLocaleLowerCase(),
            )
          : null;
        if (!walletConnect) {
          await signOut();
          return;
        }
        signIn(session, walletConnect);
        return;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets]);

  return (
    <BlockchainContext.Provider
      value={{
        signIn,
        connect,
        disconnect,
        refresh,
        wallet,
        browserWallet,
        address,
        getBalance,
        signTx,
        submitTx,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
