"use client";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { useMetadataContext } from "@/contexts/metadata";
import MetadataList from "../_components/metadata-list";
import MetadataGird from "../_components/metadata-gird";
import Pagination from "../_components/pagination";
import { ExternalLink } from "lucide-react";
import { Filter } from "../_components/filter";
import MetadataAction from "../_components/metadata-action";

export default function MetadataPage() {
  const { collectionId } = useMetadataContext();
  return (
    <div className="mt-5 rounded-lg bg-section p-2">
      <h1 className="text-2xl font-semibold leading-7">Metadata</h1>
      <div className="mt-5">
        <Tabs defaultValue="list" className="px-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2">
            <TabsList>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-gray-600"
              >
                <Icons.squareMenu className="h-5 w-5" />
              </TabsTrigger>
              <TabsTrigger
                value="grid"
                className="data-[state=active]:bg-gray-600"
              >
                <Icons.layoutGrid className="h-5 w-5" />
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <MetadataAction />
              <Link href={`${collectionId}/create`}>
                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                  Create New
                </Button>
              </Link>
            </div>
          </div>
          <Filter />
          <TabsContent value="list">
            <MetadataList />
          </TabsContent>
          <TabsContent value="grid">
            <MetadataGird />
          </TabsContent>
        </Tabs>
        <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
          <Button variant="link" className="text-sm font-semibold sm:text-base">
            <span>Document</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
