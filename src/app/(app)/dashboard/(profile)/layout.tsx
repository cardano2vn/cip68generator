import { PropsWithChildren } from "react";
import ProfileProvider from "@/contexts/profile";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
