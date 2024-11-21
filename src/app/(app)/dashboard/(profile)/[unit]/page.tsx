"use client";
import { appImage } from "@/public/images";
import Image from "next/image";
import { MdPolicy } from "react-icons/md";
import Pagination from "../_components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isEmpty, isNil } from "lodash";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import FileDisplay from "@/components/common/file-display";
import { IPFS_GATEWAY } from "@/constants";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import Property from "../_components/property";
import { hexToString } from "@meshsdk/core";
import { useUnitContext } from "@/contexts/unit";
import UpdateButton from "../_components/update-button";
import BurnButton from "../_components/burn-button";
export default function DetailPage() {
  const { assetDetails, handleBurn, handleUpdate } = useUnitContext();
  if (isNil(assetDetails)) return "no data";
  const { onchain_metadata: metadata, fingerprint } = assetDetails;

  // const transactions = [
  //   {
  //     txHash: "600d06204bde...af2ce50",
  //     datetime: "25 Sep, 2024 10:46",
  //     action: "Mint",
  //     fees: "₳ 0.22",
  //     owner: "600d06204bde...af2ce50",
  //     status: "Complete",
  //   },
  //   {
  //     txHash: "600d06204bde...af2ce50",
  //     datetime: "25 Sep, 2024 10:46",
  //     action: "Mint",
  //     fees: "₳ 0.22",
  //     owner: "600d06204bde...af2ce50",
  //     status: "Complete",
  //   },
  //   {
  //     txHash: "600d06204bde...af2ce50",
  //     datetime: "25 Sep, 2024 10:46",
  //     action: "Mint",
  //     fees: "₳ 0.22",
  //     owner: "600d06204bde...af2ce50",
  //     status: "Complete",
  //   },
  //   {
  //     txHash: "600d06204bde...af2ce50",
  //     datetime: "25 Sep, 2024 10:46",
  //     action: "Mint",
  //     fees: "₳ 0.22",
  //     owner: "600d06204bde...af2ce50",
  //     status: "Complete",
  //   },
  //   // Add more transactions here if needed
  // ];

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="py-8 px-10 m-auto flex flex-col gap-6">
        <div className="w-full flex flex-wrap gap-5">
          <div className="flex-1 flex gap-8 flex-col">
            <div className="relative w-full h-full bg-[#1c1f2b] rounded-lg border-[1px] border-solid border-[#282c34]">
              <AspectRatio ratio={4 / 3} className="bg-muted">
                <FileDisplay
                  src={
                    IPFS_GATEWAY +
                      metadata?.image.replace("ipfs://", "ipfs/") || ""
                  }
                  alt={"image"}
                  type={metadata?.type || "image/png"}
                  className="h-full w-full rounded-lg border object-cover"
                />
              </AspectRatio>
              {/* <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <Button className="w-8 h-8 rounded-lg text-[15px bg-[#282c34] flex items-center justify-center">
                  <IoMdPhotos className=" text-white" />
                </Button>
                <Button className="w-8 h-8 rounded-lg text-[15px bg-[#282c34] flex items-center justify-center">
                  <IoMdPhotos className=" text-white" />
                </Button>
                <Button className="w-8 h-8 rounded-lg text-[15px bg-[#282c34] flex items-center justify-center">
                  <IoMdPhotos className=" text-white" />
                </Button>
              </div> */}
            </div>
            {/* metadata-begin */}
            <div className="bg-[#13161b] p-5 border-none rounded-lg flex flex-col gap-8">
              <header className="flex items-center pb-4 justify-between gap-2 border-b-[1px] border-solid border-gray-500">
                <h2 className="text-white text-[18px] font-semibold leading-[24px]">
                  Metadata
                </h2>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.22 9.375a1 1 0 0 1 1.405-.156L12 12.72l4.375-3.5a1 1 0 0 1 1.25 1.562l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1-.156-1.406Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </header>
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-3 gap-y-5 gap-x-2">
                  {assetDetails.onchain_metadata &&
                    Object.entries(assetDetails.onchain_metadata).map(
                      ([name, value], index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Property
                                image=""
                                name={name}
                                value={
                                  isNil(value) || isEmpty(value)
                                    ? "null"
                                    : JSON.stringify(value)
                                        .replace(/^"|"$/g, "")
                                        .slice(0, 10) +
                                      (JSON.stringify(value).replace(
                                        /^"|"$/g,
                                        "",
                                      ).length > 10
                                        ? "..."
                                        : "")
                                }
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              {isNil(value) || isEmpty(value)
                                ? "null"
                                : `${value}`}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ),
                    )}
                </div>
              </div>
            </div>
            {/* metadata-end */}
            {/* history-begin */}
            <div className="bg-[#13161b] p-5 border-none rounded-lg flex flex-col gap-8">
              <header className="flex items-center pb-4 justify-between gap-2 border-b-[1px] border-solid border-gray-500">
                <h2 className="text-white text-[18px] font-semibold leading-[24px]">
                  History
                </h2>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.22 9.375a1 1 0 0 1 1.405-.156L12 12.72l4.375-3.5a1 1 0 0 1 1.25 1.562l-5 4a1 1 0 0 1-1.25 0l-5-4a1 1 0 0 1-.156-1.406Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </header>
              <div className="flex flex-col gap-8">
                <div className="bg-[#1c1f25] rounded-lg py-8 px-5">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                          Tx Index
                        </TableHead>
                        <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                          TX Hash
                        </TableHead>
                        <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                          Time
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assetDetails.transaction_history.map(
                        (transaction, index) => (
                          <TableRow
                            key={index}
                            className={index % 2 === 0 ? "bg-[#0d0e12]" : ""}
                          >
                            <TableCell className="h-14 py-5 px-4 text-center">
                              <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
                                {transaction.tx_index}
                              </h3>
                              {/* <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                                {transaction.block_time}
                              </p> */}
                            </TableCell>
                            <TableCell className="h-14 py-5 px-4 text-center">
                              <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
                                {transaction.tx_hash}
                              </h3>
                              {/* <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                                {transaction.fees}
                              </p> */}
                            </TableCell>
                            <TableCell className="h-14 py-5 px-4 text-center">
                              <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
                                {new Date(
                                  transaction.block_time * 1000,
                                ).toLocaleString()}
                              </h3>
                              {/* <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                                {transaction.status}
                              </p> */}
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                  {/* pagination-begin */}
                  {/* <Pagination
                    page={1}
                    setPage={null!}
                    totalItems={1}
                    totalPages={3}
                  /> */}
                  {/* pagination-end */}
                </div>
              </div>
            </div>
            {/* history-end */}
          </div>
          {/* left-begin */}
          <div className="w-[30.41666667%] sticky top-20  max-w-full">
            <div className=" p-5  bg-[#1c1f2b] rounded-lg border-[1px] border-solid border-[#282c34]">
              <div className="w-full  h-[200px] bg-[#1c1f2b] overflow-hidden rounded-lg border-[1px] border-solid border-[#282c34] mb-6">
                <Image
                  src={appImage.collection}
                  className="w-full h-full rounded-lg object-cover"
                  alt=""
                />
              </div>
              {/* assetname-begin */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center flex-1 overflow-hidden gap-[10px]">
                  <div className=" flex items-center justify-center w-8 h-8 rounded-full border-[1px] border-solid border-gray-400">
                    <span className="text-[16px] leading-6 font-medium">
                      {assetDetails.quantity}
                    </span>
                  </div>
                  <h1 className="w-full flex overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
                    {hexToString(assetDetails.asset_name || "")}
                  </h1>
                </div>
              </div>
              {/* assetname-end */}
              {/* policy-begin */}
              <div className="flex items-center gap-2 relative rounded-md py-[2px] px-2 bg-[#282c34] w-fit my-[10px] mx-0">
                <MdPolicy className="text-base" />
                <span className="text-base">{fingerprint?.slice(0, 20)}</span>
              </div>
              {/* policy-end */}
              {/* owner-begin */}
              {/* <div className="my-4 mx-0 flex items-center w-full min-w-0 box-border">
                <div className="grid gap flex-1">
                  <h3 className="uppercase space-x-3 text-gray-400 text-[10px] leading-[16px] font-semibold">
                    OWNER
                  </h3>
                  <Link
                    href="/#"
                    className="flex items-center gap-2 overflow-hidden"
                  >
                    <div className="w-8 h-8 overflow-hidden relative rounded-full">
                      <Image
                        className="w-full h-full object-cover "
                        src={appImage.logo}
                        alt=""
                      />
                    </div>
                    <div className="grid items-center">
                      <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-white text-[16px] leading-6">
                        {}
                      </h2>
                      <p className="whitespace-nowrap font-normal text-[14px] leading-[20px] overflow-hidden text-ellipsis text-gray-600">
                        (0x8b1d...f213)
                      </p>
                    </div>
                  </Link>
                </div>
              </div> */}
              {/* owner-end */}
              {/* burn-begin */}
              <div className="flex items-center gap-x-4">
                <UpdateButton onClick={handleUpdate} />
                <BurnButton handleBurn={handleBurn} />
              </div>

              {/* burn-end */}
            </div>
          </div>
          {/* left-end */}
        </div>
      </div>
    </div>
  );
}
