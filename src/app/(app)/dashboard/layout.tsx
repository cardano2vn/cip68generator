"use client";

import Loading from "@/app/loading";
import DesktopDashboardLayout from "@/components/layouts/desktop-dashboard";
import MobileDashboardLayout from "@/components/layouts/mobile-dashboard";
import useWindowSize from "@/hooks/use-window-size";
import { useSession } from "next-auth/react";
import { PropsWithChildren, useMemo } from "react";
import { redirect } from "next/navigation";
export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const isMobile: boolean = useWindowSize();

  const Layout = useMemo(() => {
    return isMobile ? MobileDashboardLayout : DesktopDashboardLayout;
  }, [isMobile]);
  const session = useSession();

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    redirect("/login");
  }

  return <Layout>{children}</Layout>;
}
