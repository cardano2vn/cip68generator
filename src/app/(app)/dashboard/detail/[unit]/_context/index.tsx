"use client";

import { createContext, useContext } from "react";
import { defineStepper } from "@stepperize/react";
import useUpdateStore, { UpdateStore } from "./store";
import { toast } from "@/hooks/use-toast";
import { useWalletContext } from "@/components/providers/wallet";
import { isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { fetchSpecificAsset } from "@/services/blockchain/getAssetInfo";
import { AssetDetails } from "@/types";

const { useStepper, steps } = defineStepper(
  { id: "metadata", title: "Metadata" },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

type UpdateContextType = UpdateStore & {
  unit: string;
  assetData: AssetDetails;
  // defaultMetadata: AssetMetadata;
  stepper: ReturnType<typeof useStepper>;
  steps: typeof steps;
  startUpdateTing: () => void;
};

export default function UpdateProvider({
  unit,
  children,
}: {
  unit: string;
  children: React.ReactNode;
}) {
  const { signTx, address, submitTx } = useWalletContext();
  const stepper = useStepper();
  const {
    metadataToUpdate,
    setMetadataToUpdate,
    loading,
    setLoading,
    basicInfoToUpdate,
    setBasicInfoToUpdate,
    tasks,
    updateTaskState,
    txhash,
    setTxHash,
  } = useUpdateStore();

  const { data: assetData, isLoading } = useQuery({
    queryKey: ["fetchSpecificAsset", unit],
    queryFn: () => fetchSpecificAsset(unit),
    enabled: !isNil(unit),
  });

  const startUpdateTing = async () => {
    stepper.goTo("transaction");
    try {
      updateTaskState("inprogress", "validate", "Validating Data");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }
      // check assetName is unique
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const input = {
        assetName: basicInfoToUpdate.assetName,
        quantity: basicInfoToUpdate.quantity,
        metadata: metadataToUpdate,
      };
      updateTaskState(
        "inprogress",
        "create_transaction",
        "Creating Transaction",
      );
      // const {
      //   data: tx,
      //   message,
      //   result,
      // } = await createMintTransaction({
      //   address: address,
      //   mintInput: {
      //     assetName: input.assetName,
      //     metadata: input.metadata,
      //     quantity: input.quantity,
      //   },
      // });
      // if (!result || isNil(tx)) {
      //   throw new Error(message);
      // }
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // wait for confirmation
      updateTaskState("inprogress", "sign_transaction", "Waiting for  sign Tx");
      // const signedTx = await signTx(tx);
      updateTaskState(
        "inprogress",
        "submit_transaction",
        "Submitting Transaction",
      );
      // // submit transaction
      // const txHash = await submitTx(signedTx);
      setTxHash("123");
      updateTaskState("success");
      // show result
      stepper.goTo("result");
      // create transaction
    } catch (e) {
      updateTaskState(
        "error",
        "",
        e instanceof Error ? e.message : "unknown error",
      );
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <UpdateContext.Provider
      value={{
        unit,
        assetData: assetData?.data || ({} as AssetDetails),
        // defaultMetadata: assetData?.data?.onchain_metadata || {},
        loading: isLoading,
        setLoading,
        metadataToUpdate,
        setMetadataToUpdate,
        basicInfoToUpdate,
        setBasicInfoToUpdate,
        tasks,
        updateTaskState,
        startUpdateTing,
        txhash,
        setTxHash,
        stepper,
        steps,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
}

const UpdateContext = createContext<UpdateContextType>(null!);
export const useUpdateContext = function () {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error("useUpdateContext must be used within a UpdateProvider");
  }
  return context;
};
