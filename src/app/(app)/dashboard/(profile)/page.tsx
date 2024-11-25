"use client";

import { Button } from "@/components/ui/button";
import AssetCard from "./_components/asset-card";
import { useProfileContext } from "@/contexts/profile";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FilterType } from "@/types";
import { filterDefault } from "@/constants";

export default function ProfilePage() {
  const { listNft, filter, setFilter } = useProfileContext();
  const [temp, setTemp] = useState<FilterType>(filter);
  const handleSearch = () => {
    if (temp) {
      setFilter(temp);
    }
  };
  const resetFilter = () => {
    setTemp(filterDefault);
    setFilter(filterDefault);
  };
  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        {/* <Tabs defaultValue="my-nfts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="my-nfts">My NFTs (5)</TabsTrigger>
            <TabsTrigger value="listings">Listings (1)</TabsTrigger>
            <TabsTrigger value="loans">Loans (0)</TabsTrigger>
            <TabsTrigger value="activity">Activity (3)</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="creations">Creations (1)</TabsTrigger>
          </TabsList>
        </Tabs> */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filters</span>
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search By AssetName"
              className="pl-8"
              value={temp.query}
              onChange={(e) => setTemp({ ...temp, query: e.target.value })}
            />
          </div>
          {JSON.stringify(filter) == JSON.stringify(filterDefault) ? (
            <Button
              variant="secondary"
              onClick={handleSearch}
              className="rounded-md bg-blue-500 w-20 px-4 py-2 font-semibold transition duration-300 ease-in-out"
            >
              Search
            </Button>
          ) : (
            <Button
              onClick={resetFilter}
              className="rounded-md bg-blue-500 w-20 px-4 py-2 font-semibold transition duration-300 ease-in-out"
            >
              Reset
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {listNft.map((data, index) => (
            <AssetCard data={data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
