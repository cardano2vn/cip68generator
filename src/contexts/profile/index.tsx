"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBlockchainContext } from "@/components/providers/blockchain";
import { getWalletAssets } from "@/services/blockchain/getWalletAssets";
import useProfileStore, { ProfileStore } from "./store";

type ProfileContextType = ProfileStore & {
  loading: boolean;
};

export default function ProfileProvider({ children }: PropsWithChildren) {
  useState<boolean>(false);

  const { address } = useBlockchainContext();
  const { filter, setFilter, currentPage, setCurrentPage } = useProfileStore();

  const { data, isLoading } = useQuery({
    queryKey: ["getWalletAssets", address, filter, currentPage],
    queryFn: () =>
      getWalletAssets({
        walletAddress: address!,
        query: filter.query,
        page: currentPage,
        limit: 12,
      }),
    enabled: !!address,
  });
  return (
    <ProfileContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        totalItem: data?.totalItem || 0,
        totalPages: data?.totalPages || 1,
        loading: isLoading,
        listNft: data?.data || [],
        filter,
        setFilter,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

const ProfileContext = createContext<ProfileContextType>(null!);
export const useProfileContext = function () {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
