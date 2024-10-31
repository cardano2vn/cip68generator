import { create } from "zustand";
import { Metadata } from "@prisma/client";

export type MetadataStore = {
  listMetadata: Metadata[];
  listSelected: Metadata[];
  setListSelected: (media: Metadata[]) => void;
};

const useMetadataStore = create<MetadataStore>((set) => ({
  listMetadata: [],
  listSelected: [],
  setListSelected: (media: Metadata[]) => set({ listSelected: media }),
}));

export default useMetadataStore;
