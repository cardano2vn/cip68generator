import { PropsWithChildren } from "react";
import CollectionProvider from "@/contexts/collection";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <CollectionProvider>{children}</CollectionProvider>;
}
