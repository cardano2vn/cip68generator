"use client";

import React, { Suspense } from "react";
import MeshProvider from "./mesh";
import QueryClientProvider from "./query";
import ErrorClientProvider from "./error";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
const WalletProvider = dynamic(
  async () => await import("@/components/providers/wallet"),
  {
    loading() {
      return <Loading />;
    },
    ssr: false,
  },
);

const NetworkProvider = dynamic(
  async () => await import("@/components/providers/network"),
  {
    loading() {
      return <Loading />;
    },
    ssr: false,
  },
);

export default function AppProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionProviderProps["session"];
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Toaster />
      <ErrorClientProvider>
        <QueryClientProvider>
          <SessionProvider session={session}>
            <MeshProvider>
              <NetworkProvider>
                <WalletProvider>{children}</WalletProvider>
              </NetworkProvider>
            </MeshProvider>
          </SessionProvider>
        </QueryClientProvider>
      </ErrorClientProvider>
    </Suspense>
  );
}
