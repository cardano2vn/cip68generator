"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import useMetadataStore, { MetadataStore } from "./store";
import { useQuery } from "@tanstack/react-query";

type MetadataContextType = MetadataStore & {
  loading: boolean;
};

export default function MetadataProvider({
  collectionId,
  children,
}: {
  collectionId: string;
  children: React.ReactNode;
}) {
  useState<boolean>(false);

  const { listSelected, setListSelected } = useMetadataStore();

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getMetadata"],
  //   queryFn: () => getAllMetadata(),
  //   refetchInterval: 5000,
  // });

  return (
    <MetadataContext.Provider
      value={{
        loading: false,
        listMetadata: [],
        listSelected,
        setListSelected,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
}

const MetadataContext = createContext<MetadataContextType>(null!);
export const useMetadataContext = function () {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error(
      "useMetadataContext must be used within a MetadataProvider",
    );
  }
  return context;
};
