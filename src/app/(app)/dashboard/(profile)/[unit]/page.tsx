"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileDisplay from "@/components/common/file-display";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { isNil } from "lodash";
import { useUnitContext } from "@/contexts/unit";
import Loading from "@/app/(loading)/loading";
import Property from "../_components/property";
import { hexToString } from "@meshsdk/core";
import CopyButton from "@/components/common/copy-button";
import TransactionHistory from "../_components/transaction-history";

export default function DetailsPage() {
  const { assetDetails, handleBurn, handleUpdate, isAuthor, metadataToUpdate } = useUnitContext();

  if (isNil(assetDetails)) return <Loading />;
  const { asset_name, policy_id, onchain_metadata, fingerprint, quantity } = assetDetails;

  const assetNameString = hexToString(asset_name.replace(/^000de140/, ""));

  const imgSrc = onchain_metadata?.image || "";

  const mediaType = onchain_metadata?.mediaType || "image/png";

  const totalSupply = quantity || "1";

  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6  flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-6">
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
                  <h1 className="text-2xl font-bold overflow-hidden whitespace-nowrap">{assetNameString}</h1>
                  <span className="text-blue-400">✓</span>
                </div>
              </div>

              {/* Policy and Asset IDs */}
              <div className="space-y-2 ">
                <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap">Policy ID: {policy_id}</span>
                  <CopyButton content={policy_id} className="h-8 w-8" />
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-400 overflow-hidden whitespace-nowrap">Asset ID: {fingerprint}</span>
                  <CopyButton content={fingerprint} className="h-8 w-8" />
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-400 overflow-hidden whitespace-nowrap">Total Supply: {totalSupply}</span>
                  <CopyButton content={totalSupply} className="h-8 w-8" />
                </div>
              </div>

              {/* Description */}
              {/* <p className="text-gray-400">{description}</p> */}
              <div className="space-y-4">
                {isAuthor && (
                  <div className="flex gap-4">
                    <Button onClick={handleUpdate} className="flex-1 bg-gray-800 hover:bg-gray-700">
                      Update
                    </Button>
                    <Button onClick={handleBurn} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                      Burn
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="properties" className="w-full mt-5">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="transaction">Transaction History</TabsTrigger>
          </TabsList>
          <TabsContent value="properties" className="mt-4">
            <Card className="p-5 border-none rounded-lg flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                  {metadataToUpdate &&
                    Object.entries(metadataToUpdate).map(([name, value], index) => <Property key={index} name={name} value={value} />)}
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="transaction" className="mt-4">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
