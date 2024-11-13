import Link from "next/link";
import { cn } from "@/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "./sidebar-toggle";
import { MenuList } from "./menu-list";
import { Button } from "@/components/ui/button";
import router from "@/constants/routers";
import Image from "next/image";
import { appImage } from "@/public/images";

export function Sidebar() {
  const sidebar = useSidebarToggle();

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full bg-section transition-[width] duration-300 ease-in-out lg:translate-x-0",
        sidebar?.isOpen === false ? "w-[73px]" : "w-[300px]",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} toggle={sidebar?.toggle} />
      <div
        className={cn(
          "relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md ",
        )}
      >
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link
            className="relative flex items-center decoration-transparent justify-center gap-1"
            href={router.landing}
          >
            <Image
              className={cn("h-[35px] w-[35px] object-cover", {
                " absolute": !sidebar.isOpen,
              })}
              src={appImage.logo}
              alt="Logo"
            />
            <p
              className={cn(
                "ml-2 whitespace-nowrap text-2xl font-medium transition-[transform,opacity,display] duration-300 ease-in-out text-gray-200",
                sidebar?.isOpen === false
                  ? "hidden -translate-x-96 opacity-0"
                  : "translate-x-0 opacity-100",
              )}
            >
              Generator
            </p>
          </Link>
        </Button>
        <MenuList />
      </div>
    </aside>
  );
}
