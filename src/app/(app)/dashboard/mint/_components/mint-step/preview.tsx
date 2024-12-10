"use client";
import { Button } from "@/components/ui/button";
import Property from "../property";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import FileDisplay from "@/components/common/file-display";
import { Card, CardContent } from "@/components/ui/card";
import { shortenString } from "@/utils";
import { useEffect, useState } from "react";
import { getContractPolicyId } from "@/services/contract/get-policy-id";
import CopyButton from "@/components/common/copy-button";
import { SaveMetadata } from "../save-metadata";
import { Info } from "lucide-react";

export default function PreviewStep({
  stepper,
  metadataToMint,
  basicInfoToMint,
  startMinting,
  collectionToSave,
  setCollectionToSave,
}: {
  stepper: { prev: () => void; isFirst: boolean };
  metadataToMint: Record<string, string> | null;
  basicInfoToMint: { assetName: string; quantity: string };
  startMinting: () => void;
  collectionToSave: string;
  setCollectionToSave: (value: string) => void;
}) {
  const [nftPolicyId, setNftPolicyId] = useState<string>("");
  const assetNameSort = basicInfoToMint?.assetName || "No name";
  const totalSupply = basicInfoToMint?.quantity || "1";
  const imgSrc = metadataToMint?.image || "";
  const mediaType = imgSrc == "" ? "text/plain" : metadataToMint?.mediaType || "image/png";

  useEffect(() => {
    getContractPolicyId().then(setNftPolicyId);
  }, []);

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed p-4">
        <div className="w-full flex flex-wrap gap-5">
          <div className="flex flex-row gap-6 w-full">
            {/* NFT Image */}
            <div className="w-full h-full md:w-1/2">
              <AspectRatio ratio={4 / 4}>
                <FileDisplay
                  src={imgSrc}
                  alt={"image"}
                  objectFit="contain"
                  type={mediaType}
                  className="h-auto w-full rounded-lg border object-contain"
                />
              </AspectRatio>
            </div>

            {/* NFT Details */}
            <Card className="w-full h-full md:w-1/2 bg-card ">
              <CardContent className="p-6 space-y-6">
                {/* Title and Verification */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{assetNameSort}</h1>
                    <span className="text-blue-400">✓</span>
                  </div>
                </div>

                {/* Policy and Asset IDs */}
                <div className="space-y-2 ">
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap">Policy ID: {nftPolicyId}</span>
                    <CopyButton content={nftPolicyId} />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap h-10 py-2">
                      Asset ID: (will show affter mint)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg ">
                    <span className="text-sm text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap h-10 py-2">
                      Total Supply: {totalSupply}
                    </span>
                  </div>
                </div>
                <SaveMetadata collectioToSave={collectionToSave} setCollectionToSave={setCollectionToSave} />
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <div className="w-full mt-5">
            <Card className="p-5 border-none rounded-lg flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                  {metadataToMint && Object.entries(metadataToMint).map(([name, value], index) => <Property key={index} name={name} value={value} />)}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
        <div className="mx-4 flex h-16 items-center sm:mx-8">
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="secondary" onClick={stepper.prev} disabled={stepper.isFirst}>
              Back
            </Button>
            <Button onClick={startMinting}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
