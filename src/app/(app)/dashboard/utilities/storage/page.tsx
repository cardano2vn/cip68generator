"use client";
import { Icons } from "@/components/common/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";
import { dashboardRoutes } from "@/constants/routers";
import { useUploadContext } from "./_context";
import { UploadOneDialog } from "./_components/upload-one-dialog";
import MediaGird from "./_components/media-gird";
import MediaList from "./_components/media-list";
import { ExternalLink } from "lucide-react";
import Pagination from "./_components/pagination";
import { Filter } from "./_components/filter";
export default function StogarePage() {
  const { setUploadOneDialogOpen } = useUploadContext();
  return (
    <div className="mt-5 rounded-lg bg-section p-2">
      <UploadOneDialog />
      <h1 className="text-2xl font-semibold leading-7">Stogare</h1>
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
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Button variant="secondary" className="rounded-r-none">
                  Select All
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-none border-x border-gray-600"
                >
                  Format
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-none border-r border-gray-600"
                >
                  Download
                </Button>
                <Button variant="secondary" className="rounded-l-none">
                  Delete
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "bg-orange-500 text-white hover:bg-orange-600 border-none",
                  )}
                >
                  Upload New
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => setUploadOneDialogOpen(true)}
                      variant="ghost"
                      className="border-none h-6"
                    >
                      Upload One
                    </Button>
                  </DropdownMenuItem>
                  <Link
                    href={
                      dashboardRoutes.utilities.children.storage.children
                        .uploadFolder.redirect
                    }
                    className={cn(buttonVariants({ variant: "ghost" }))}
                  >
                    <DropdownMenuItem> Upload Many</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Filter />
          <TabsContent value="list">
            <MediaList />
          </TabsContent>
          <TabsContent value="grid">
            <MediaGird />
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
