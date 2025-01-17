import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ProfileFilter({ filter, setFilter }: { filter: FilterType; setFilter: (filter: FilterType) => void }) {
  const [temp, setTemp] = useState<FilterType>(filter);

  const handleSearch = () => {
    if (temp) {
      setFilter(temp);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search By AssetName"
            className="pl-8"
            value={temp.query}
            onChange={(e) => setTemp({ ...temp, query: e.target.value })}
          />
        </div>
        <Button
          variant="secondary"
          onClick={handleSearch}
          className="rounded-md bg-blue-500 w-20 px-4 py-2 font-semibold transition duration-300 ease-in-out"
        >
          Search
        </Button>
      </div>
    </>
  );
}
