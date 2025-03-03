"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import { AssetDetails, AssetDetailsWithTransactionHistory, TransactionAsset, TransactionHistory } from "@/types";
import { datumToJson } from "@/utils";
import { parseError } from "@/utils/error/parse-error";
import { isNil } from "lodash";

export const getAssetInfo = async (unit: string) => {
  try {
    const assetDetails: AssetDetails = await blockfrostFetcher.fetchSpecificAsset(unit);
    if (isNil(assetDetails)) {
      throw new Error("Asset not found");
    }
    const assetTxs: TransactionAsset[] = await blockfrostFetcher.fetchAssetTransactions(unit);
    const transaction = await blockfrostFetcher.fetchTransactionsUTxO(assetTxs[0].tx_hash);

    const assetOutput = transaction.outputs.find(function (output) {
      const asset = output.amount.find(function (amt) {
        return amt.unit === unit;
      });
      return asset !== undefined;
    });

    const metadata = assetOutput?.inline_datum
      ? ((await datumToJson(assetOutput.inline_datum, {
          contain_pk: true,
        })) as Record<string, string>)
      : {};
    const assetTransactions: TransactionHistory[] = await blockfrostFetcher.fetchAssetTransactions(unit);

    const data: AssetDetailsWithTransactionHistory = {
      ...assetDetails,
      metadata: metadata,
      transaction_history: assetTransactions,
    };

    return {
      data,
      message: "Success",
    };
  } catch (e) {
    return {
      data: null,
      message: parseError(e),
    };
  }
};
