import { Button } from "@/components/ui/button";
import { CreateCollection } from "../_components/create-collection-button";
import { SearchBar } from "../_components/search-bar";
import ListFolderCard from "../_components/list-folder";
export default function CollectionPage() {
  return (
    <div className="mt-5 rounded-lg bg-section p-2">
      <h1 className="text-2xl font-semibold leading-7">Collection</h1>
      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2">
          <div />
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
            <CreateCollection />
          </div>
        </div>
        <SearchBar />
        <ListFolderCard />
      </div>
    </div>
  );
}
