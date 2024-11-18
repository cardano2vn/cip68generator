"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Icons } from "@/components/common/icons";
import { bottomItem, mainMenu } from "@/constants/menu-list";
import { Button } from "@/components/ui/button";

export function MenuList() {
  const pathname = usePathname();
  const { isOpen } = useSidebarToggle();
  return (
    <div className="overflow-hidden">
      <nav className="mt-8 w-full">
        <div className="boder-r-2 flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-2 px-[4.5px] lg:min-h-[calc(100vh-32px-40px-32px)]">
          {mainMenu.map(({ title, href, icon, disabled }, index) => {
            const Icon = Icons[icon || "arrowRight"];
            const active = pathname === href;
            return (
              <div className="h-10 w-full" key={index}>
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "mb-1 h-10 w-full justify-start border-none bg-transparent !px-2",
                          active
                            ? "border-primary bg-accent text-primary"
                            : "border-transparent text-secondary",
                        )}
                        asChild
                        disabled={disabled}
                      >
                        <Link href={href} className="flex items-center">
                          <span
                            className={cn(
                              "flex h-10 w-10 items-center justify-center",
                            )}
                          >
                            <Icon className="h-6 w-6" />
                          </span>
                          {isOpen === true && (
                            <span className="flex-grow">{title}</span>
                          )}
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
          <div className="flex w-full grow items-end">
            <div
              className={`${isOpen ? "flex-row justify-between" : "flex-col"} flex w-full items-center gap-4 border-t-2 py-2`}
            >
              {bottomItem.map(({ href, icon }, index) => {
                const Icon = Icons[icon || "arrowRight"];
                return (
                  <Link
                    key={index}
                    href={href}
                    className="flex h-10 w-full items-center justify-center rounded text-secondary hover:text-primary"
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
