import { create } from "zustand";
import { AssetDetails } from "@/types";

export type ProfileStore = {
  listNft: AssetDetails[];
};

const useProfileStore = create<ProfileStore>(() => ({
  listNft: [],
}));

export default useProfileStore;
