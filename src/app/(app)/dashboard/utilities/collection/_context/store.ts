import { create } from "zustand";
import { Collection } from "@prisma/client";

export type CollectionStore = {
  listCollection: Collection[];
  listSelected: Collection[];
  setListSelected: (media: Collection[]) => void;
};

const useCollectionStore = create<CollectionStore>((set) => ({
  listCollection: [],
  listSelected: [],
  setListSelected: (media: Collection[]) => set({ listSelected: media }),
}));

export default useCollectionStore;
