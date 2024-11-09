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
  tasks: [
    {
      name: "validate";
      content: "Validate Data";
      status: "todo" | "inprogress" | "success" | "error";
    },
    {
      name: "create_transaction";
      content: "Create Transaction";
      status: "todo" | "inprogress" | "success" | "error";
    },
    {
      name: "wait_for_confirmation";
      content: "Wait for Confirmation";
      status: "todo" | "inprogress" | "success" | "error";
    },
    {
      name: "submit_transaction";
      content: "Submit Transaction";
      status: "todo" | "inprogress" | "success" | "error";
    },
  ];
  updateTaskState: (
    name: string,
    status: "todo" | "inprogress" | "success" | "error",
  ) => void;
  txhash: string;
  setTxHash: (txhash: string) => void;
};

const useMintOneStore = create<MintOneStore>((set) => ({
  loading: false,
  metadataToMint: null,
  basicInfoToMint: {
    assetName: "",
    quantity: "1",
  },
  txhash: "",
  tasks: [
    {
      name: "validate",
      content: "Validate Data",
      status: "todo",
    },
    {
      name: "create_transaction",
      content: "Create Transaction",
      status: "todo",
    },
    {
      name: "wait_for_confirmation",
      content: "Wait for Confirmation",
      status: "todo",
    },
    {
      name: "submit_transaction",
      content: "Submit Transaction",
      status: "todo",
    },
  ],
  setTxHash: (txhash) => set({ txhash }),
  setBasicInfoToMint: (basicInfo) => set({ basicInfoToMint: basicInfo }),
  setLoading: (loading) => set({ loading }),
  setMetadataToMint: (metadata) => set({ metadataToMint: metadata }),
  updateTaskState: (name, status) => {
    set((state) => {
      const tasks = state.tasks.map((task) => {
        if (task.name === name) {
          return { ...task, status };
        }
        return task;
      }) as MintOneStore["tasks"];

      return { tasks };
    });
  },
}));

export default useMintOneStore;
