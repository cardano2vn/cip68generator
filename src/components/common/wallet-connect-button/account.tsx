"use client";

import { cn, shortenString } from "@/utils";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useWallet } from "@/hooks/use-wallet";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { appNetwork, appSocialMedia, decialPlace } from "@/constants";
import CopyButton from "../copy-button";
import { Separator } from "@/components/ui/separator";
export default function Account() {
  const { wallet, address, getBalance, browserWallet, stakeAddress } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (wallet && browserWallet) {
        const balance = await getBalance();
        setBalance(balance);
      }
    })();
  }, [wallet, getBalance, browserWallet]);

  return (
    <Popover>
      <PopoverTrigger className={cn("flex items-center h-10 gap-2 rounded-3xl bg-slate-800 px-2 py-4")}>
        <div className={cn("h-8 w-8")}>
          <Image
            className={cn("h-full w-full rounded-full bg-slate-700 object-cover p-1")}
            src={wallet?.icon || ""}
            width={32}
            height={32}
            alt={`${wallet?.icon} icon`}
          />
        </div>
        <div className="">
          <h2 className="text-[12px] leading-4">
            {address?.slice(0, 12)}...{address?.slice(-4)}
          </h2>
          <p className={cn("text-left text-[14px] leading-4")}>
            <CountUp start={0} end={Number((balance / decialPlace).toFixed(6))} decimals={6} /> ₳
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("mt-3 flex min-w-[315px] flex-col gap-4 rounded-xl p-5")} align="end">
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10")}>
            <Image className={cn("h-full w-full object-cover")} src={wallet?.icon || ""} alt={`${wallet?.name} icon`} width={32} height={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white capitalize">{wallet?.name}</h2>
            <p className="text-sm text-gray-400 capitalize"> {appNetwork}</p>
          </div>
        </div>
        <Separator className="my-4 bg-slate-500" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400">Stake:</p>
              <span className="text-sm">{shortenString(stakeAddress || "", 11)}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <CopyButton className="h-4 w-4" content={stakeAddress || ""} />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400">Change:</p>
              <span className="text-sm">{shortenString(address || "", 10)}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <CopyButton className="h-4 w-4" content={stakeAddress || ""} />
            </Button>
          </div>
        </div>
        <div className={cn("leading-0 h-[1px] overflow-hidden bg-slate-500")} />
        <div className={cn("relative flex items-center")}>
          <Link className="flex cursor-pointer items-center gap-1 text-gray-300" href={appSocialMedia.feedback}>
            <MdOutlineFeedback />
            <span className="text-[14px]">Feedback</span>
          </Link>
        </div>
        <div className={cn("relative flex items-center")}>
          <Link className="flex cursor-pointer items-center gap-1 text-gray-300" href={appSocialMedia.help}>
            <IoIosHelpCircleOutline />
            <span className="text-[14px]">Help</span>
          </Link>
        </div>

        <div className={cn("leading-0 h-[1px] overflow-hidden bg-slate-500")} />
        <div className={cn("flex flex-col items-center gap-3")}>
          <Button
            onClick={() => signOut()}
            className={cn("w-[180px] cursor-pointer rounded-[35px] bg-slate-500 text-center text-[14px] leading-[25px] text-gray-400")}
          >
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
