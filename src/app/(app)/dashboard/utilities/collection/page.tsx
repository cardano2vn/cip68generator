import { getAllCollection } from "@/services/database/collection";
import FolderCard from "./_components/folder-card";
import { CreateCollectionButton } from "./_components/create-collection-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isEmpty } from "lodash";

export default async function CollectionPage() {
  const { result, data: listCollection, message } = await getAllCollection();
  if (!result) {
    return <div>Failed to load collection : {message}</div>;
  }
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold leading-7">Collection Metadata</h1>
          <CreateCollectionButton />
        </div>
        <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
          {!isEmpty(listCollection) ? (
            <div className="overflow-x-auto">
              <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {listCollection.map((collection) => (
                  <FolderCard collection={collection} key={collection.id} />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 flex items-center justify-center">
              <Card className="w-full rounded-lg border ">
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-medium text-white text-center">You don't have any Collection</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6 pb-8">
                  <p className="text-gray-400 text-center">Press the button to create a new. </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
