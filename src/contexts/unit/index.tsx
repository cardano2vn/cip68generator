/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect } from "react";
import { defineStepper } from "@stepperize/react";
import { toast } from "@/hooks/use-toast";
import { useWalletContext } from "@/components/providers/wallet";
import { isEmpty, isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { fetchSpecificAsset } from "@/services/blockchain/getAssetInfo";
import { AssetDetails } from "@/types";
import useUnitStore, { UnitStore } from "./store";
import { useJsonBuilderStore } from "@/components/common/json-builder/store";
import { redirect } from "next/navigation";

const { useStepper, steps } = defineStepper(
  { id: "metadata", title: "Metadata" },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

type UnitContextType = UnitStore & {
  unit: string;
  assetDetails: AssetDetails;
  updateStepper: ReturnType<typeof useStepper>;
  updateSteps: typeof steps;
  handleUpdate: () => void;
  handleBurn: () => void;
  startUpdating: () => void;
  startBurning: () => void;
};

export default function UnitProvider({
  unit,
  children,
}: {
  unit: string;
  children: React.ReactNode;
}) {
  const { signTx, address, submitTx } = useWalletContext();
  const { jsonContent, setJsonContent } = useJsonBuilderStore();

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
  } = useUnitStore();

  const { data: assetData, isLoading } = useQuery({
    queryKey: ["fetchSpecificAsset", unit],
    queryFn: () => fetchSpecificAsset(unit),
    enabled: !isNil(unit),
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isNil(jsonContent) || isEmpty(jsonContent)) {
      if (!isNil(metadataToUpdate) || !isEmpty(metadataToUpdate)) {
        setJsonContent(metadataToUpdate);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { author_pk, ...metadata } =
        assetData?.data?.onchain_metadata || {};
      setJsonContent(metadata);
    }
  }, [assetData]);

  const handleUpdate = () => {
    redirect(`/dashboard/${unit}/update`);
  };

  const handleBurn = () => {
    redirect(`/dashboard/${unit}/burn`);
  };

  const startUpdating = async () => {
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
    <UnitContext.Provider
      value={{
        unit,
        assetDetails: assetData?.data || ({} as AssetDetails),
        loading: loading,
        setLoading,
        metadataToUpdate,
        setMetadataToUpdate,
        basicInfoToUpdate,
        setBasicInfoToUpdate,
        tasks,
        updateTaskState,
        startUpdating,
        txhash,
        setTxHash,
        updateStepper: stepper,
        updateSteps: steps,
        handleUpdate: handleUpdate,
        handleBurn: handleBurn,
        startBurning: () => {},
      }}
    >
      {children}
    </UnitContext.Provider>
  );
}

const UnitContext = createContext<UnitContextType>(null!);
export const useUnitContext = function () {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnitContext must be used within a UnitProvider");
  }
  return context;
};
