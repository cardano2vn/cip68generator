import { PropsWithChildren } from "react";
import MintOneProvider from "@/contexts/mint-one";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <MintOneProvider>{children}</MintOneProvider>;
}
