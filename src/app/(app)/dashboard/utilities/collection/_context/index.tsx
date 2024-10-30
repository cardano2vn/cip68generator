"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

type CollectionContextType = {
  loading: boolean;
  createNewDialogOpen: boolean;
  toggleCreateNewDialogOpen: (open: boolean) => void;
};

export default function CollectionProvider({ children }: PropsWithChildren) {
  const [createNewDialogOpen, toggleCreateNewDialogOpen] =
    useState<boolean>(false);

  return (
    <CollectionContext.Provider
      value={{
        loading: false,
        createNewDialogOpen,
        toggleCreateNewDialogOpen,
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
