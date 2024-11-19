import { PropsWithChildren } from "react";
import UploadCSVProvider from "@/contexts/fast-collection";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <UploadCSVProvider>{children}</UploadCSVProvider>;
}
