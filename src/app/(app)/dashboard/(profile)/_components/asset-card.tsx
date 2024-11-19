import FileDisplay from "@/components/common/file-display";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { IPFS_GATEWAY } from "@/constants";
import { AssetDetails } from "@/types";
import { hexToString } from "@meshsdk/core";
import Link from "next/link";
import { MdPolicy } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";

export default function AssetCard({ data }: { data: AssetDetails }) {
  return (
    <Link href={`/dashboard/${data.policy_id + data.asset_name}`}>
      <Card className="h-full">
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <FileDisplay
            src={
              IPFS_GATEWAY +
              (data.onchain_metadata &&
              typeof data.onchain_metadata.image === "string"
                ? (data.onchain_metadata.image as string).replace(
                    "ipfs://",
                    "ipfs/",
                  )
                : "")
            }
            alt={data.asset_name}
            type={
              typeof data.onchain_metadata?.type === "string"
                ? data.onchain_metadata.type
                : "image/png"
            }
            className="h-full w-full rounded-lg border object-cover"
          />
        </AspectRatio>
        <div className="items-center justify-start gap-3 self-stretch px-4 py-2">
          <div className="grid grid-cols-1 gap-2 relative">
            <VscVerified className="text-[25px] absolute top-1 right-4" />
            <div className="flex items-center gap relative rounded-md py-[2px] px-2 bg-[#282c34] w-fit">
              <MdPolicy className="text-xs" />
              <span className="text-xs">{data.fingerprint.slice(0, 20)}</span>
            </div>
            <div className="text-ellipsis text-nowrap whitespace-normal">
              {hexToString(data.asset_name)}
            </div>
            <div className="flex items-end justify-start gap-1 min-h-6 overflow-hidden">
              <div className="flex items-end gap-2">
                <span className="text-gray-300 text-[16px] leading-6">₳</span>
                <span className="text-gray-300 text-[16px] font-medium leading-6">
                  0.22
                </span>
                <span className="text-gray-400 text-[12px] leading-5 justify-end">
                  Fee with script reference
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
