"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import { AssetDetails } from "@/types";
import { isNil } from "lodash";

export const fetchSpecificAsset = async (unit: string) => {
  try {
    const data: AssetDetails = await blockfrostFetcher.fetchSpecificAsset(unit);
    if (isNil(data)) {
      throw new Error("Asset not found");
    }
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
