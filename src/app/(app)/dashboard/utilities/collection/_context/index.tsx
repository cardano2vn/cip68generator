"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import useCollectionStore, { CollectionStore } from "./store";
import { getAllCollection } from "@/services/database/collection";
import { useQuery } from "@tanstack/react-query";

type CollectionContextType = CollectionStore & {
  loading: boolean;
};

export default function CollectionProvider({ children }: PropsWithChildren) {
  useState<boolean>(false);
  const {
    listSelected,
    setListSelected,
    createNewDialogOpen,
    toggleCreateNewDialogOpen,
  } = useCollectionStore();
  const { data, isLoading } = useQuery({
    queryKey: ["getCollection"],
    queryFn: () => getAllCollection(),
    refetchInterval: 5000,
  });
  return (
    <CollectionContext.Provider
      value={{
        loading: isLoading,
        listCollection: data?.data || [],
        createNewDialogOpen,
        toggleCreateNewDialogOpen,
        listSelected,
        setListSelected,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

const CollectionContext = createContext<CollectionContextType>(null!);
export const useCollectionContext = function () {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      "useCollectionContext must be used within a CollectionProvider",
    );
  }
  return context;
};
