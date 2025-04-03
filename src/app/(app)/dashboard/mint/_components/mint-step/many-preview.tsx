import FileDisplay from "@/components/common/file-display";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { isNil, isEmpty } from "lodash";
import { ViewMetadataContent } from "@/components/common/view-json";
import { AssetInput } from "@/types";
import { shortenString } from "@/utils";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import CopyButton from "@/components/common/copy-button";

export default function ManyPreview({
  stepper,
  assetInputToMint,
  setAssetInputToMint,
  startMinting,
}: {
  stepper: { prev: () => void; isFirst: boolean };
  assetInputToMint: AssetInput[];
  setAssetInputToMint: (value: AssetInput[]) => void;
  startMinting: () => void;
}) {
  return (
    <>
      <div className="w-full space-y-4 rounded-lg p-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="w-[300px] font-normal">AssetName/Metadata name</TableHead>
                <TableHead className="text-center font-normal">Receiver</TableHead>
                <TableHead className="text-center font-normal">Metadata</TableHead>
                <TableHead className="text-right font-normal">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isNil(assetInputToMint) && !isEmpty(assetInputToMint) ? (
                assetInputToMint.map((item: AssetInput, index: number) => {
                  const { name, image, mediaType } = item.metadata as Record<string, string>;
                  return (
                    <TableRow key={index} className="mb-2 rounded-lg">
                      <TableCell className="rounded-l-lg font-medium">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 overflow-hidden rounded-lg">
                            <AspectRatio ratio={10 / 10} className="bg-muted">
                              <FileDisplay src={image} alt={name} type={mediaType} className="h-full w-full rounded-md object-cover" />
                            </AspectRatio>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div>
                            <div className="">{shortenString(item.assetName, 15)}</div>
                            <div className="text-sm">{shortenString(name, 15)}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        {!isEmpty(item.receiver) ? (
                          <>
                            {shortenString(item.receiver, 15)}
                            <CopyButton content={item.receiver || ""} className="text-center" />
                          </>
                        ) : (
                          "Author"
                        )}
                      </TableCell>
                      <TableCell className=" text-center">{item.metadata && <ViewMetadataContent json={item.metadata} />}</TableCell>
                      <TableCell className=" text-right">
                        <Button variant="destructive" onClick={() => setAssetInputToMint(assetInputToMint.filter((i) => i !== item))}>
                          <Trash2Icon />
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
      <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
        <div className="mx-4 flex h-16 items-center sm:mx-8">
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="secondary" onClick={stepper.prev} disabled={stepper.isFirst}>
              Back
            </Button>
            <Button disabled={isEmpty(assetInputToMint)} onClick={startMinting}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
