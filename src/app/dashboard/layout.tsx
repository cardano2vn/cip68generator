"use client";

import DesktopDashboardlLayout from "@/components/layouts/desktop-dashboard";
import MobileDashboardlLayout from "@/components/layouts/mobile-dashboard";
import useWindowSize from "@/hooks/use-window-size";
import { PropsWithChildren } from "react";

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const isMobile: boolean = useWindowSize();
  const Layout = isMobile ? MobileDashboardlLayout : DesktopDashboardlLayout;
  return <Layout>{children}</Layout>;
}
