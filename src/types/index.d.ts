/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Icons } from "@/components/common/icons";
import { AssetMetadata, BrowserWallet } from "@meshsdk/core";
import { StaticImageData } from "next/image";
declare module "next-auth" {
  interface User {
    address?: string;
    wallet?: string;
  }
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

export type AssetType = {
  address: string;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  decimals: number;
  quantity: string;
};

export type AssetDetails = {
  asset: string;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
  onchain_metadata: AssetMetadata;
  onchain_metadata_standard: AssetMetadata;
  onchain_metadata_extra: AssetMetadata;
  metadata: AssetMetadata;
};

export type TransactionHistory = {
  tx_hash: string;
  tx_index: number;
  block_height: number;
  block_time: number;
};

export type AssetDetailsWithTransactionHistory = AssetDetails & {
  transaction_history: TransactionHistory[];
};

export type Task = {
  name: string;
  content: string;
  status: "todo" | "inprogress" | "success" | "error";
};
