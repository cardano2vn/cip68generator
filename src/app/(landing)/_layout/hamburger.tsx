"use client";

import { cn } from "@/utils";
import { useLayoutEffect, useState } from "react";
import Sidebar from "./sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Hamburger() {
  const [open, setOpen] = useState<boolean>(false);
  const [hideX, setHideX] = useState<boolean>(false);

  const handleOpenMenu = () => setOpen((prev) => !prev);
  // console.log(open);

  useLayoutEffect(() => {
    const handleResponsiveSidebar = () => {
      if (window.innerWidth > 1365) setOpen(false);
    };

    window.addEventListener("resize", handleResponsiveSidebar);
  }, []);

  useLayoutEffect(() => {
    const handleHideX = () => {
      if (window.innerWidth <= 670) setHideX(true);
    };

    window.addEventListener("resize", handleHideX);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "bg-none hidden max-md:block relative order-1 w-fit shrink-0 flex-col items-center border-0 bg-transparent p-0",
          {
            open: open,
            hideX: open && hideX,
          },
        )}
      >
        <span
          className={cn(
            "block bg-white rounded-[10px] h-[3px] translate-y-[-8px] transition-all duration-300 ease w-[35px]",
            {
              "w-[30px] transform translate-y-[5px] rotate-[-45deg]": open,
            },
          )}
        />
        <span
          className={cn(
            "block bg-white rounded-[10px] h-[3px] transition-all duration-300 ease  w-[18px]",
            {
              "w-0 opacity-0": open,
            },
          )}
        />
        <span
          className={cn(
            "block bg-white rounded-[10px] h-[3px] translate-y-[8px] transition-all duration-300 ease w-[26px]",
            {
              "w-[30px] transform translate-y-[0px] rotate-[45deg]": open,
            },
          )}
        />
      </SheetTrigger>
      <SheetContent className="w-full border-none shadow-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-end w-full">
            <button
              className={cn(
                " bg-none  max-md:block relative order-1 w-fit shrink-0 flex-col items-center border-0 bg-transparent p-0",
                {
                  open: open,
                  hideX: open && hideX,
                },
              )}
              onClick={handleOpenMenu}
            >
              <span
                className={cn(
                  "block bg-white rounded-[10px] h-[3px] translate-y-[-8px] transition-all duration-300 ease w-[35px]",
                  {
                    "w-[30px] transform translate-y-[5px] rotate-[-45deg]":
                      open,
                  },
                )}
              />
              <span
                className={cn(
                  "block bg-white rounded-[10px] h-[3px] transition-all duration-300 ease  w-[18px]",
                  {
                    "w-0 opacity-0": open,
                  },
                )}
              />
              <span
                className={cn(
                  "block bg-white rounded-[10px] h-[3px] translate-y-[8px] transition-all duration-300 ease w-[26px]",
                  {
                    "w-[30px] transform translate-y-[0px] rotate-[45deg]": open,
                  },
                )}
              />
            </button>
          </SheetTitle>
          <SheetDescription>
            <Sidebar className="" />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
