"use client";

import { createContext, useContext } from "react";

type AssetDetailsContextType = {
  loading: boolean;
  unit: string;
};

export default function AssetDetailsProvider({
  unit,
  children,
}: {
  unit: string;
  children: React.ReactNode;
}) {
  return (
    <AssetDetailsContext.Provider
      value={{
        loading: false,
        unit,
      }}
    >
      {children}
    </AssetDetailsContext.Provider>
  );
}

const AssetDetailsContext = createContext<AssetDetailsContextType>(null!);
export const useAssetDetailsContext = function () {
  const context = useContext(AssetDetailsContext);
  if (!context) {
    throw new Error(
      "useAssetDetailsContext must be used within a AssetDetailsProvider",
    );
  }
  return context;
};
