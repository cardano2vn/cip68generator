"use client";

import router from "@/constants/routers";
import { cn } from "@/utils";
import React, { useState } from "react";

type Props = {
  open: boolean;
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ open, setOpen, className }: Props) {
  const [selected, setSelected] = useState<string>(router.landing);

  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-screen min-w-[30px] after:fixed after:content-[''] after:left-0 after:top-0 after:w-screen after:h-screen after:blur-sm after:bg-slate-700 after:z-[-1] after:bg-none ",
        className,
        {
          "right-0 opacity-100": open,
        },
      )}
    ></div>
  );
}
