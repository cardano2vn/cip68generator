import { Icons } from "@/components/common/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { getMedia } from "@/services/database/media";
import { SearchBar } from "../_components/search-bar";
import TableData from "../_components/file-table";
import ListFileCard from "../_components/list-file";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";
export default async function StogarePage() {
  const listMedia = await getMedia();
  return (
    <div className="mt-5 rounded-lg bg-section p-2">
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
                  <Link href="storage/upload/file">
                    <DropdownMenuItem> Upload File</DropdownMenuItem>
                  </Link>
                  <Link href="storage/upload/folder">
                    <DropdownMenuItem> Upload Folder</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <SearchBar />
          <TabsContent value="list">
            <TableData listMedia={listMedia} />
          </TabsContent>
          <TabsContent value="grid">
            <ListFileCard listMedia={listMedia} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
