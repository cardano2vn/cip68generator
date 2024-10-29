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
import { Copy, MoreVertical } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { IPFS_GATEWAY } from "@/constants";
import { useUploadContext } from "../_context";
import { Media } from "@prisma/client";

export default function MediaList() {
  const { loading, listMedia, listSelected, setListSelected } =
    useUploadContext();
  if (loading) return <div>Loading...</div>;

  const handleSellect = (media: Media, checked: boolean) => {
    if (checked) {
      setListSelected([...listSelected, media]);
    } else {
      setListSelected(listSelected.filter((item) => item !== media));
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
                CID
              </TableHead>
              <TableHead className="hidden font-normal sm:table-cell">
                DATE
              </TableHead>
              <TableHead className="text-right font-normal">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listMedia.map((file, index) => (
              <TableRow key={index} className="mb-2 rounded-lg">
                <TableCell className="rounded-l-lg font-medium">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      id={`checkbox-${index}`}
                      checked={listSelected.includes(file)}
                      className="rounded-full"
                      onClick={() =>
                        handleSellect(file, !listSelected.includes(file))
                      }
                    />

                    <div className="h-10 w-10 overflow-hidden rounded-lg">
                      <AspectRatio ratio={10 / 10} className="bg-muted">
                        <Image
                          src={
                            IPFS_GATEWAY + file.url.replace("ipfs://", "ipfs/")
                          }
                          alt={file.name}
                          fill
                          className="h-full w-full rounded-md object-cover"
                        />
                      </AspectRatio>
                    </div>
                    <div>
                      <div className="">{file.name}</div>
                      <div className="text-sm">{file.type}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center space-x-2">
                    <span className="">{file.url}</span>
                    <Copy className="h-5 w-5" />
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {file.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="rounded-r-lg text-right">
                  <Button variant="ghost" size="icon" className="hover:">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
