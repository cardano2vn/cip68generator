/* eslint-disable @typescript-eslint/no-unused-vars */
import { blockfrostFetcher, koiosFetcher } from "@/lib/cardano";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page: string = searchParams.get("page") as string;
  const pageSize: string = searchParams.get("page_size") as string;
  const walletAddress = searchParams.get("wallet_address") as string;

  // const blockfrostFetcher =
  const assetsAddress =
    await koiosFetcher.fetchAssetsFromAddress(walletAddress);
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

  return Response.json(assets);
}

// Define the JSON object type
type JSONObject = { [key: string]: string | JSONObject | JSONArray };
type JSONArray = (string | JSONObject | JSONArray)[];
