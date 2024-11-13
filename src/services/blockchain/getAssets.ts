"use server";

import { blockfrostFetcher } from "@/lib/cardano";

export const getAssetsByAddress = async (address: string) => {
  return await blockfrostFetcher.fetchAssetsByAddress(address);
};
