"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import {
  AssetDetails,
  AssetDetailsWithTransactionHistory,
  TransactionHistory,
} from "@/types";
import { isNil } from "lodash";

export const getAssetInfo = async (unit: string) => {
  try {
    const assetDetails: AssetDetails =
      await blockfrostFetcher.fetchSpecificAsset(unit);
    if (isNil(assetDetails)) {
      throw new Error("Asset not found");
    }
    const assetTransactions: TransactionHistory[] =
      await blockfrostFetcher.fetchAssetTransactions(unit);

    const data: AssetDetailsWithTransactionHistory = {
      ...assetDetails,
      transaction_history: assetTransactions,
    };

    return {
      data,
      message: "Success",
    };
  } catch (e) {
    return {
      data: null,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
