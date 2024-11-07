import { create } from "zustand";
export type UploadCsvStore = {
  csvContent: string[][];
  csvName: string;
  setCsvContent: (name: string, content: string[][]) => void;
};

const useUploadCsvStore = create<UploadCsvStore>((set) => ({
  csvContent: null!,
  csvName: null!,
  setCsvContent: (name: string, content: string[][]) =>
    set({ csvContent: content, csvName: name }),
}));

export default useUploadCsvStore;
