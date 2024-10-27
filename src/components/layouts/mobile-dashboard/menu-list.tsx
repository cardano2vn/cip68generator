"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { mainMenu } from "@/constants/menu-list";

export function SheetMenuList() {
  const pathname = usePathname();
  const { isOpen } = useSidebarToggle();
  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 w-full">
        <div className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          {mainMenu.slice(3).map(({ title, href, icon, disabled }, index) => {
            const Icon = Icons[icon || "arrowRight"];
            const active = pathname === href;
            return (
              <div className="w-full" key={index}>
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={active ? "secondary" : "ghost"}
                        className="mb-1 h-10 w-full justify-start"
                        asChild
                        disabled={disabled}
                      >
                        <Link href={href}>
                          <span className={cn(isOpen === false ? "" : "mr-4")}>
                            <Icon className={`size-5 flex-none`} />
                          </span>
                          <p
                            className={cn(
                              "max-w-[200px] truncate",
                              isOpen === false
                                ? "-translate-x-96 opacity-0"
                                : "translate-x-0 opacity-100",
                            )}
                          >
                            {title}
                          </p>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">{title}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
          {/* <Separator className="my-4" /> */}
          <div className="flex w-full grow items-end">
            <div
              className={`${isOpen ? "flex-row justify-between" : "flex-col"} flex w-full items-center gap-4 border-t-2 py-2`}
            >
              <Link
                href="https://facebook.com"
                className="flex h-10 w-full items-center justify-center rounded hover:bg-gray-700"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-10 w-full items-center justify-center rounded hover:bg-gray-700"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com"
                className="flex h-10 w-full items-center justify-center rounded hover:bg-gray-700"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="flex h-10 w-full items-center justify-center rounded hover:bg-gray-700"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </ScrollArea>
  );
}
