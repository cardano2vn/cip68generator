import { create } from "zustand";
import { Media } from "@prisma/client";
import { FilterType } from "@/types";
import { filterDefault } from "@/constants";

export type UploadStore = {
  listMedia: Media[];
  listSelected: Media[];
  listFileToUpload: File[];
  uploadOneDialogOpen: boolean;
  currentPage: number;
  totalPages: number;
  filter: FilterType;
  setListSelected: (media: Media[]) => void;
  setUploadOneDialogOpen: (open: boolean) => void;
  setListFileToUpload: (files: File[]) => void;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: FilterType) => void;
};

const useUploadStore = create<UploadStore>((set) => ({
  listMedia: [],
  listSelected: [],
  listFileToUpload: [],
  uploadOneDialogOpen: false,
  currentPage: 1,
  totalPages: 0,
  filter: filterDefault,

  setListSelected: (media: Media[]) => set({ listSelected: media }),
  setUploadOneDialogOpen: (open: boolean) => set({ uploadOneDialogOpen: open }),
  setListFileToUpload: (files: File[]) => set({ listFileToUpload: files }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setFilter: (filter: FilterType) => set({ filter }),
}));

export default useUploadStore;
