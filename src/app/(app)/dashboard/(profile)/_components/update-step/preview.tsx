import { Button } from "@/components/ui/button";
import { appImage } from "@/public/images";
import Image from "next/image";
import { MdPolicy } from "react-icons/md";
import Link from "next/link";
import { IoMdPhotos } from "react-icons/io";
import { isEmpty, isNull } from "lodash";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Property from "../property";
import { useUnitContext } from "@/contexts/unit";
export default function PreviewStep() {
  const { updateStepper, metadataToUpdate, basicInfoToUpdate, startUpdating } =
    useUnitContext();
  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed p-4">
        <div className="w-full flex flex-wrap gap-5">
          <div className="flex-1 flex gap-8 flex-col">
            <div className="relative w-full h-[400px] bg-[#1c1f2b] rounded-lg border-[1px] border-solid border-[#282c34]">
              <Image
                className="w-full h-full object-cover rounded-lg"
                src={appImage.collection}
                alt=""
              />
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <Button className="w-8 h-8 rounded-lg text-[15px bg-[#282c34] flex items-center justify-center">
                  <IoMdPhotos className=" text-white" />
                </Button>
                <Button className="w-8 h-8 rounded-lg text-[15px bg-[#282c34] flex items-center justify-center">
                  <IoMdPhotos className=" text-white" />
                </Button>
                <Button className="w-8 h-8 rounded-lg text-[15px bg-[#282c34] flex items-center justify-center">
                  <IoMdPhotos className=" text-white" />
                </Button>
              </div>
            </div>
            {/* metadata-begin */}
            <div className="bg-[#13161b] p-5 border-none rounded-lg flex flex-col gap-8">
              <div className="flex items-center pb-4 justify-between gap-2 border-b-[1px] border-solid border-gray-500">
                <h2 className="text-white text-[18px] font-semibold leading-[24px]">
                  Property
                </h2>
              </div>
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-3 gap-y-5 gap-x-2">
                  {Object.entries(metadataToUpdate).map(
                    ([name, value], index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Property
                              image=""
                              name={name}
                              value={
                                isNull(value) || isEmpty(value)
                                  ? "null"
                                  : JSON.stringify(value)
                                      .replace(/^"|"$/g, "")
                                      .slice(0, 10) +
                                    (JSON.stringify(value).replace(/^"|"$/g, "")
                                      .length > 10
                                      ? "..."
                                      : "")
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            {isNull(value) || isEmpty(value)
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
                      {basicInfoToUpdate.quantity}
                    </span>
                  </div>
                  <h1 className="w-full flex overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
                    {basicInfoToUpdate.assetName}
                  </h1>
                </div>
              </div>
              {/* assetname-end */}
              {/* policy-begin */}
              <div className="flex items-center gap-2 relative rounded-md py-[2px] px-2 bg-[#282c34] w-fit my-[10px] mx-0">
                <MdPolicy className="text-base" />
                <span className="text-base">4da0c...107822cf</span>
              </div>
              {/* policy-end */}
              {/* owner-begin */}
              <div className="my-4 mx-0 flex items-center w-full min-w-0 box-border">
                <div className="grid gap flex-1">
                  <h3 className="uppercase space-x-3 text-gray-400 text-[10px] leading-[16px] font-semibold">
                    Reciver
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
                        Nguyen Duy Khanh
                      </h2>
                      <p className="whitespace-nowrap font-normal text-[14px] leading-[20px] overflow-hidden text-ellipsis text-gray-600">
                        (0x8b1d...f213)
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              {/* owner-end */}
              {/* burn-begin */}
              {/* <Button className="w-full bg-[#282c34] text-white text-[14px] rounded-md leading-5 px-4 flex items-center justify-center gap-2">
                <FaBurn />
                <span>Make Burn</span>
              </Button> */}
              {/* burn-end */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="secondary"
          onClick={updateStepper.prev}
          disabled={updateStepper.isFirst}
        >
          Back
        </Button>
        <Button onClick={startUpdating}>Next</Button>
      </div>
    </div>
  );
}
