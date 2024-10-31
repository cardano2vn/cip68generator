import { Button } from "@/components/ui/button";
import { appImage } from "@/public/images";
import Image from "next/image";
import { MdPolicy } from "react-icons/md";
import { FaBurn } from "react-icons/fa";
import Link from "next/link";
import { IoMdPhotos } from "react-icons/io";
export default function DetailPage() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="py-8 px-10 m-auto flex flex-col gap-6">
        <div className="w-full flex flex-wrap gap-5">
          <section className="flex-1">
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
          </section>
          {/* left-begin */}
          <section className="w-[30.41666667%]  max-w-full">
            <aside className="top-4 p-5 sticky bg-[#1c1f2b] rounded-lg border-[1px] border-solid border-[#282c34]">
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
                    href=""
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
          {/* left-end */}
        </div>
      </div>
    </main>
  );
}
