"use client";
import FolderCard from "../_components/folder-card";
import { CreateCollectionButton } from "./_components/create-collection-button";
import { useCollectionContext } from "@/contexts/collection";
export default function CollectionPage() {
  const { listCollection } = useCollectionContext();
  return (
    <div className="mt-5 rounded-lg bg-section p-2">
      <h1 className="text-2xl font-semibold leading-7">Collection Metadata</h1>
      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2">
          <div />
          <div className="flex items-center space-x-2">
            <CreateCollectionButton />
          </div>
        </div>
        <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
          <div className="overflow-x-auto">
            <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {listCollection.map((collection, index) => (
                <FolderCard collection={collection} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
