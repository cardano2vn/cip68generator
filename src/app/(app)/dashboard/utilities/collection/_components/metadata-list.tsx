import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMetadataContext } from "@/contexts/metadata";
import FileDisplay from "@/components/common/file-display";
import { AssetMetadata } from "@meshsdk/core";
import { isEmpty, isNil } from "lodash";
import { Metadata } from "@prisma/client";

export default function MetadataList() {
  const { loading, listMetadata, setListSelected, listSelected } =
    useMetadataContext();
  if (loading) return <div>Loading...</div>;

  const handleSellect = (metadata: Metadata, checked: boolean) => {
    if (checked) {
      setListSelected([...listSelected, metadata]);
    } else {
      setListSelected(listSelected.filter((item) => item !== metadata));
    }
  };

  return (
    <div className="w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] font-normal">NAME</TableHead>
              <TableHead className="hidden font-normal md:table-cell">
                Content
              </TableHead>
              <TableHead className="hidden font-normal sm:table-cell">
                DATE
              </TableHead>
              <TableHead className="text-right font-normal">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isNil(listMetadata) && !isEmpty(listMetadata) ? (
              listMetadata.map((item, index) => {
                const { name } = item.content as AssetMetadata;
                return (
                  <TableRow key={index} className="mb-2 rounded-lg">
                    <TableCell className="rounded-l-lg font-medium">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={`checkbox-${index}`}
                          checked={listSelected.includes(item)}
                          className="rounded-full"
                          onClick={() =>
                            handleSellect(item, !listSelected.includes(item))
                          }
                        />
                        <div className="h-10 w-10 overflow-hidden rounded-lg">
                          <AspectRatio ratio={10 / 10} className="bg-muted">
                            <FileDisplay
                              src={``}
                              alt={name}
                              type={"text/plain"}
                              className="h-full w-full rounded-md object-cover"
                            />
                          </AspectRatio>
                        </div>
                        <div>
                          <div className="">
                            {!isNil(name) && name.length > 15
                              ? name.slice(0, 15) + "..."
                              : name}
                          </div>
                          <div className="text-sm">application/json</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        {/* <AspectRatio ratio={4 / 3} className="bg-muted">
                        <Image
                          src={`/metadata-image?metadata=${encodeURIComponent(JSON.stringify(metadata.content))}`}
                          alt={name}
                          fill
                          className="h-full w-full rounded-lg border object-cover"
                        />
                      </AspectRatio>
                      <Copy className="h-5 w-5" /> */}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {item.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="rounded-r-lg text-right">
                      <Button variant="ghost" size="icon" className="hover:">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No metadata found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
