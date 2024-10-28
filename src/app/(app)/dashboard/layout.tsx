"use client";

import DesktopDashboardLayout from "@/components/layouts/desktop-dashboard";
import MobileDashboardLayout from "@/components/layouts/mobile-dashboard";
import useWindowSize from "@/hooks/use-window-size";
import { PropsWithChildren, useMemo } from "react";

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const isMobile: boolean = useWindowSize();

  const Layout = useMemo(() => {
    return isMobile ? MobileDashboardLayout : DesktopDashboardLayout;
  }, [isMobile]);

  return <Layout>{children}</Layout>;
}
