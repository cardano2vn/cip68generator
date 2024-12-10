"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/utils";
import { getAllCollection } from "@/services/database/collection";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { dashboardRoutes } from "@/constants/routers";

export function SaveMetadata({
  collectioToSave,
  setCollectionToSave,
}: {
  collectioToSave: string;
  setCollectionToSave: (collection: string) => void;
}) {
  const [saveToDatabase, setSaveToDatabase] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllCollection", saveToDatabase],
    queryFn: () => getAllCollection(),
    enabled: !!saveToDatabase,
  });

  return (
    <div className="space-y-4 p-4 bg-background rounded-lg border">
      <div className="flex items-center space-x-2">
        <Switch
          id="save-to-database"
          checked={saveToDatabase}
          onCheckedChange={(value) => {
            if (value) {
              setSaveToDatabase(value);
              setCollectionToSave(null!);
            }
            setSaveToDatabase(value);
          }}
        />
        <h2 className="text-lg font-semibold">Save Metadata To Database</h2>
      </div>

      {saveToDatabase && (
        <>
          {isLoading && <p>Loading collections...</p>}
          {error && <p className="text-red-500">{error.message}</p>}
          {!isLoading && !error && data && data?.data.length > 0 ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {collectioToSave ? data?.data.find((collection) => collection.id === collectioToSave)?.name : "Select collection..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search collections..." />
                  <CommandEmpty>No collection found.</CommandEmpty>
                  <CommandList>
                    {/* <CommandGroup> */}
                    {data?.data.map((collection) => (
                      <CommandItem
                        value={collection.id}
                        key={collection.id}
                        onSelect={(vallue) => {
                          console.log(vallue);
                          setCollectionToSave(vallue === collectioToSave ? "" : vallue);
                          setOpen(false);
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", collectioToSave === collection.id ? "opacity-100" : "opacity-0")} />
                        {collection.name}
                      </CommandItem>
                    ))}
                    {/* </CommandGroup> */}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ) : (
            <p>
              No collection found, create it on{" "}
              <Link className="underline" href={dashboardRoutes.utilities.children.collection.redirect}>
                Collection
              </Link>{" "}
              page
            </p>
          )}
        </>
      )}
    </div>
  );
}
