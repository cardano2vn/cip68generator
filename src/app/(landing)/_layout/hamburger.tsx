"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { useLayoutEffect, useState } from "react";

export default function Hamburger() {
  const [open, setOpen] = useState<boolean>(false);
  const [hideX, setHideX] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
  };

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
          "none relative order-1 flex w-fit shrink-0 flex-col items-center border-0 bg-transparent p-0",
          {
            open: open,
            hideX: open && hideX,
          },
        )}
        onClick={handleOpenMenu}
      >
        <span className={cn("bar")} />
        <span className={cn("bar")} />
        <span className={cn("bar")} />
      </Button>
    </div>
  );
}
