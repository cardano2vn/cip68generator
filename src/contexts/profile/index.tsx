"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { getAssetsByAddress } from "@/services/blockchain/getAssets";
import { useWalletContext } from "@/components/providers/wallet";
import { getWalletAssets } from "@/services/blockchain/getWalletAssets";
import { ProfileStore } from "./store";

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
        walletAddress: address!,
        page: 1,
        limit: 10,
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
