import { PropsWithChildren } from "react";
import ProfileProvider from "./_context/profile";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
