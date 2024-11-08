import { Button } from "@/components/ui/button";
import { appImage } from "@/public/images";
import Image from "next/image";
import { MdPolicy } from "react-icons/md";
import { FaBurn } from "react-icons/fa";
import Link from "next/link";
import { IoMdPhotos } from "react-icons/io";
import Metadata from "../metadata";
import { useMintOneContext } from "../../_context";
export default function PreviewPage() {
  const { stepper } = useMintOneContext();
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="py-8 px-10 m-auto flex flex-col gap-6">
        <div className="w-full flex flex-wrap gap-5">
          <section className="flex-1 flex gap-8 flex-col">
            <section className="relative w-full h-[400px] bg-[#1c1f2b] rounded-lg border-[1px] border-solid border-[#282c34]">
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
            </section>
            {/* metadata-begin */}
            <section className="bg-[#13161b] p-5 border-none rounded-lg flex flex-col gap-8">
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
              <section className="flex flex-col gap-8">
                <aside className="grid grid-cols-3 gap-y-5 gap-x-2">
                  <Metadata name="name" value="CIP68 Generator" image="" />
                  <Metadata
                    name="image"
                    value="ipfs://qmrzicpreutwckm6aotukjerfcud213dpwpq6byuzmjaua"
                    image=""
                  />
                  <Metadata
                    name="description"
                    value="Open source dynamic assets (Token/NFT) generator (CIP68)"
                    image=""
                  />

                  <Metadata
                    name="owner"
                    value="addr_test1qzjzr7f3yj3k4jky7schc55qjclaw6fhc3zfnrarma9l3579hwurrx9w7uhz99zdc3fmmzwel6hac404zyywjl5jhnls09rtm6"
                    image=""
                  />
                  <Metadata name="version" value="1.0.0" image="" />
                  <Metadata name="version" value="1.0.0" image="" />
                  <Metadata name="version" value="1.0.0" image="" />
                </aside>
              </section>
            </section>
            {/* metadata-end */}
            {/* history-begin */}

            {/* history-end */}
          </section>
          {/* left-begin */}
          <section className="w-[30.41666667%] sticky top-20  max-w-full">
            <aside className=" p-5  bg-[#1c1f2b] rounded-lg border-[1px] border-solid border-[#282c34]">
              <div className="w-full  h-[200px] bg-[#1c1f2b] overflow-hidden rounded-lg border-[1px] border-solid border-[#282c34] mb-6">
                <Image
                  src={appImage.collection}
                  className="w-full h-full rounded-lg object-cover"
                  alt=""
                />
              </div>
              {/* assetname-begin */}
              <div className="flex items-center justify-between mb-3">
                <section className="flex items-center flex-1 overflow-hidden gap-[10px]">
                  <div className=" flex items-center justify-center w-8 h-8 rounded-full border-[1px] border-solid border-gray-400">
                    <span className="text-[16px] leading-6 font-medium">1</span>
                  </div>
                  <h1 className="w-full flex overflow-hidden text-ellipsis max-w-full whitespace-nowrap">
                    Asset Name
                  </h1>
                </section>
              </div>
              {/* assetname-end */}
              {/* policy-begin */}
              <section className="flex items-center gap-2 relative rounded-md py-[2px] px-2 bg-[#282c34] w-fit my-[10px] mx-0">
                <MdPolicy className="text-base" />
                <span className="text-base">4da0c...107822cf</span>
              </section>
              {/* policy-end */}
              {/* owner-begin */}
              <section className="my-4 mx-0 flex items-center w-full min-w-0 box-border">
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
                        Nguyen Duy Khanh
                      </h2>
                      <p className="whitespace-nowrap font-normal text-[14px] leading-[20px] overflow-hidden text-ellipsis text-gray-600">
                        (0x8b1d...f213)
                      </p>
                    </div>
                  </Link>
                </div>
              </section>
              {/* owner-end */}
              {/* burn-begin */}
              <Button className="w-full bg-[#282c34] text-white text-[14px] rounded-md leading-5 px-4 flex items-center justify-center gap-2">
                <FaBurn />
                <span>Make Burn</span>
              </Button>
              {/* burn-end */}
            </aside>
          </section>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={stepper.prev}
          disabled={stepper.isFirst}
        >
          Back
        </Button>
        <Button onClick={() => stepper.next()}>Next</Button>
      </div>
    </div>
  );
}
