import { PropsWithChildren } from "react";
import CollectionProvider from "./_context/collection";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <CollectionProvider>{children}</CollectionProvider>;
}
