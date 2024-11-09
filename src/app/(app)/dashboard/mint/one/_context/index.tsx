"use client";

import { createContext, useContext } from "react";
import { defineStepper } from "@stepperize/react";
import useMintOneStore, { MintOneStore } from "./store";
import { toast } from "@/hooks/use-toast";
import { createMintTransaction } from "@/services/contract/mint";
import { useWalletContext } from "@/components/providers/wallet";
import { isNil } from "lodash";
const { useStepper, steps } = defineStepper(
  {
    id: "template",
    title: "Template",
  },
  {
    id: "basic",
    title: "Basic",
  },
  {
    id: "metadata",
    title: "Metadata",
  },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);
type MintOneContextType = MintOneStore & {
  stepper: ReturnType<typeof useStepper>;
  steps: typeof steps;
  startMinting: () => void;
};

export default function MintOneProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signTx, address, submitTx } = useWalletContext();
  const stepper = useStepper();
  const {
    metadataToMint,
    setMetadataToMint,
    loading,
    setLoading,
    basicInfoToMint,
    setBasicInfoToMint,
    tasks,
    updateTaskState,
    txhash,
    setTxHash,
  } = useMintOneStore();

  const startMinting = async () => {
    stepper.goTo("transaction");
    try {
      updateTaskState("validate", "inprogress");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }
      // check assetName is unique
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const input = {
        assetName: basicInfoToMint.assetName,
        quantity: basicInfoToMint.quantity,
        metadata: metadataToMint,
      };
      updateTaskState("validate", "success");
      updateTaskState("create_transaction", "inprogress");
      const tx = await createMintTransaction({
        address: address,
        mintInput: {
          assetName: input.assetName,
          metadata: input.metadata,
          quantity: input.quantity,
        },
      });
      updateTaskState("create_transaction", "success");
      // wait for confirmation
      updateTaskState("wait_for_confirmation", "inprogress");
      const signedTx = await signTx(tx);
      updateTaskState("wait_for_confirmation", "success");
      updateTaskState("submit_transaction", "inprogress");
      // submit transaction
      const txHash = await submitTx(signedTx);
      setTxHash(txHash);
      updateTaskState("submit_transaction", "success");
      // show result
      stepper.goTo("result");
      // create transaction
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <MintOneContext.Provider
      value={{
        loading,
        setLoading,
        metadataToMint,
        setMetadataToMint,
        basicInfoToMint,
        setBasicInfoToMint,
        tasks,
        updateTaskState,
        startMinting,
        txhash,
        setTxHash,
        stepper,
        steps,
      }}
    >
      {children}
    </MintOneContext.Provider>
  );
}

const MintOneContext = createContext<MintOneContextType>(null!);
export const useMintOneContext = function () {
  const context = useContext(MintOneContext);
  if (!context) {
    throw new Error("useMintOneContext must be used within a MintOneProvider");
  }
  return context;
};
