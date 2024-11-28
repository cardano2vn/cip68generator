"use client";

import AssetCard from "./_components/asset-card";
import { useProfileContext } from "@/contexts/profile";
import { IoLocation } from "react-icons/io5";
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

export default function ProfilePage() {
  const { wallet, address, getBalance, browserWallet } = useBlockchainContext();
  const {
    listNft,
    filter,
    setFilter,
    loading,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useProfileContext();

  const [balance, setBalance] = useState<number>(0);
  const [stakeAddress, setStakeAddress] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (wallet && browserWallet) {
        const stakeAddress = await browserWallet.getRewardAddresses();
        setStakeAddress(stakeAddress[0]);
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
                <Image
                  src={appImage.cardano}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 grid gap-1 justify-start ">
                <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap justify-stretch text-2xl max-md:text-[24px] max-md:leading-7">
                  {shortenString(stakeAddress || "Cardano", 10)}
                </h3>
                <div className="flex items-center justify-center py-1 px-2 rounded-lg bg-[#282c34] text-gray-400 shadow-md gap-1">
                  <IoLocation className="text-[20px] max-md:text-[14px] font-bold text-gray-200" />
                  <span className="max-md:text-[12px]">
                    {shortenString(address || "", 8)}
                  </span>
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.643 6.5H8V6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-.5v-4.643A4.857 4.857 0 0 0 12.643 6.5ZM12 22H6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </section>
            <section className="flex flex-wrap py-2 px-3 items-center gap-5 rounded-lg bg-[linear-gradient(270deg,_rgba(174,193,197,0)_0.07%,_rgba(174,193,197,0.19)_92.8%,_rgba(174,193,197,0.2)_99.14%)] max-md:py-1 max-md:px-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 max-md:w-5 max-md:h-5">
                  <Image
                    src={wallet?.icon || walletImage.eternl}
                    alt="Wallet"
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px]">Balance</p>
                  <p className="text-[14px] font-semibold">
                    <CountUp
                      start={0}
                      end={Number((balance / decialPlace).toFixed(6))}
                      decimals={6}
                    />{" "}
                    ₳
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div></div>
        </section>
        <ProfileFilter filter={filter} setFilter={setFilter} />
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <AssetCardSkeleton key={index} />
            ))}
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
            {listNft.map((data, index) => (
              <AssetCard data={data} key={index} />
            ))}
          </div>
        )}

        {!loading && (
          <div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}
