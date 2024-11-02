/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-var */
import { Icons } from "@/components/common/icons";
import { BrowserWallet } from "@meshsdk/core";
import { StaticImageData } from "next/image";

export type CardanoNetwork = "mainnet" | "testnet" | "preprod";
declare module "next-auth" {
  interface User {
    address?: string;
    wallet?: string;
  }
}
declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;
}

export type JsonValue = string | number | boolean | JsonObject | JsonArray;
export interface JsonObject {
  [key: string]: JsonValue;
}
export interface JsonArray extends Array<JsonValue> {}
export interface JsonStore {
  jsonBuilder: { [key: string]: JsonValue };
  setJsonBuilder: (newJson: { [key: string]: JsonValue }) => void;
  addField: (path: string[]) => void;
  updateField: (path: string[], value: JsonValue) => void;
  removeField: (path: string[]) => void;
}

export type FilterType = {
  range: DateRange;
  query: string;
};

export type WalletType = {
  name: string;
  image: string | StaticImageData;
  balance?: number;
  address?: string;
  downloadApi?: string;
  api?: () => Promise<void>;
  checkApi?: () => Promise<void>;
};

export type UseWalletHookType = () => {
  name: string;
  connecting: boolean;
  connected: boolean;
  wallet: BrowserWallet;
  connect: (walletName: string, extensions?: number[]) => Promise<void>;
  disconnect: () => void;
  error: unknown;
};

export interface NavItem {
  title: string;
  href: string;
  disabled: boolean;
  icon?: keyof typeof Icons;
}
