"use client";

import AssetCard from "./_components/asset-card";
import { useProfileContext } from "@/contexts/profile";
import Image from "next/image";
import { appImage } from "@/public/images";
import { shortenString } from "@/utils";
import AssetCardSkeleton from "./_components/asset-card-skeleton";
import Pagination from "@/components/common/pagination";
import ProfileFilter from "./_components/profile-filter";
import { isEmpty } from "lodash";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { Plus } from "lucide-react";
import CopyButton from "@/components/common/copy-button";
import { useQuery } from "@tanstack/react-query";
import getUserStatistics from "@/services/user/get-statistic";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@/hooks/use-wallet";

export default function ProfilePage() {
  const { address, stakeAddress } = useWallet();
  const { listNft, filter, setFilter, loading, totalPages, currentPage, setCurrentPage, totalUserAssets } = useProfileContext();

  const { data: userStatistics, isLoading: statisticLoading } = useQuery({ queryKey: ["getUserStatistics"], queryFn: () => getUserStatistics() });
  const isLoading = loading || statisticLoading;
  const { collection, media, metadata } = userStatistics?.data || {};

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
          </div>
        </section>
        <div className="grid gap-4 grid-cols-4 w-full">
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-[100px]" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[60px]" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL ASSETS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUserAssets}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">COLLECTION</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{collection}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">STORAGE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{media}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">METADATA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metadata}</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
        <section>
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <AssetCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!isLoading && totalUserAssets > 0 ? (
            <>
              <ProfileFilter filter={filter} setFilter={setFilter} />
              {isEmpty(listNft) ? (
                <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
                  <Card className="w-full rounded-lg border ">
                    <CardHeader className="pt-8">
                      <CardTitle className="text-2xl font-medium text-white text-center">No NFTs found</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6 pb-8">
                      <p className="text-gray-400 text-center">We couldn't find any NFTs that match your search criteria.</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {listNft.map((data, index) => (
                    <AssetCard data={data} key={index} />
                  ))}
                </div>
              )}
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </>
          ) : !isLoading && totalUserAssets < 1 ? (
            <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
              <Card className="w-full rounded-lg border ">
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-medium text-white text-center">You don't have any cip68 NFTs</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6 pb-8">
                  <p className="text-gray-400 text-center">To get started you'll need your prepared assets, we'll help guide you along your way.</p>
                  <Link href={routes.mint.redirect}>
                    <Button variant="secondary" className="bg-white hover:bg-white/90 text-black">
                      <Plus className="mr-2 h-4 w-4" />
                      Mint Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
