"use client";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "../../../../../components/common/date-range-picker";

export const SearchBar = () => {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg p-4 sm:flex-row sm:space-x-2 sm:space-y-0">
      <div className="relative flex-grow">
        <Icons.search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
        <Input
          type="text"
          placeholder="Search by Name or CID"
          className="w-full rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2"
        />
      </div>
      <div className="flex space-x-2">
        <DatePickerWithRange />
      </div>
      <Button className="rounded-md bg-blue-500 px-4 py-2 font-semibold transition duration-300 ease-in-out">
        Search
      </Button>
    </div>
  );
};
