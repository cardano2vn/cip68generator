import { PropsWithChildren } from "react";
import { SessionProvider as SessionProviderBase } from "next-auth/react";
import { auth } from "@/lib/auth";

export default async function SessionProvider({ children }: PropsWithChildren) {
  const session = await auth();
  return (
    <SessionProviderBase session={session}>{children}</SessionProviderBase>
  );
}
