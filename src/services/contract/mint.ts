import { appNetworkId, MINT_REFERENCE_SCRIPT_ADDRESS } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { AssetMetadata, MeshTxBuilder, MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export const createMintTransaction = async ({
  address,
  mintInput,
}: {
  address: string;
  mintInput: {
    assetName: string;
    metadata: AssetMetadata;
    quantity: string;
  };
}) => {
  if (isNil(address)) {
    throw new Error("User not found");
  }
  const wallet = new MeshWallet({
    networkId: appNetworkId,
    fetcher: blockfrostProvider,
    submitter: blockfrostProvider,
    key: {
      type: "address",
      address: address,
    },
  });
  const txBuilder = new MeshTxBuilder({
    fetcher: blockfrostProvider,
    evaluator: blockfrostProvider,
  });
  const cip68Contract: Cip68Contract = new Cip68Contract({
    fetcher: blockfrostProvider,
    wallet: wallet,
    meshTxBuilder: txBuilder,
  });

  const tx = await cip68Contract.mint(mintInput);
  return tx;
};
