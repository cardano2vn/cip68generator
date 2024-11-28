import { create } from "zustand";
import { BrowserWallet, Wallet } from "@meshsdk/core";
import { Session } from "next-auth";
import { isNil } from "lodash";
import { getNonceByAddress } from "@/services/auth/get-nonce";
import { signIn, signOut } from "next-auth/react";
import { appNetwork, appNetworkId } from "@/constants";

export interface WalletStoreType {
  wallet: Wallet | null;
  address: string | null;
  browserWallet: BrowserWallet | null;
  getBalance: () => Promise<number>;
  connect: (wallet: Wallet) => Promise<void>;
  signTx: (message: string) => Promise<string>;
  submitTx: (signedTx: string) => Promise<string>;
  refresh: () => Promise<void>;
  disconnect: () => Promise<void>;
  signIn: (session: Session | null, wallet: Wallet) => Promise<void>;
}

export const useWallet = create<WalletStoreType>((set, get) => ({
  wallet: null,
  browserWallet: null,
  address: null,

  getBalance: async () => {
    const { browserWallet } = get();
    if (!browserWallet) {
      return 0;
    }
    const balance = await browserWallet.getLovelace();
    return Number(balance);
  },
  signTx: async (unsignedTx: string) => {
    const { browserWallet, wallet } = get();
    if (!browserWallet || !wallet) {
      throw new Error("Wallet not connected");
    }
    const signedTx = await browserWallet.signTx(unsignedTx);
    if (!signedTx) {
      throw new Error("Failed to sign data");
    }
    return signedTx;
  },

  submitTx: async (signedTx: string) => {
    const { browserWallet } = get();
    if (!browserWallet) {
      throw new Error("Wallet not connected");
    }
    const txHash = await browserWallet.submitTx(signedTx);
    if (!txHash) {
      throw new Error("Failed to submit transaction");
    }
    return txHash;
  },

  connect: async (wallet: Wallet) => {
    const browserWallet: BrowserWallet = await BrowserWallet.enable(
      wallet.name.toLowerCase(),
    );
    const network = await browserWallet.getNetworkId();
    if (network !== appNetworkId) {
      throw new Error(
        "Invalid network,please switch to" +
          `${appNetworkId == 0 ? " Testnet" : " Mainnet"}`,
      );
    }
    const address = await browserWallet.getChangeAddress();
    if (!address) return;
    set({
      browserWallet: browserWallet,
      wallet: wallet,
      address: address,
    });
  },

  signIn: async (session: Session | null, wallet: Wallet) => {
    const { name } = wallet;
    const browserWallet: BrowserWallet = await BrowserWallet.enable(
      name.toLowerCase(),
    );
    if (!browserWallet) {
      throw new Error("Failed to connect wallet");
    }
    const network = await browserWallet.getNetworkId();
    if (network !== appNetworkId) {
      throw new Error(`Invalid network, please switch to ${appNetwork}`);
    }
    const address = await browserWallet.getChangeAddress();
    if (address.length === 0) {
      throw new Error("Cant get address");
    }

    if (isNil(session)) {
      const { data, result, message } = await getNonceByAddress(address);
      if (!result || isNil(data)) {
        throw new Error(message);
      }
      const signature = await browserWallet.signData(data);
      if (isNil(signature)) {
        throw new Error("Cant get signature");
      }
      await signIn("credentials", {
        data: JSON.stringify({
          wallet: name,
          address: address,
          signature,
        }),
      });
    } else if (session.user?.address !== address) {
      await signOut();
    } else {
      const address = await browserWallet.getChangeAddress();
      set({
        browserWallet: browserWallet,
        wallet: wallet,
        address: address,
      });
    }
  },

  refresh: async () => {
    const { browserWallet, wallet } = get();
    if (isNil(browserWallet) || isNil(wallet)) {
      throw new Error("Wallet not connected");
    }

    const network = await browserWallet.getNetworkId();
    if (network !== appNetworkId) {
      throw new Error(
        "Invalid network,please switch to " +
          `${appNetworkId == 0 ? "Testnet" : "Mainnet"}`,
      );
    }
    const address = await browserWallet.getChangeAddress();
    if (!address) return;

    set({
      browserWallet: browserWallet,
      wallet: wallet,
      address: address,
    });
  },

  disconnect: async () => {
    set({ browserWallet: null!, wallet: null! });
  },
}));
