import { create } from "zustand";
import { Collection } from "@prisma/client";

export type CollectionStore = {
  listCollection: Collection[];
  listSelected: Collection[];
  createNewDialogOpen: boolean;
  toggleCreateNewDialogOpen: (open: boolean) => void;
  setListSelected: (media: Collection[]) => void;
};

const useCollectionStore = create<CollectionStore>((set) => ({
  listCollection: [],
  listSelected: [],
  createNewDialogOpen: false,
  setListSelected: (media: Collection[]) => set({ listSelected: media }),
  toggleCreateNewDialogOpen: (open: boolean) =>
    set({ createNewDialogOpen: open }),
}));

export default useCollectionStore;
