import { create } from "zustand";
import { BrowserWallet } from "@meshsdk/core";
import { WalletType } from "@/types";
import { Session } from "next-auth";
import { isNil } from "lodash";
import { getNonceByAddress } from "@/services/auth/get-nonce";
import { signIn, signOut } from "next-auth/react";

export interface useWalletStore {
  wallet: WalletType;
  browserWallet: BrowserWallet;
  connect: (wallet: WalletType) => Promise<void>;
  refresh: () => Promise<void>;
  disconnect: () => Promise<void>;
  signIn: (session: Session | null, wallet: WalletType) => Promise<void>;
}

export const useWallet = create<useWalletStore>((set, get) => ({
  wallet: null!,
  browserWallet: null!,

  connect: async ({ name, image }: WalletType) => {
    const browserWallet: BrowserWallet = await BrowserWallet.enable(
      name.toLowerCase(),
    );
    const address = (await browserWallet.getUsedAddresses())[0];
    const balance = await browserWallet.getLovelace();

    set({
      browserWallet: browserWallet,
      wallet: {
        name: name,
        image: image,
        balance: Number(balance),
        address: String(address),
      },
    });
  },

  signIn: async (session: Session | null, wallet: WalletType) => {
    const { name, image } = wallet;
    const browserWallet: BrowserWallet = await BrowserWallet.enable(
      name.toLowerCase(),
    );
    if (!browserWallet) {
      throw new Error("Failed to connect wallet");
    }
    const address = (await browserWallet.getUsedAddresses())[0];
    if (address.length === 0) {
      throw new Error("Cant get address");
    }

    if (isNil(session)) {
      const nonce = await getNonceByAddress(address);
      if (isNil(nonce) || nonce === "") {
        throw new Error("Cant get nonce");
      }
      const signature = await browserWallet.signData(nonce);
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
      const address = (await browserWallet.getUsedAddresses())[0];
      const balance = await browserWallet.getLovelace();
      set({
        browserWallet: browserWallet,
        wallet: {
          name: name,
          image: image,
          balance: Number((Number(balance) / 1_000_000).toPrecision(6)),
          address: String(address),
        },
      });
    }
  },

  refresh: async () => {
    const { browserWallet, wallet } = get();

    const balance = await browserWallet.getLovelace();
    const address = (await browserWallet.getUsedAddresses())[0];

    set({
      wallet: {
        name: wallet.name,
        image: wallet.image,
        balance: Number(balance),
        address: String(address),
      },
    });
  },

  disconnect: async () => {
    set({ browserWallet: null!, wallet: null! });
  },
}));
