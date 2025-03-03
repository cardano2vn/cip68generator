"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { isEmpty, isNil } from "lodash";
import { createCollectionWithData } from "@/services/database/collection";
import { useRouter } from "next/navigation";
import { convertObject } from "@/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { parseError } from "@/utils/error/parse-error";

type UploadCsvContextType = {
  loading: boolean;
  uploadCsv: (input: { csvContent: string[][]; csvName: string }) => void;
};

export default function UploadCSVProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const uploadCsv = async ({ csvContent, csvName }: { csvContent: string[][]; csvName: string }) => {
    setLoading(true);

    try {
      if (isNil(csvContent) || isEmpty(csvContent)) {
        throw new Error("CSV content is empty");
      }
      const listAssetInput = convertObject(csvContent);

      const { result, message, data } = await createCollectionWithData({
        collectionName: csvName,
        listAssetInput,
      });
      if (!result || isNil(data)) {
        throw new Error(message);
      }
      toast({
        title: "Your asset collection has been created successfully",
        description: <Button onClick={() => router.push(routes.utilities.children.collection.redirect + `/${data.id}`)}>Go to Collection</Button>,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadCsvContext.Provider
      value={{
        loading: loading,
        uploadCsv,
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
    throw new Error("useUploadCsvContext must be used within a UploadCSVProvider");
  }
  return context;
};
