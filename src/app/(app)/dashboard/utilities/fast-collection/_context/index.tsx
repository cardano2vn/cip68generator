"use client";
// import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import useUploadCsvStore, { UploadCsvStore } from "./store";
import { isEmpty, isNil } from "lodash";
import { convertObject } from "@/utils";
import { createCollectionWithData } from "@/services/database/collection";
import { redirect } from "next/navigation";

type UploadCsvContextType = UploadCsvStore & {
  loading: boolean;
  uploadCsv: () => void;
};

export default function UploadCSVProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const { csvContent, setCsvContent, csvName } = useUploadCsvStore();
  const uploadCsv = async () => {
    setLoading(true);

    try {
      if (isNil(csvContent) || isEmpty(csvContent)) {
        throw new Error("CSV content is empty");
      }
      const listMetadata = convertObject(csvContent);
      const { result, message, data } = await createCollectionWithData({
        collectionName: csvName,
        listMetadata: listMetadata,
      });
      if (!result || isNil(data)) {
        throw new Error(message);
      }
      redirect(`/dashboard/collection/${data.id}`);
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
        csvName,
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
