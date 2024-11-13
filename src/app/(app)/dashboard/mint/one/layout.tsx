import { PropsWithChildren } from "react";
import MintOneProvider from "./_context";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <MintOneProvider>{children}</MintOneProvider>;
}
