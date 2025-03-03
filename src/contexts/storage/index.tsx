/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "@/hooks/use-toast";
import { deleteMedia, getMedia } from "@/services/database/media";
import { uploadIPFS } from "@/services/upload";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import useUploadStore, { UploadStore } from "./store";

type UploadContextType = UploadStore & {
  uploadFiles: () => void;
  deleteMediaSelected: () => any;
  loading: boolean;
  refetch: () => void;
  setloading: (loading: boolean) => void;
};

export default function UploadProvider({ children }: PropsWithChildren) {
  const [loading, setloading] = useState(false);
  const {
    currentPage,
    setCurrentPage,
    setListSelected,
    setUploadOneDialogOpen,
    setListFileToUpload,
    setFilter,
    listFileToUpload,
    listSelected,
    uploadOneDialogOpen,
    filter,
  } = useUploadStore();

  const {
    data: listMedia,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getMedia", currentPage, filter],
    queryFn: () => getMedia({ page: currentPage, query: filter.query, range: filter.range }),
  });

  useEffect(() => {
    setListSelected([]);
  }, [listMedia, setListSelected]);

  const uploadFiles = async () => {
    setloading(true);
    if (listFileToUpload) {
      const formData = new FormData();
      Array.from(listFileToUpload).forEach((file) => {
        formData.append("file", file);
      });
      const { result, message } = await uploadIPFS(formData);
      if (result) {
        toast({ title: "success", variant: "default", description: " Your media file has been uploaded successfully" });
        setListFileToUpload([]);
      } else {
        toast({ title: "Error", description: message, variant: "destructive" });
      }
    }
    setloading(false);
  };

  const deleteMediaSelected = async () => {
    const result = await deleteMedia(listSelected);
    if (result.result) {
      toast({ title: "success", description: "Your file has been deleted successfully!", variant: "default" });
      setListSelected([]);
    }
    refetch();
  };

  return (
    <UploadContext.Provider
      value={{
        loading: loading || isLoading,
        listMedia: listMedia?.data || [],
        listSelected: listSelected,
        uploadOneDialogOpen: uploadOneDialogOpen,
        listFileToUpload: listFileToUpload!,
        currentPage: currentPage,
        totalPages: listMedia?.totalPages || 1,
        filter: filter,
        setloading: setloading,
        refetch: refetch,
        setListSelected: setListSelected,
        setUploadOneDialogOpen: setUploadOneDialogOpen,
        setListFileToUpload: setListFileToUpload,
        uploadFiles: uploadFiles,
        setCurrentPage: setCurrentPage,
        setFilter: setFilter,
        deleteMediaSelected: deleteMediaSelected,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

const UploadContext = createContext<UploadContextType>(null!);
export const useUploadContext = function () {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within a UploadProvider");
  }
  return context;
};
