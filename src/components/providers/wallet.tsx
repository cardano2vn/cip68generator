"use client";

// import { wallets } from "@/constants";
import { useWallet, useWalletStore } from "@/hooks/use-wallet";
import { isEmpty, isNil } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useWalletList } from "@meshsdk/react";

const WalletContext = createContext<useWalletStore>(null!);

export const useWalletContext = function () {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

export default function WalletProvider({ children }: PropsWithChildren) {
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
  }: useWalletStore = useWallet();
  const { data: session } = useSession();
  const wallets = useWalletList();

  useEffect(() => {
    (async () => {
      if (isEmpty(wallets)) {
        return;
      }
      if (isNil(session)) {
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
    <WalletContext.Provider
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
    </WalletContext.Provider>
  );
}
