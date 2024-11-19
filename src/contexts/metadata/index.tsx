"use client";

import { createContext, useContext } from "react";
import useMetadataStore, { MetadataStore } from "./store";
import { AssetMetadata } from "@meshsdk/core";
import {
  addMetadata,
  deleteMetadata,
  getMetadata,
} from "@/services/database/metadata";
import { toast } from "@/hooks/use-toast";
import { dashboardRoutes } from "@/constants/routers";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type MetadataContextType = MetadataStore & {
  loading: boolean;
  collectionId: string;
  createMetadata: (metadataContent: AssetMetadata) => void;
  deleteMetadataSelected: () => void;
};

export default function MetadataProvider({
  collectionId,
  children,
}: {
  collectionId: string;
  children: React.ReactNode;
}) {
  const {
    setListMetadata,
    currentPage,
    filter,
    setFilter,
    listSelected,
    setListSelected,
    setCurrentPage,
  } = useMetadataStore();
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getMetadata", currentPage, filter],
    queryFn: () =>
      getMetadata({
        collectionId,
        page: currentPage,
        query: filter.query,
        range: filter.range,
      }),
    refetchInterval: 5000,
  });

  const createMetadata = async (metadataContent: AssetMetadata) => {
    const { result, message } = await addMetadata({
      collectionId,
      listMetadata: [metadataContent],
    });
    if (result) {
      toast({
        title: "Sucess",
        variant: "default",
        description: "Metadata created",
      });
      router.push(
        dashboardRoutes.utilities.children.collection.redirect +
          "/" +
          collectionId,
      );
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: message,
      });
    }
    refetch();
  };

  const deleteMetadataSelected = async () => {
    const { result, message } = await deleteMetadata({
      collectionId,
      listMetadata: listSelected,
    });
    if (result) {
      toast({
        title: "Sucess",
        variant: "default",
        description: "Metadata deleted",
      });
      setListSelected([]);
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: message,
      });
    }
    refetch();
  };

  return (
    <MetadataContext.Provider
      value={{
        loading: isLoading,
        listMetadata: data?.data || [],
        currentPage,
        totalPages: data?.totalPages || 0,
        filter,
        setFilter,
        setListMetadata,
        setCurrentPage,
        collectionId,
        listSelected,
        deleteMetadataSelected,
        createMetadata,
        setListSelected,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
}

const MetadataContext = createContext<MetadataContextType>(null!);
export const useMetadataContext = function () {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error(
      "useMetadataContext must be used within a MetadataProvider",
    );
  }
  return context;
};
