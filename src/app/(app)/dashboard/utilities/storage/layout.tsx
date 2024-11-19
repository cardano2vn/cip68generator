import { PropsWithChildren } from "react";
import UploadProvider from "@/contexts/storage";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <UploadProvider>{children}</UploadProvider>;
}
