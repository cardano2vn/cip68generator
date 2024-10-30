import { PropsWithChildren } from "react";
import CollectionProvider from "./_context";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <CollectionProvider>{children}</CollectionProvider>;
}
