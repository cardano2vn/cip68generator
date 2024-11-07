"use client";
// import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import useUploadCsvStore, { UploadCsvStore } from "./store";

type UploadCsvContextType = UploadCsvStore & {
  loading: boolean;
  uploadCsv: () => void;
};

export default function UploadCSVProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const { csvContent, setCsvContent } = useUploadCsvStore();

  const uploadCsv = async () => {
    setLoading(true);
    try {
      console.log("Uploading CSV", csvContent);
    } catch (error) {
      console.error("Error uploading CSV", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadCsvContext.Provider
      value={{
        loading: loading,
        csvContent,
        setCsvContent,
        uploadCsv: uploadCsv,
      }}
    >
      {children}
    </UploadCsvContext.Provider>
  );
}

const UploadCsvContext = createContext<UploadCsvContextType>(null!);
export const useUploadCsvContext = function () {
  const context = useContext(UploadCsvContext);
  if (!context) {
    throw new Error(
      "useUploadCsvContext must be used within a UploadCSVProvider",
    );
  }
  return context;
};
