"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ProfileStore } from "./store";
import { useQuery } from "@tanstack/react-query";
// import { getAssetsByAddress } from "@/services/blockchain/getAssets";
import { useWalletContext } from "@/components/providers/wallet";
import { getWalletAssets } from "@/services/blockchain/getWalletAssets";

type ProfileContextType = ProfileStore & {
  loading: boolean;
};

export default function ProfileProvider({ children }: PropsWithChildren) {
  useState<boolean>(false);

  const { address } = useWalletContext();

  const { data, isLoading } = useQuery({
    queryKey: ["getAssetsByAddress"],
    queryFn: () =>
      getWalletAssets({
        page: 1,
        pageSize: 4,
        walletAddress: address!,
      }),
    enabled: !!address,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <ProfileContext.Provider
      value={{
        loading: isLoading,
        listNft: data?.data || [],
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
