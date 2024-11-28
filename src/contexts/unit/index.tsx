/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect } from "react";
import { defineStepper } from "@stepperize/react";
import { toast } from "@/hooks/use-toast";
import { useBlockchainContext } from "@/components/providers/blockchain";
import { isEmpty, isNil } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getAssetInfo } from "@/services/blockchain/getAssetInfo";
import { AssetDetailsWithTransactionHistory, TxHistory } from "@/types";
import useUnitStore, { UnitStore } from "./store";
import { redirect } from "next/navigation";
import { createBurnTransaction } from "@/services/contract/burn";
import { deserializeAddress, hexToString } from "@meshsdk/core";
import { createUpdateTransaction } from "@/services/contract/update";
import { getAssetTxHistory } from "@/services/blockchain/get-asset-tx-history";
import { submitTx } from "@/services/blockchain/submitTx";

const { useStepper: useUpdateStepper, steps: updateSteps } = defineStepper(
  { id: "metadata", title: "Metadata" },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

const { useStepper: useBurnStepper, steps: burnSteps } = defineStepper(
  { id: "alert", title: "Alert" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

type UnitContextType = UnitStore & {
  unit: string;
  assetTxHistory: TxHistory[];
  isAuthor: boolean;
  assetDetails: AssetDetailsWithTransactionHistory;
  updateStepper: ReturnType<typeof useUpdateStepper>;
  updateSteps: typeof updateSteps;
  burnStepper: ReturnType<typeof useBurnStepper>;
  burnSteps: typeof burnSteps;
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
  const { signTx, address } = useBlockchainContext();

  const updateStepper = useUpdateStepper();
  const burnStepper = useBurnStepper();
  const {
    metadataToUpdate,
    setMetadataToUpdate,
    loading,
    setLoading,
    tasks,
    updateTaskState,
    txhash,
    setTxHash,
    txCurrentPage,
    txTotalPages,
    setTxCurrentPage,
    resetTasks,
  } = useUnitStore();

  const { data: assetData, isLoading } = useQuery({
    queryKey: ["getAssetInfo", unit],
    queryFn: () => getAssetInfo(unit),
    enabled: !isNil(unit) && !isEmpty(unit),
  });

  const { data: assetTxHistory } = useQuery({
    queryKey: ["getAssetTxHistory", unit, txCurrentPage],
    queryFn: () =>
      getAssetTxHistory({
        unit: unit.replace("000de140", "000643b0"),
        page: txCurrentPage,
        limit: 8,
      }),
    enabled: !isNil(unit),
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (assetData?.data && !isNil(assetData.data.onchain_metadata)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _pk, ...metadata } = assetData.data.onchain_metadata;
      setMetadataToUpdate(metadata);
    } else {
      setMetadataToUpdate({});
    }
  }, [assetData, isLoading]);

  const pubKeyHash = !isNil(address) && deserializeAddress(address)?.pubKeyHash;

  const isAuthor =
    (!isNil(assetData?.data?.onchain_metadata?._pk) &&
      pubKeyHash &&
      assetData?.data?.onchain_metadata?._pk.includes(pubKeyHash)) ||
    (pubKeyHash && pubKeyHash.includes(assetData?.data?.onchain_metadata?._pk));

  const handleUpdate = () => {
    redirect(`/dashboard/${unit}/update`);
  };

  const handleBurn = () => {
    redirect(`/dashboard/${unit}/burn`);
  };

  const startUpdating = async () => {
    resetTasks();
    updateStepper.goTo("transaction");
    try {
      updateTaskState("inprogress", "validate", "Validating Data");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }
      // check assetName is unique
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assetName = hexToString(
        (assetData?.data?.asset_name ?? "").replace(/^000de140/, ""),
      );

      const input = {
        assetName: assetName,
        metadata: metadataToUpdate,
      };

      updateTaskState(
        "inprogress",
        "create_transaction",
        "Creating Transaction",
      );
      const {
        data: tx,
        message,
        result,
      } = await createUpdateTransaction({
        address: address,
        input: {
          assetName: input.assetName,
          metadata: input.metadata,
        },
      });
      if (!result || isNil(tx)) {
        throw new Error(message);
      }
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // wait for confirmation
      updateTaskState("inprogress", "sign_transaction", "Waiting for  sign Tx");
      const signedTx = await signTx(tx);
      updateTaskState(
        "inprogress",
        "submit_transaction",
        "Submitting Transaction",
      );
      // // submit transaction
      const {
        data: txHash,
        result: txResult,
        message: txMessage,
      } = await submitTx(signedTx);
      if (!txResult || isNil(txHash)) {
        throw new Error(txMessage);
      }
      setTxHash(txHash);
      updateTaskState("success");
      // show result
      updateStepper.goTo("result");
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
  const startBurning = async () => {
    resetTasks();
    burnStepper.goTo("transaction");
    try {
      updateTaskState("inprogress", "validate", "Validating Data");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }

      if (isNil(assetData?.data?.asset_name)) {
        throw new Error("Asset not found");
      }
      // check assetName is unique
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const assetName = hexToString(
        (assetData?.data?.asset_name ?? "").replace(/^000de140/, ""),
      );
      const input = {
        assetName: assetName,
        quantity: "-1",
      };

      updateTaskState(
        "inprogress",
        "create_transaction",
        "Creating Transaction",
      );

      const {
        data: tx,
        message,
        result,
      } = await createBurnTransaction({
        address: address,
        input: input,
      });

      if (!result || isNil(tx)) {
        throw new Error(message);
      }
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // wait for confirmation
      updateTaskState("inprogress", "sign_transaction", "Waiting for  sign Tx");
      const signedTx = await signTx(tx);
      updateTaskState(
        "inprogress",
        "submit_transaction",
        "Submitting Transaction",
      );
      // submit transaction
      const {
        data: txHash,
        result: txResult,
        message: txMessage,
      } = await submitTx(signedTx);
      if (!txResult || isNil(txHash)) {
        throw new Error(txMessage);
      }
      setTxHash(txHash);
      updateTaskState("success");
      // show result
      burnStepper.goTo("result");
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
        isAuthor,
        assetDetails: assetData?.data || null!,
        loading: loading,
        assetTxHistory: assetTxHistory?.data || [],
        setLoading,
        metadataToUpdate,
        setMetadataToUpdate,
        tasks,
        resetTasks,
        updateTaskState,
        txhash,
        setTxHash,
        updateStepper,
        updateSteps,
        burnStepper,
        burnSteps,
        handleUpdate,
        handleBurn,
        startUpdating,
        startBurning,
        txCurrentPage,
        txTotalPages,
        setTxCurrentPage,
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
