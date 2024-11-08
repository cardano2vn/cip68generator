import { create } from "zustand";

export type MintOneStore = {
  loading: boolean;
};

const useMintOneStore = create<MintOneStore>((set) => ({
  loading: false,
}));

export default useMintOneStore;
