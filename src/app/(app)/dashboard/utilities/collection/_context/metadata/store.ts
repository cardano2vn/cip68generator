import { create } from "zustand";
import { Metadata } from "@prisma/client";
import { FilterType } from "@/types";
import { filterDefault } from "@/constants";

export type MetadataStore = {
  listMetadata: Metadata[];
  setListMetadata: (media: Metadata[]) => void;
  listSelected: Metadata[];
  setListSelected: (media: Metadata[]) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const useMetadataStore = create<MetadataStore>((set) => ({
  listMetadata: [],
  listSelected: [],
  currentPage: 1,
  totalPages: 0,
  filter: filterDefault,
  setFilter: (filter: FilterType) => set({ filter }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setListMetadata: (media: Metadata[]) => set({ listMetadata: media }),
  setListSelected: (media: Metadata[]) => set({ listSelected: media }),
}));

export default useMetadataStore;
