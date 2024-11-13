import { AssetMetadata } from "@meshsdk/core";
import { create } from "zustand";

export type MintOneStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  metadataToMint: AssetMetadata | null;
  setMetadataToMint: (metadata: AssetMetadata) => void;
  basicInfoToMint: {
    assetName: string;
    quantity: string;
  };
  setBasicInfoToMint: (basicInfo: {
    assetName: string;
    quantity: string;
  }) => void;
};

const useMintOneStore = create<MintOneStore>((set) => ({
  loading: false,
  metadataToMint: null,
  basicInfoToMint: {
    assetName: "",
    quantity: "1",
  },
  setBasicInfoToMint: (basicInfo) => set({ basicInfoToMint: basicInfo }),
  setLoading: (loading) => set({ loading }),
  setMetadataToMint: (metadata) => set({ metadataToMint: metadata }),
}));

export default useMintOneStore;
