"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { useLayoutEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function Hamburger() {
  const [open, setOpen] = useState<boolean>(false);
  const [hideX, setHideX] = useState<boolean>(false);

  const handleOpenMenu = () => setOpen((prev) => !prev);

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
    <div>
      <Button
        type="button"
        className={cn(
          "bg-none relative order-1 flex w-fit shrink-0 flex-col items-center border-0 bg-transparent p-0",
          {
            open: open,
            hideX: open && hideX,
          },
        )}
        onClick={handleOpenMenu}
      >
        <span
          className={`block bg-white rounded-[10px] h-[3px] transition-all duration-300 ease ${
            open
              ? "w-[3rem] transform translate-y-[6px] rotate-[-45deg]"
              : "w-[3rem]"
          }`}
        />
        <span
          className={`block bg-white rounded-[10px] h-[3px] transition-all duration-300 ease ${
            open ? "w-0 opacity-0" : "w-[1.8rem]"
          }`}
        />
        <span
          className={`block bg-white rounded-[10px] h-[3px] transition-all duration-300 ease ${
            open
              ? "w-[3rem] transform translate-y-[-5px] rotate-[45deg]"
              : "w-[2.6rem]"
          }`}
        />
      </Button>

      {/* <Sidebar className="z-10" open={open} setOpen={setOpen} /> */}
    </div>
  );
}
