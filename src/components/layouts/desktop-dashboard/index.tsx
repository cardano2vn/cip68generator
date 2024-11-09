"use client";

import { cn } from "@/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

export default function DesktopDashboardlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useSidebarToggle();

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "flex min-h-[calc(100vh_-_56px)] justify-center transition-[margin-left] duration-300 ease-in-out",
          sidebar?.isOpen === false ? "lg:ml-[73px]" : "lg:ml-[300px]",
        )}
      >
        <Navbar />
        <div className="container mt-20 px-4">{children}</div>
      </main>
    </>
  );
}
