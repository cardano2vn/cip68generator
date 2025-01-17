import { Icons } from "@/components/common/icons";
import { Wallet } from "@meshsdk/core";

declare module "next-auth" {
  interface User {
    address?: string;
    wallet?: string;
  }
}

export type FilterType = {
  range: DateRange;
  query: string;
};

export type StatisticType = {
  totalTransaction?: number;
  totalMint?: number;
  totalBurn?: number;
  totalUpdate?: number;
};

export type WalletType = Wallet & {
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

export type PMetadata = {
  id: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
  assetName: string | null;
  content: Record<string, string>;
  nftReference?: string[];
};

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
  onchain_metadata: Record<string, string>;
  onchain_metadata_standard: Record<string, string>;
  onchain_metadata_extra: Record<string, string>;
  metadata: Record<string, string>;
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

export type Transaction = {
  hash: string;
  inputs: Input[];
  outputs: Output[];
};

export type Input = {
  address: string;
  amount: Asset[];
  tx_hash: string;
  output_index: number;
  data_hash?: string;
  inline_datum?: string;
  reference_script_hash?: string;
  collateral: boolean;
  reference: boolean;
};

export type Output = {
  address: string;
  amount: Asset[];
  output_index: number;
  data_hash?: string;
  inline_datum?: string;
  reference_script_hash?: string;
  collateral: boolean;
  consumed_by_tx?: string;
};

export type Asset = {
  unit: string;
  quantity: string;
};

export type TransactionAsset = {
  tx_hash: string;
  tx_index: number;
  block_height: number;
  block_time: number;
};

export type SpecialTransaction = {
  hash: string;
  block: string;
  block_height: number;
  block_time: number;
  slot: number;
  index: number;
  output_amount: Asset[];
  fees: string;
  deposit: string;
  size: number;
  invalid_before: string | null;
  invalid_hereafter: string | null;
  utxo_count: number;
  withdrawal_count: number;
  mir_cert_count: number;
  delegation_count: number;
  stake_cert_count: number;
  pool_update_count: number;
  pool_retire_count: number;
  asset_mint_or_burn_count: number;
  redeemer_count: number;
  valid_contract: boolean;
};

export interface KeyValuePair {
  key: string;
  value: string;
}

export type TxHistory = {
  txHash: string;
  datetime: number;
  fee: string;
  status: string;
  action: string;
};

export type AssetInput = {
  assetName: string;
  metadata?: Record<string, string>;
  quantity?: string;
  receiver?: string;
};

export interface Amount {
  unit: string;
  quantity: string;
}
// @typescript-eslint/no-explicit-any
export interface UtXO {
  address: string;
  tx_hash: string;
  output_index: number;
  amount: Amount[];
  block: string;
  data_hash: string | null;
  inline_datum: string | null;
  reference_script_hash: string | null;
}
