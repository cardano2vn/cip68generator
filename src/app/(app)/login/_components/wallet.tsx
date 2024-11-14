"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import Image, { StaticImageData } from "next/image";

type Props = {
  name: string;
  image: StaticImageData | string;
  onConnectWallet: ({ name }: { name: string }) => Promise<void>;
};
const Wallet = function ({ name, image, onConnectWallet }: Props) {
  return (
    <Button
      onClick={() => onConnectWallet({ name })}
      className={cn(
        "relative box-border flex h-[50px] w-[332px] cursor-pointer select-none items-center justify-between rounded-xl border-[1px] border-solid border-gray-700 bg-transparent px-[22px] py-[5px] text-[16px] text-white hover:bg-slate-700 max-sm:w-full",
      )}
    >
      <span className={cn("text-[16px] text-white")}>{name}</span>
      <div
        className={cn(
          "box-border flex h-8 w-8 items-center justify-center rounded-xl",
        )}
      >
        <Image
          className={cn("h-full w-full object-cover")}
          src={image}
          alt={name}
        />
      </div>
    </Button>
  );
};

export default Wallet;
