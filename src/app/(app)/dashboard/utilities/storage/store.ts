"use client";

import { Media } from "@prisma/client";
import { create } from "zustand";

type UploadStore = {
  listMedia: Media[];
  listSelected: Media[];
  setListMedia: (media: Media[]) => void;
  setListSelected: (media: Media[]) => void;
};

export const useUploadStore = create<UploadStore>((set) => ({
  listMedia: [],
  listSelected: [],
  setListMedia: (media) => set({ listMedia: media }),
  setListSelected: (media) => set({ listSelected: media }),
}));
