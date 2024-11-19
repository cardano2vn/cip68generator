"use server";
import { nftPoicyId } from "@/contract";
import { blockfrostFetcher, koiosFetcher } from "@/lib/cardano";
import { AssetDetails, AssetType } from "@/types";

export async function getWalletAssets({
  walletAddress,
  page = 1,
  limit = 12,
}: {
  walletAddress: string;
  page?: number;
  limit?: number;
}) {
  try {
    const assetsAddress: AssetType[] =
      await koiosFetcher.fetchAssetsFromAddress(walletAddress);
    assetsAddress.filter((asset) => asset.policy_id != nftPoicyId);
    const total = assetsAddress.length;
    const assetsSlice: AssetType[] = assetsAddress.slice(
      (page - 1) * limit,
      page * limit,
    );

    const assets: AssetDetails[] = await Promise.all(
      assetsSlice.map(async (assetsSlice) => {
        const assetSpec = await blockfrostFetcher.fetchSpecificAsset(
          assetsSlice.policy_id + assetsSlice.asset_name,
        );
        return assetSpec as AssetDetails;
      }),
    );
    return {
      data: assets,
      totalItem: total,
      totalPage: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (e) {
    return {
      data: [],
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
