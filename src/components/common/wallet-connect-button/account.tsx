"use client";

import { cn, shortenString } from "@/utils";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useBlockchainContext } from "@/components/providers/blockchain";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { appNetwork, decialPlace } from "@/constants";
import CoppyButton from "../coppy-button";
import { Separator } from "@/components/ui/separator";
export default function Account() {
  const { wallet, address, getBalance, browserWallet } = useBlockchainContext();
  const [stakeAddress, setStakeAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (wallet && browserWallet) {
        const balance = await getBalance();
        const stakeAddress = await browserWallet.getRewardAddresses();
        setStakeAddress(stakeAddress[0]);
        setBalance(balance);
      }
    })();
  }, [wallet, getBalance, browserWallet]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-center h-10 gap-2 rounded-3xl bg-slate-800 px-2 py-4",
        )}
      >
        <div className={cn("h-8 w-8")}>
          <Image
            className={cn(
              "h-full w-full rounded-full bg-slate-700 object-cover p-1",
            )}
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
            <CountUp
              start={0}
              end={Number((balance / decialPlace).toFixed(6))}
              decimals={6}
            />{" "}
            ₳
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("mt-3 flex min-w-[315px] flex-col gap-4 rounded-xl p-5")}
        align="end"
      >
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10")}>
            <Image
              className={cn("h-full w-full object-cover")}
              src={wallet?.icon || ""}
              alt={`${wallet?.name} icon`}
              width={32}
              height={32}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white capitalize">
              {wallet?.name}
            </h2>
            <p className="text-sm text-gray-400 capitalize"> {appNetwork}</p>
          </div>
        </div>
        {/* <div className={cn("flex items-center gap-2")}>
          <div className={cn("h-10 w-10")}>
            <Image
              className={cn("h-full w-full object-cover p-1")}
              src={wallet?.icon || ""}
              alt={`${wallet?.name} icon`}
              width={32}
              height={32}
            />
          </div>
          <div className="">
            <h2 className={"text-[18px] font-medium capitalize"}>
             
            </h2>
            <div className="flex items-center gap-2">
              <p className={"select-none text-[12px] text-gray-500 capitalize"}>
               
              </p>
            </div>
          </div>
        </div> */}
        <Separator className="my-4 bg-slate-500" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400">Stake:</p>
              <span className="text-sm">
                {shortenString(stakeAddress || "", 11)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <CoppyButton className="h-4 w-4" content={stakeAddress || ""} />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400">Change:</p>
              <span className="text-sm">
                {shortenString(address || "", 10)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <CoppyButton className="h-4 w-4" content={stakeAddress || ""} />
            </Button>
          </div>
        </div>

        {/* <div className={"relative flex items-center gap-[5px]"}>
          <p className="whitespace-nowrap text-[13px] text-gray-400">
            Stake Address
          </p>
          <p className="flex items-center gap-[6px] whitespace-nowrap">
            <span className="inline-block max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-gray-200">
              {shortenString(stakeAddress || "", 8)}
            </span>
            <span className="ml-auto">
              <CoppyButton content={stakeAddress || ""} />
            </span>
          </p>
        </div>

        <div className={"relative flex items-center gap-[5px]"}>
          <p className="whitespace-nowrap text-[13px] text-gray-400">
            Change Address
          </p>
          <p className="flex items-center gap-[6px] whitespace-nowrap">
            <span className="inline-block max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-gray-200">
              {shortenString(address || "", 8)}
            </span>
            <span className="ml-auto">
              <CoppyButton content={address || ""} />
            </span>
          </p>
        </div> */}

        {/* <div className={"relative flex items-center gap-[5px]"}>
          <p className="whitespace-nowrap text-[13px] text-gray-400">
            Metadatas
          </p>
          <p className="flex items-center gap-[6px] whitespace-nowrap">
            <span className="inline-block max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-gray-200">
              20
            </span>
          </p>
        </div>
        <div className={"relative flex items-center gap-[5px]"}>
          <p className="whitespace-nowrap text-[13px] text-gray-400">
            Storages
          </p>
          <p className="flex items-center gap-[6px] whitespace-nowrap">
            <span className="inline-block max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-gray-200">
              10
            </span>
          </p>
        </div> */}
        <div className={cn("leading-0 h-[1px] overflow-hidden bg-slate-500")} />
        <div className={cn("relative flex items-center")}>
          <Link
            className="flex cursor-pointer items-center gap-1 text-gray-300"
            href={"/"}
          >
            <MdOutlineFeedback />
            <span className="text-[14px]">Feedback</span>
          </Link>
        </div>
        <div className={cn("relative flex items-center")}>
          <Link
            className="flex cursor-pointer items-center gap-1 text-gray-300"
            href={"/"}
          >
            <IoIosHelpCircleOutline />
            <span className="text-[14px]">Help</span>
          </Link>
        </div>

        <div className={cn("leading-0 h-[1px] overflow-hidden bg-slate-500")} />
        <div className={cn("flex flex-col items-center gap-3")}>
          <Button
            onClick={() => signOut()}
            className={cn(
              "w-[180px] cursor-pointer rounded-[35px] bg-slate-500 text-center text-[14px] leading-[25px] text-gray-400",
            )}
          >
            Log out
          </Button>
          {/* <div className={cn("text-[15px] text-[rgb(153,153,153)]")}>
            V4.5.6_beta
          </div> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
