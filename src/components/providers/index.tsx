"use client";

import React, { Suspense } from "react";
import QueryClientProvider from "./query";
import ErrorClientProvider from "./error";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/app/(loading)/loading";
import dynamic from "next/dynamic";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
const BlockchainProvider = dynamic(
  async () => await import("@/components/providers/blockchain"),
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
            <BlockchainProvider>{children}</BlockchainProvider>
          </SessionProvider>
        </QueryClientProvider>
      </ErrorClientProvider>
    </Suspense>
  );
}
