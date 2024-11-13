"use client";

import { createContext, useContext } from "react";
import { defineStepper } from "@stepperize/react";
import useMintOneStore, { MintOneStore } from "./store";
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
};

export default function MintOneProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const stepper = useStepper();
  const {
    metadataToMint,
    setMetadataToMint,
    loading,
    setLoading,
    basicInfoToMint,
    setBasicInfoToMint,
  } = useMintOneStore();

  return (
    <MintOneContext.Provider
      value={{
        loading,
        setLoading,
        metadataToMint,
        setMetadataToMint,
        basicInfoToMint,
        setBasicInfoToMint,
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
