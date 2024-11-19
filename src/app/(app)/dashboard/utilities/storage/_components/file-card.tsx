import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Media } from "@prisma/client";
import { IPFS_GATEWAY } from "@/constants";
import { useUploadContext } from "@/contexts/storage";
import FileDisplay from "../../../../../../components/common/file-display";

export default function FileCard({ file }: { file: Media }) {
  const { listSelected, setListSelected } = useUploadContext();
  const handleSellect = (media: Media, checked: boolean) => {
    if (checked) {
      setListSelected([...listSelected, media]);
    } else {
      setListSelected(listSelected.filter((item) => item !== media));
    }
  };
  return (
    <Card className="rounded-lg p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            className="h-4 w-4 rounded-full"
            checked={listSelected.includes(file)}
            onClick={() => handleSellect(file, !listSelected.includes(file))}
          />
          <label
            htmlFor="file-select"
            className="cursor-pointer truncate text-sm"
          >
            {file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name}
          </label>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <FileDisplay
          src={IPFS_GATEWAY + file.url.replace("ipfs://", "ipfs/")}
          alt={file.name}
          type={file.type}
          className="h-full w-full rounded-lg border object-cover"
        />
      </AspectRatio>
    </Card>
  );
}
