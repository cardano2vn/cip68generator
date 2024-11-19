import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Metadata } from "@prisma/client";
// import { IPFS_GATEWAY } from "@/constants";
import { useMetadataContext } from "@/contexts/metadata";
// import FileDisplay from "@/components/common/file-display";
import { AssetMetadata } from "@meshsdk/core";
import Image from "next/image";
import { isNil } from "lodash";

export default function MetadataCard({ metadata }: { metadata: Metadata }) {
  const { listSelected, setListSelected } = useMetadataContext();
  const handleSellect = (metadata: Metadata, checked: boolean) => {
    if (checked) {
      setListSelected([...listSelected, metadata]);
    } else {
      setListSelected(listSelected.filter((item) => item !== metadata));
    }
  };

  const { name } = metadata.content as AssetMetadata;

  return (
    <Card className="rounded-lg p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            className="h-4 w-4 rounded-full"
            checked={listSelected.includes(metadata)}
            onClick={() =>
              handleSellect(metadata, !listSelected.includes(metadata))
            }
          />
          <label
            htmlFor="metadata-select"
            className="cursor-pointer truncate text-sm"
          >
            {!isNil(name) && name.length > 15
              ? name.slice(0, 15) + "..."
              : name}
          </label>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <Image
          src={`/metadata-image?metadata=${encodeURIComponent(JSON.stringify(metadata.content))}`}
          alt={name || "Metadata"}
          width={800}
          height={600}
          className="h-full w-full rounded-lg border object-cover"
        />
      </AspectRatio>
    </Card>
  );
}
