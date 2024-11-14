"use server";

import { blockfrostFetcher } from "@/lib/cardano";

export const getAssetsByAddress = async (address: string) => {
  try {
    const data = await blockfrostFetcher.fetchAssetsByAddress(address);
    return {
      result: true,
      data: data,
      message: "success",
    };
  } catch (e) {
    return {
      result: false,
      data: null,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
