"use client";

import { createContext, useContext, useState } from "react";
import { defineStepper } from "@stepperize/react";
import { AssetMetadata } from "@meshsdk/core";
const { useStepper, steps } = defineStepper(
  {
    id: "template",
    title: "Template",
  },
  {
    id: "metadata",
    title: "Metadata",
  },
  { id: "preview", title: "Preview" },
  { id: "result", title: "Result" },
);
type MintOneContextType = {
  loading: boolean;
  metadataToMint: AssetMetadata | null;
  setMetadataToMint: (metadata: AssetMetadata) => void;
  stepper: ReturnType<typeof useStepper>;
  steps: typeof steps;
};

export default function MintOneProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const stepper = useStepper();

  const [metadataToMint, setMetadataToMint] = useState<AssetMetadata | null>(
    null,
  );

  return (
    <MintOneContext.Provider
      value={{
        loading: false,
        metadataToMint: metadataToMint,
        setMetadataToMint: setMetadataToMint,
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
