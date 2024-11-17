"use server";
import { blockfrostFetcher, koiosFetcher } from "@/lib/cardano";

type JSONObject = { [key: string]: string | JSONObject | JSONArray };
type JSONArray = (string | JSONObject | JSONArray)[];

export async function getWalletAssets({
  page,
  pageSize,
  walletAddress,
}: {
  page: number;
  pageSize: number;
  walletAddress: string;
}) {
  try {
    const assetsAddress =
      await koiosFetcher.fetchAssetsFromAddress(walletAddress);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalPage = Math.ceil(assetsAddress.length / Number(pageSize));
    const assetsSlice = [...assetsAddress].slice(
      (Number(page) - 1) * Number(pageSize),
      Number(page) * Number(pageSize),
    );

    const assets = await Promise.all(
      assetsSlice.map(async (assetsSlice) => {
        const assetSpec = await blockfrostFetcher.fetchSpecificAsset(
          assetsSlice.policy_id + assetsSlice.asset_name,
        );
        return assetSpec;
      }),
    );
    return {
      result: true,
      data: assets,
      message: "success",
    };
  } catch (e) {
    return {
      result: false,
      data: null,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
