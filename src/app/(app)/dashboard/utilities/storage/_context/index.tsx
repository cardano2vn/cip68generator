"use client";

import { Media } from "@prisma/client";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type useUploadStore = {
  listMedia: Media[];
  listSelected: Media[];
  setListMedia: (media: Media[]) => void;
  setListSelected: (media: Media[]) => void;
};

export default function UploadProvider({ children }: PropsWithChildren) {
  const [listMedia, setListMedia] = useState<Media[]>([]);
  const [listSelected, setListSelected] = useState<Media[]>([]);
  return (
    <UploadContext.Provider
      value={{
        listMedia: listMedia,
        listSelected: listSelected,
        setListMedia: setListMedia,
        setListSelected: setListSelected,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

const UploadContext = createContext<useUploadStore>(null!);
export const useUploadContext = function () {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within a UploadProvider");
  }
  return context;
};
