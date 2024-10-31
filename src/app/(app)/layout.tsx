import "swiper/css";
import "swiper/css/pagination";
import AppProviders from "@/components/providers";
import { auth } from "@/lib/auth";
import { PropsWithChildren } from "react";
export default async function AppLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await auth();
  return <AppProviders session={session}>{children}</AppProviders>;
}
