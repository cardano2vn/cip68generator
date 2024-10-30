/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import router, { publicRoutes } from "@/constants/routers";
import { cn } from "@/utils";
import React, { useState } from "react";
import NavLink from "./nav-link";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  const [selected, setSelected] = useState<string>(router.landing);

  return (
    <div className={cn(className)}>
      <Button>Connect Wallet</Button>
      <nav className="py-[25px] px-[18px]">
        <ul>
          {publicRoutes.map(function ({ name, redirect }, index: number) {
            return (
              <NavLink
                key={index}
                isActive={false}
                name={name}
                redirect={redirect}
                setSelected={setSelected}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
