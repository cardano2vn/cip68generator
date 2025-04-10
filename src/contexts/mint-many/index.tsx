"use client";

import { createContext, useContext } from "react";
import { toast } from "@/hooks/use-toast";
import { isEmpty, isNil } from "lodash";
import { submitTx } from "@/services/blockchain/submitTx";
import { defineStepper } from "@stepperize/react";
import useMintManyStore, { MintManyStore } from "./store";
import { useWallet } from "@/hooks/use-wallet";
import { convertObject } from "@/utils";
import { createMintTransaction } from "@/services/contract/mint";
import { parseError } from "@/utils/error/parse-error";
import { decialPlace } from "@/constants";

const { useStepper: useMintManyStepper, steps: mintManySteps } = defineStepper(
  { id: "upload", title: "Upload" },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

type MintManyContextType = MintManyStore & {
  mintManyStepper: ReturnType<typeof useMintManyStepper>;
  mintManySteps: typeof mintManySteps;
  uploadCsv: (input: { csvContent: string[][]; csvName: string }) => void;
  startMinting: () => void;
};

export default function MintManyProvider({ children }: { collectionId: string | null; children: React.ReactNode }) {
  const { signTx, address, getUtxos } = useWallet();
  const mintManyStepper = useMintManyStepper();
  const { updateTaskState, setTxHash, resetTasks, setLoading, setAssetInputToMint, assetInputToMint } = useMintManyStore();

  const uploadCsv = async ({
    csvContent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    csvName,
  }: {
    csvContent: string[][];
    csvName: string;
  }) => {
    setLoading(true);

    try {
      if (isNil(csvContent) || isEmpty(csvContent)) {
        throw new Error("CSV content is empty");
      }
      setAssetInputToMint(convertObject(csvContent));
    } catch (e) {
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      mintManyStepper.goTo("preview");
    }
  };

  const startMinting = async () => {
    resetTasks();
    mintManyStepper.goTo("transaction");
    try {
      updateTaskState("inprogress", "validate", "Validating Data");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }

      if (isNil(assetInputToMint) && isEmpty(assetInputToMint)) {
        throw new Error("Data is required");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const lovelaceRequire = 100;
      updateTaskState("inprogress", "create_transaction", "Creating Transaction");
      const utxos = await getUtxos();
      const utxoOnlyLovelace = await Promise.all(
        utxos.filter((utxo) => {
          const hasOnlyLovelace = utxo.output.amount.every((amount) => amount.unit === "lovelace");
          const hasEnoughLovelace = utxo.output.amount.some(
            (amount) => amount.unit === "lovelace" && Number(amount.quantity) >= lovelaceRequire * decialPlace,
          );
          return hasOnlyLovelace && hasEnoughLovelace;
        }),
      );
      let utxoIndex = 0;
      const chunkSize = 10;
      if (utxoOnlyLovelace.length < assetInputToMint.length / chunkSize) {
        throw new Error("You have not UTxO only lavelace and Each UTxO must have 100 ada");
      }

      if (chunkSize < assetInputToMint.length) {
        toast({
          title: "Transactions",
          description: `Your transaction needs to be split into ${Math.ceil(assetInputToMint.length / chunkSize)} transactions due to data security reasons.`,
          variant: "destructive",
        });
      }
      for (let i = 0; i < assetInputToMint.length; i += chunkSize) {
        const chunk = assetInputToMint.slice(i, i + Math.min(chunkSize, assetInputToMint.length - i));
        const {
          data: unsignedTx,
          result,
          message,
        } = await createMintTransaction({
          address: address,
          mintInput: chunk,
          utxo: utxoOnlyLovelace[utxoIndex],
        });
        if (!result || isNil(unsignedTx)) {
          throw new Error(message);
        }

        const signedTx = await signTx(unsignedTx);

        const { data: txHash, result: txResult, message: txMessage } = await submitTx(signedTx);
        if (!txResult || isNil(txHash)) {
          throw new Error(txMessage);
        }
        setTxHash(txHash);
        utxoIndex++;
      }

      updateTaskState("inprogress", "sign_transaction", "Waiting for  sign Tx");
      updateTaskState("inprogress", "submit_transaction", "Submitting Transaction");
      updateTaskState("success");
      mintManyStepper.goTo("result");
      // create transaction
    } catch (e) {
      updateTaskState("error", "", parseError(e));
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    }
  };

  return (
    <MintManyContext.Provider
      value={{
        ...useMintManyStore(),
        mintManyStepper,
        mintManySteps,
        uploadCsv,
        startMinting,
      }}
    >
      {children}
    </MintManyContext.Provider>
  );
}

const MintManyContext = createContext<MintManyContextType>(null!);
export const useMintManyContext = function () {
  const context = useContext(MintManyContext);
  if (!context) {
    throw new Error("useMintManyContext must be used within a MintManyProvider");
  }
  return context;
};
