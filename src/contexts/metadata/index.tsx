"use client";

import { createContext, useContext, useEffect } from "react";
import useMetadataStore, { MetadataStore } from "./store";
import { addMetadata, deleteMetadata, getMetadata } from "@/services/database/metadata";
import { toast } from "@/hooks/use-toast";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type MetadataContextType = MetadataStore & {
  loading: boolean;
  collectionId: string;
  createMetadata: (metadataContent: Record<string, string>) => void;
  deleteMetadataSelected: () => void;
  refetch: () => void;
};

export default function MetadataProvider({ collectionId, children }: { collectionId: string; children: React.ReactNode }) {
  const { setListMetadata, currentPage, filter, setFilter, listSelected, setListSelected, setCurrentPage } = useMetadataStore();
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getMetadata", currentPage, filter],
    queryFn: () => getMetadata({ collectionId, page: currentPage, query: filter.query, range: filter.range }),
  });

  useEffect(() => {
    setListSelected([]);
  }, [data, setListSelected]);

  const createMetadata = async (metadataContent: Record<string, string>) => {
    const { result, message } = await addMetadata({ collectionId, listMetadata: [metadataContent] });
    if (result) {
      toast({ title: "success", variant: "default", description: "Your metadata has been created successfully!" });
      router.push(routes.utilities.children.collection.redirect + "/" + collectionId);
    } else {
      toast({ title: "Error", variant: "destructive", description: message });
    }
    refetch();
  };

  const deleteMetadataSelected = async () => {
    const { result, message } = await deleteMetadata({ collectionId, listMetadata: listSelected });
    if (result) {
      toast({ title: "success", variant: "default", description: "Your metadata has been deleted successfully" });
      setListSelected([]);
    } else {
      toast({ title: "Error", variant: "destructive", description: message });
    }
    refetch();
  };

  return (
    <MetadataContext.Provider
      value={{
        loading: isLoading,
        listMetadata: data?.data || [],
        currentPage,
        totalPages: data?.totalPages || 1,
        filter,
        refetch,
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
    throw new Error("useMetadataContext must be used within a MetadataProvider");
  }
  return context;
};
