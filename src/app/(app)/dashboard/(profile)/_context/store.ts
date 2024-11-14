import { create } from "zustand";
import { Asset } from "@meshsdk/core";

export type ProfileStore = {
  listNft: Asset[];
};

const useProfileStore = create<ProfileStore>(() => ({
  listNft: [],
}));

export default useProfileStore;
