import { isEmpty, isNil } from "lodash";
import { useMetadataContext } from "@/contexts/metadata";
import MetadataCard from "./metadata-card";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function MetadataGird() {
  const { loading, listMetadata } = useMetadataContext();

  return (
    <div className="w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            [...Array(10)].map((_, index) => (
              <Card key={index} className="rounded-lg p-2">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
                <AspectRatio ratio={4 / 3} className="bg-muted">
                  <Skeleton className="h-full w-full rounded-lg" />
                </AspectRatio>
              </Card>
            ))
          ) : !isNil(listMetadata) && !isEmpty(listMetadata) ? (
            listMetadata.map((item, index) => {
              return <MetadataCard metadata={item} key={index} />;
            })
          ) : (
            <div className="text-center col-span-full">No metadata found</div>
          )}
        </div>
      </div>
    </div>
  );
}
