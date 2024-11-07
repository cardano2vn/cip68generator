import { PropsWithChildren } from "react";
import UploadCSVProvider from "./_context";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <UploadCSVProvider>{children}</UploadCSVProvider>;
}
