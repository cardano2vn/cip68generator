/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/constants/routers";
import { toast } from "@/hooks/use-toast";
import { deleteMedia, getMedia } from "@/services/database/media";
import { uploadIPFS } from "@/services/upload";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext } from "react";
import useUploadStore, { UploadStore } from "./store";

type UploadContextType = UploadStore & {
  uploadFiles: () => void;
  deleteMediaSelected: () => any;
  loading: boolean;
};

export default function UploadProvider({ children }: PropsWithChildren) {
  const router = useRouter();
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
    queryFn: () =>
      getMedia({
        page: currentPage,
        query: filter.query,
        range: filter.range,
      }),
    refetchInterval: 5000,
  });

  const uploadFiles = async () => {
    if (listFileToUpload) {
      const formData = new FormData();
      Array.from(listFileToUpload).forEach((file) => {
        formData.append("file", file);
      });
      const { result, message } = await uploadIPFS(formData);
      if (result) {
        refetch();
        toast({
          title: "Sucess",
          variant: "default",
          description: (
            <Button
              onClick={() =>
                router.push(dashboardRoutes.utilities.children.storage.redirect)
              }
            >
              Go to Storage
            </Button>
          ),
        });
        setListFileToUpload([]);
      } else {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
    }
    refetch();
  };

  const deleteMediaSelected = async () => {
    const result = await deleteMedia(listSelected);
    if (result.result) {
      toast({
        title: "Sucess",
        description: "Delete media sucess",
        variant: "default",
      });
      setListSelected([]);
    }
    refetch();
  };

  return (
    <UploadContext.Provider
      value={{
        loading: isLoading,
        listMedia: listMedia?.data ?? [],
        listSelected: listSelected,
        uploadOneDialogOpen: uploadOneDialogOpen,
        listFileToUpload: listFileToUpload ?? [],
        currentPage: currentPage,
        totalPages: listMedia?.totalPages ?? 0,
        filter: filter,
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
