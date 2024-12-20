"use server";
import { Cip68Contract } from "@/contract";
import { blockfrostFetcher, koiosFetcher } from "@/lib/cardano";
import { AssetDetails, AssetType } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { hexToString } from "@meshsdk/core";

export async function getWalletAssets({
  walletAddress,
  query = "",
  page = 1,
  limit = 12,
}: {
  walletAddress: string;
  query?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const assetsAddress: AssetType[] = await koiosFetcher.fetchAssetsFromAddress(walletAddress);
    const filteredAssetsAddress = assetsAddress.filter((asset) => asset.policy_id === new Cip68Contract({}).policyId);
    const filteredAssetsAddressQuery = filteredAssetsAddress.filter((asset) => {
      const assetNameString = hexToString(asset.asset_name);
      return assetNameString.toLowerCase().includes(query.toLowerCase());
    });
    const total = filteredAssetsAddressQuery.length;
    const assetsSlice: AssetType[] = filteredAssetsAddressQuery.slice((page - 1) * limit, page * limit);

    const assets: AssetDetails[] = await Promise.all(
      assetsSlice.map(async (assetsSlice) => {
        const assetSpec = await blockfrostFetcher.fetchSpecificAsset(assetsSlice.policy_id + assetsSlice.asset_name);
        return assetSpec as AssetDetails;
      }),
    );
    return {
      data: assets,
      totalItem: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (e) {
    return {
      data: [],
      message: parseError(e),
    };
  }
}
