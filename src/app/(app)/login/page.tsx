"use client";

import { cn } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { appImage } from "@/public/images";
import { appNetwork, wallets } from "@/constants";
import {
  FaTelegramPlane,
  FaMailBulk,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import routers, { dashboardRoutes } from "@/constants/routers";
import { useWalletContext } from "@/components/providers/wallet";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NetworkComponent } from "./_components/network-item";
import Wallet from "./_components/wallet";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const { signIn } = useWalletContext();
  const handleConnectWallet = async function ({ name }: { name: string }) {
    await signIn(session, {
      name,
      icon: "",
      id: "",
      version: "",
    });
  };

  if (status === "authenticated") {
    redirect(dashboardRoutes.home.redirect);
  }

  return (
    <main className={cn("flex h-full text-[14px]")}>
      <div className={cn("m-3 flex flex-1 flex-col rounded-xl bg-[#0d0e12]")}>
        <div
          className={cn(
            "box-border flex h-screen flex-col items-center justify-between px-[14vw] pb-[4vh] pt-[10vh]",
          )}
        >
          {/* header-begin */}
          <header className={cn("flex w-full items-center justify-between")}>
            <Link
              className={cn("relative flex items-center justify-center gap-2")}
              href={routers.landing}
            >
              <Image
                className={cn("h-[35px] w-[35px] object-cover")}
                src={appImage.logo}
                alt="Logo"
              />
              <span className="text-2xl">Generator</span>
            </Link>
            <div className={cn("flex items-center gap-8")}>
              <Link
                className={cn(
                  "flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-2",
                )}
                href={"/#"}
              >
                <FaTelegramPlane className={cn("text-[20px]")} />
              </Link>
              <Link
                className={cn(
                  "flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-2",
                )}
                href={"/#"}
              >
                <FaMailBulk className={cn("text-[20px]")} />
              </Link>
              <Link
                className={cn(
                  "flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-2",
                )}
                href={"/#"}
              >
                <FaXTwitter className={cn("text-[20px]")} />
              </Link>
              <Link
                className={cn(
                  "flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-2",
                )}
                href={"/#"}
              >
                <FaYoutube className={cn("text-[20px]")} />
              </Link>
            </div>
          </header>
          {/* header-end */}

          {/* wallet-begin */}
          <aside className={cn("mb-[20px] mt-[60px]")}>
            {/* web3-begin */}
            <section
              className={cn(
                "box-border max-w-[540px] rounded-2xl bg-slate-900 px-[45px] py-[35px] shadow-xl max-sm:px-6",
              )}
            >
              <header className={cn("flex items-center justify-between")}>
                <h2 className={cn("text-[20px] text-white")}>Connect Wallet</h2>
                <h2 className={cn("text-[16px] text-white")}>{appNetwork}</h2>
              </header>

              <aside className={cn("mt-5 flex max-sm:flex-col")}>
                <section
                  className={cn(
                    "item-center mr-[30px] flex h-[230px] flex-col gap-3 overflow-y-auto overflow-x-hidden border-r-[1px] border-solid border-[rgba(238,238,238,0.5)] pr-[30px] max-sm:h-[70px] max-sm:flex-row max-sm:overflow-hidden max-sm:overflow-x-auto max-sm:border-b-[1px] max-sm:border-r-0 max-sm:pb-[30px] max-sm:pr-0",
                  )}
                >
                  {/* {networks.map(function (network, index: number) {
                    return ( */}
                  <NetworkComponent image="" name={appNetwork} active={true} />
                  {/* );
                  })} */}
                </section>
                <section
                  className={cn(
                    'relative h-[230px] flex-1 overflow-y-auto overflow-x-hidden transition-all duration-100 ease-in-out before:absolute before:left-0 before:right-0 before:h-[50px] before:bg-gray-700 before:opacity-0 before:content-[""] after:bottom-0 max-sm:h-[230px] max-sm:w-full',
                  )}
                >
                  <ul
                    className={cn(
                      "mr-[-20px] flex h-full flex-col gap-3 overflow-y-auto overflow-x-hidden pr-[20px] max-sm:mt-5 max-sm:w-full max-sm:pr-0",
                    )}
                  >
                    {wallets.map(function (wallet, index: number) {
                      return (
                        <Wallet
                          key={index}
                          image={wallet.image}
                          name={wallet.name}
                          onConnectWallet={handleConnectWallet}
                        />
                      );
                    })}
                  </ul>
                </section>
              </aside>
            </section>
            {/* web3-end */}

            {/* web2-begin */}
            <section className={cn("mt-10")}>
              <div
                className={cn(
                  'flex items-center justify-between gap-3 text-white before:h-[1px] before:flex-1 before:overflow-hidden before:bg-white before:content-[""] after:h-[1px] after:flex-1 after:overflow-hidden after:bg-white',
                )}
              >
                <p
                  className={cn("flex items-center px-[10px] py-0 text-[16px]")}
                >
                  Web2 Login Powered by
                </p>
                <Link
                  className={cn("text-[14px] font-semibold text-white")}
                  target="_blank"
                  href={"/"}
                >
                  Paricle Network
                </Link>
              </div>
              <div
                className={cn(
                  "mt-[25px] flex items-center justify-center gap-7",
                )}
              >
                <Link
                  className={cn(
                    "flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-2",
                  )}
                  href={"/#"}
                >
                  <FaGoogle className={cn("text-[20px]")} />
                </Link>
                <Link
                  className={cn(
                    "flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-2",
                  )}
                  href={"/#"}
                >
                  <FaXTwitter className={cn("text-[20px]")} />
                </Link>
              </div>
            </section>
            {/* web2-end */}
          </aside>
          {/* wallet-end */}

          {/* footer-begin */}
          <footer className={cn("pb-[20px] text-center")}>
            <div className={cn("")}>
              <Link
                className={cn(
                  "border-b-[1px] border-solid border-white text-[14px] leading-[16px] text-white",
                )}
                href={routers.landing}
              >
                Help Center
              </Link>
            </div>
            <p className={cn("mt-4 text-[rgb(153,153,153)]")}>
              © 2024 Design & Develop With By Cardano2vn
            </p>
          </footer>
          {/* footer-end */}
        </div>
      </div>
    </main>
  );
}
