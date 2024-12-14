"use client";

import AssetCard from "./_components/asset-card";
import { useProfileContext } from "@/contexts/profile";
import { useEffect, useState } from "react";
import Image from "next/image";
import { appImage, walletImage } from "@/public/images";
import { useBlockchainContext } from "@/components/providers/blockchain";
import CountUp from "react-countup";
import { decialPlace } from "@/constants";
import { shortenString } from "@/utils";
import AssetCardSkeleton from "./_components/asset-card-skeleton";
import Pagination from "@/components/common/pagination";
import ProfileFilter from "./_components/profile-filter";
import { isEmpty } from "lodash";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/constants/routers";
import Link from "next/link";
import { Plus } from "lucide-react";
import CopyButton from "@/components/common/copy-button";

export default function ProfilePage() {
  const { wallet, address, getBalance, stakeAddress, browserWallet } = useBlockchainContext();
  const { listNft, filter, setFilter, loading, totalPages, currentPage, setCurrentPage } = useProfileContext();

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
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <section className="rounded-xl p-6 bg-[#13161b] shadow-md flex items-center justify-between flex-wrap gap-3">
          <div className="grid gap-6 items-center min-w-0">
            <section className="flex items-center gap-2">
              <div className="flex items-center justify-center w-[90px] h-[90px] shadow-sm overflow-hidden border-[1px] border-solid border-gray-800 rounded-full max-md:w-14 max-md:h-14">
                <Image src={appImage.cardano} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 grid gap-1 justify-start ">
                <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap justify-stretch text-2xl max-md:text-[24px] max-md:leading-7">
                  {shortenString(stakeAddress || "", 10)}
                </h3>
                <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-[#282c34] text-gray-400 shadow-md gap-1">
                  {/* <IoLocation className="text-[20px] max-md:text-[14px] font-bold text-gray-200" /> */}
                  <span className="max-md:text-[12px]">{shortenString(address || "", 8)}</span>
                  <CopyButton content={address || ""} />
                </div>
              </div>
            </section>
            <section className="flex flex-wrap py-2 px-3 items-center gap-5 rounded-lg bg-[linear-gradient(270deg,_rgba(174,193,197,0)_0.07%,_rgba(174,193,197,0.19)_92.8%,_rgba(174,193,197,0.2)_99.14%)] max-md:py-1 max-md:px-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 max-md:w-5 max-md:h-5">
                  <Image src={wallet?.icon || walletImage.eternl} alt="Wallet" width={28} height={28} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px]">Balance</p>
                  <p className="text-[14px] font-semibold">
                    <CountUp start={0} end={Number((balance / decialPlace).toFixed(6))} decimals={6} /> ₳
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section>
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <AssetCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!loading && !isEmpty(listNft) ? (
            <>
              <ProfileFilter filter={filter} setFilter={setFilter} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {listNft.map((data, index) => (
                  <AssetCard data={data} key={index} />
                ))}
              </div>
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </>
          ) : (
            !loading &&
            isEmpty(listNft) && (
              <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
                <Card className="w-full rounded-lg border ">
                  <CardHeader className="pt-8">
                    <CardTitle className="text-2xl font-medium text-white text-center">You don't have any cip68 NFTs</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col items-center gap-6 pb-8">
                    <p className="text-gray-400 text-center">To get started you'll need your prepared assets, we'll help guide you along your way.</p>
                    <Link href={dashboardRoutes.mint.redirect}>
                      <Button variant="secondary" className="bg-white hover:bg-white/90 text-black">
                        <Plus className="mr-2 h-4 w-4" />
                        Mint Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}
