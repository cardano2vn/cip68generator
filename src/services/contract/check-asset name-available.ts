"use server";

import { Cip68Contract } from "@/contract";

export const checkAssetNameAvailable = async ({ assetName, walletAddress }: { assetName: string; walletAddress: string }) => {
  try {
    const result = await new Cip68Contract({}).checkAssetNameAvailable({ assetName, walletAddress });
    if (!result || result === null) {
      throw new Error("Asset name not available");
    }
    return {
      result: true,
      message: "Asset name available",
    };
  } catch (e) {
    return {
      result: false,
      message: e instanceof Error ? e.message : "unknown error",
    };
  }
};