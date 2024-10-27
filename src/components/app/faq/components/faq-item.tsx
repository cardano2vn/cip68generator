/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { cn } from "@/utils";
import { useState } from "react";

type Props = {
  title?: string;
  index: number;
  Children: () => JSX.Element;
};

export default function FaqItem({ title, Children, index }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(index === 0);

  const handleOpen = function () {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={cn(
        "mb-5 w-full rounded-2xl bg-slate-900 shadow-xl",
        isOpen && "shadow-2xl",
      )}
    >
      <header className="relative box-border flex w-full flex-col rounded-2xl px-5 py-3 filter">
        <section
          className={cn(
            "pointer-events-none absolute right-6 top-6 z-10 h-4 w-4 transition-all duration-100 ease-in-out",
            isOpen && "rotate-180 transition-all duration-100 ease-in-out",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </section>
        <section
          className='relative flex w-full cursor-pointer flex-wrap items-center justify-between text-left transition-all duration-300 ease-in-out before:absolute before:right-[-36px] before:top-0 before:z-10 before:h-full before:w-[60px] before:bg-transparent before:content-[""]'
          onClick={handleOpen}
        >
          <h3 className="m-0 p-0 text-[18px] font-semibold leading-[40px] text-gray-300">
            {title}
          </h3>
        </section>
        {isOpen && (
          <section className="flex flex-wrap items-center justify-between text-left">
            <Children />
          </section>
        )}
      </header>
    </div>
  );
}
