import { create } from "zustand";
import { Collection } from "@prisma/client";

export type CollectionStore = {
  listFolder: Collection[];
  listSelected: Collection[];
  setListSelected: (media: Collection[]) => void;
};

const useCollectionStore = create<CollectionStore>((set) => ({
  listFolder: [],
  listSelected: [],

  setListSelected: (media: Collection[]) => set({ listSelected: media }),
}));

export default useCollectionStore;
