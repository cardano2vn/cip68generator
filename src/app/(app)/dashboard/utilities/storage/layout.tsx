import { PropsWithChildren } from "react";
import UploadProvider from "./_context";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <UploadProvider>{children}</UploadProvider>;
}
