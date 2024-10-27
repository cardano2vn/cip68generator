"use client";

import { signOut, useSession } from "next-auth/react";

import SessionData from "./session-data";
import { Button } from "@/components/ui/button";
import { useWalletContext } from "@/components/providers/wallet";

export default function SignMessage() {
  const { disconnect } = useWalletContext();
  const { data: session } = useSession();

  return (
    <>
      <SessionData session={session} />
      <Button onClick={() => signOut()}>Sign Out</Button>
      <Button onClick={() => disconnect()}>Sign Out</Button>
    </>
  );
}
