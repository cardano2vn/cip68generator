import { Task } from "@/types";
import { AssetMetadata } from "@meshsdk/core";
import { isEmpty } from "lodash";
import { create } from "zustand";

export type UnitStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  metadataToUpdate: AssetMetadata | null;
  setMetadataToUpdate: (metadata: AssetMetadata) => void;
  basicInfoToUpdate: {
    assetName: string;
    quantity: string;
  };
  setBasicInfoToUpdate: (basicnfo: {
    assetName: string;
    quantity: string;
  }) => void;
  tasks: Task[];
  updateTaskState: (
    status: "todo" | "inprogress" | "success" | "error",
    name?: string,
    content?: string,
  ) => void;
  txhash: string;
  setTxHash: (txhash: string) => void;
};

const useUnitStore = create<UnitStore>((set) => ({
  loading: false,
  metadataToUpdate: null,
  basicInfoToUpdate: {
    assetName: "",
    quantity: "1",
  },
  txhash: "",
  tasks: [],
  setTxHash: (txhash) => set({ txhash }),
  setBasicInfoToUpdate: (basicInfo) => set({ basicInfoToUpdate: basicInfo }),
  setLoading: (loading) => set({ loading }),
  setMetadataToUpdate: (metadata) => set({ metadataToUpdate: metadata }),
  updateTaskState: (status, name = "", content = "") => {
    set((state) => {
      const tasks = [...state.tasks];
      if (status === "error" || isEmpty(name)) {
        const lastTaskIndex = tasks.length - 1;
        if (lastTaskIndex >= 0) {
          tasks[lastTaskIndex] = {
            ...tasks[lastTaskIndex],
            status,
          };
        }
      } else {
        const taskIndex = tasks.findIndex((task) => task.name === name);
        if (taskIndex < 0) {
          if (tasks.length !== 0) {
            const lastTaskIndex = tasks.length - 1;
            tasks[lastTaskIndex] = {
              ...tasks[lastTaskIndex],
              status: "success",
            };
          }
          tasks.push({ name, content, status });
        } else {
          if (taskIndex > 0) {
            tasks[taskIndex - 1] = {
              ...tasks[taskIndex - 1],
              status: "success",
            };
          }
          if (isEmpty(content)) {
            tasks[taskIndex] = { ...tasks[taskIndex], status };
          } else {
            tasks[taskIndex] = { ...tasks[taskIndex], status, content };
          }
        }
      }

      return { tasks };
    });
  },
}));

export default useUnitStore;
