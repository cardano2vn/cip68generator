"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider, koiosFetcher } from "@/lib/cardano";
import { AssetDetails, AssetType } from "@/types";
import { convertToKeyValue } from "@/utils";
import { parseError } from "@/utils/error/parse-error";
import { hexToString, MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

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
    if (isNil(walletAddress)) {
      throw new Error("walletAddress is Null");
    }
    const wallet = new MeshWallet({
      networkId: appNetworkId,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: { type: "address", address: walletAddress },
    });
    const cip68Contract: Cip68Contract = new Cip68Contract({ wallet: wallet });

    const assetsAddress: AssetType[] = await koiosFetcher.fetchAssetsFromAddress(walletAddress);
    const filteredAssetsAddress = assetsAddress.filter((asset) => asset.policy_id === cip68Contract.policyId);
    const filteredAssetsAddressQuery = filteredAssetsAddress.filter((asset) => {
      const assetNameString = hexToString(asset.asset_name);
      return assetNameString.toLowerCase().includes(query.toLowerCase());
    });
    const total = filteredAssetsAddressQuery.length;
    const assetsSlice: AssetType[] = filteredAssetsAddressQuery.slice((page - 1) * limit, page * limit);
    const asset_list = assetsSlice.map((asset) => {
      return [asset.policy_id, asset.asset_name]; //replace("'000de140", "000643b0")
    });
    const data = await koiosFetcher.fetchAssetsInfo(asset_list);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assets: AssetDetails[] = data.map((asset: any) => {
      return {
        policy_id: asset.policy_id,
        asset_name: asset.asset_name,
        fingerprint: asset.fingerprint,
        quantity: asset.quantity,
        onchain_metadata: convertToKeyValue(asset.cip68_metadata?.["222"]?.fields[0].map),
        onchain: true,
      };
    });
    return { totalUserAssets: filteredAssetsAddress.length, data: assets, totalItem: total, totalPages: Math.ceil(total / limit), currentPage: page };
  } catch (e) {
    return { data: [], message: parseError(e) };
  }
}
