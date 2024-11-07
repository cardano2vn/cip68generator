import { create } from "zustand";
export type UploadCsvStore = {
  csvContent: string[][];
  setCsvContent: (csvContent: string[][]) => void;
};

const useUploadCsvStore = create<UploadCsvStore>((set) => ({
  csvContent: null!,
  setCsvContent: (csvContent: string[][]) => set({ csvContent: csvContent }),
}));

export default useUploadCsvStore;
