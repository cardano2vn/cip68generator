"use client";

import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/constants/routers";
import { toast } from "@/hooks/use-toast";
import { getMedia } from "@/services/database/media";
import { uploadIPFS } from "@/services/upload";
import { Media } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type FilterType = {
  range: DateRange;
  query: string;
};

type useUploadStore = {
  loading: boolean;
  listMedia: Media[];
  listSelected: Media[];
  listFileToUpload: File[];
  uploadOneDialogOpen: boolean;
  currentPage: number;
  totalPages: number;
  filter: FilterType;
  setListSelected: (media: Media[]) => void;
  setUploadOneDialogOpen: (open: boolean) => void;
  setListFileToUpload: (files: File[]) => void;
  uploadFiles: () => void;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: FilterType) => void;
};

export default function UploadProvider({ children }: PropsWithChildren) {
  const [currentPage, setCurrentPage] = useState(1);
  const [listSelected, setListSelected] = useState<Media[]>([]);
  const [uploadOneDialogOpen, setUploadOneDialogOpen] = useState(false);
  const [listFileToUpload, setListFileToUpload] = useState<File[]>([]);
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>({
    range: {
      from: new Date(2024, 0, 1),
      to: new Date(2024, 11, 31),
    },
    query: "",
  });

  const { data: listMedia, isLoading } = useQuery({
    queryKey: ["getMedia", currentPage, filter],
    queryFn: () =>
      getMedia({
        page: currentPage,
        query: filter.query,
        range: filter.range,
      }),
  });

  const uploadFiles = async () => {
    if (listFileToUpload) {
      const formData = new FormData();
      Array.from(listFileToUpload).forEach((file) => {
        formData.append("file", file);
      });
      const { result, message } = await uploadIPFS(formData);
      if (result) {
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
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

const UploadContext = createContext<useUploadStore>(null!);
export const useUploadContext = function () {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within a UploadProvider");
  }
  return context;
};
