"use server";

import blockfrostFetcher from "@/lib/cardano/blockfrost/fetcher";

export const getAssetsByAddress = async (address: string) => {
  return await blockfrostFetcher.fetchAssetsByAddress(address);
};
