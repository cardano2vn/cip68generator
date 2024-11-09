"use client";

import { cn } from "@/utils";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useWalletContext } from "@/components/providers/wallet";
import { useEffect, useState } from "react";

export default function Account() {
  const { wallet, address, getBalance } = useWalletContext();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await getBalance();
        setBalance(balance);
      }
    })();
  }, [wallet, getBalance]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-center h-9 gap-2 rounded-3xl bg-slate-800 px-2 py-4",
        )}
      >
        <div className={cn("h-8 w-8")}>
          <Image
            className={cn(
              "h-full w-full rounded-full bg-slate-300 object-cover p-1",
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
          <p className={cn("text-left text-[14px] leading-4")}>{balance} ₳</p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("mt-3 flex min-w-[315px] flex-col gap-4 rounded-xl p-5")}
        align="end"
      >
        <div className={cn("flex items-center gap-2")}>
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
            <h2 className={cn("text-[18px] font-medium")}>{wallet?.name}</h2>
            <div className="flex items-center gap-2">
              <p className={cn("select-none text-[12px] text-gray-500")}>
                Base Mainnet
              </p>
              <svg
                className=""
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector 60"
                  d="M1 1L4.14029 3.41561C4.49974 3.69211 5.00026 3.69211 5.35971 3.41561L8.5 1"
                  stroke="#666"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className={cn("leading-0 h-[1px] overflow-hidden bg-slate-500")} />
        <div className={"relative flex items-center gap-[5px]"}>
          <p className="whitespace-nowrap text-[13px] text-gray-400">Adress</p>
          <p className="flex items-center gap-[6px] whitespace-nowrap">
            <span className="inline-block max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-gray-200">
              {address}
            </span>
            <span>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 560">
                  <g id="Frame" clipPath="url(#clip0_1055_26)">
                    <path
                      id="Vector (Stroke)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.23131 3.25941C1.55465 3.25941 0.997243 3.83443 0.997243 4.55434V10.4073C0.997243 11.1174 1.54523 11.7023 2.23131 11.7023H7.8092C8.49811 11.7023 9.04327 11.1302 9.04327 10.4073V4.55434C9.04327 3.84431 8.49528 3.25941 7.8092 3.25941H2.23131ZM-0.00195312 4.55434C-0.00195312 3.24944 1.00848 2.21094 2.23131 2.21094H7.8092C9.05277 2.21094 10.0425 3.2712 10.0425 4.55434V10.4073C10.0425 11.7093 9.04995 12.7507 7.8092 12.7507H2.23131C0.987744 12.7507 -0.00195312 11.6905 -0.00195312 10.4073V4.55434Z"
                      fill="currentColor"
                    ></path>
                    <path
                      id="Vector (Stroke)_2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.69141 0.520331C3.69141 0.230803 3.91508 -0.00390625 4.191 -0.00390625H8.1709C10.286 -0.00390625 12.0022 1.79687 12.0022 4.0163V8.19248C12.0022 8.48201 11.7785 8.71671 11.5026 8.71671C11.2266 8.71671 11.003 8.48201 11.003 8.19248V4.0163C11.003 2.37593 9.73418 1.04457 8.1709 1.04457H4.191C3.91508 1.04457 3.69141 0.809859 3.69141 0.520331Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1055_26">
                    <rect width="12" height="12.75" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </span>
          </p>
        </div>
        <div className={"relative flex items-center gap-[5px]"}>
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
        </div>
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
          <div className={cn("text-[15px] text-[rgb(153,153,153)]")}>
            V4.5.6_beta
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
