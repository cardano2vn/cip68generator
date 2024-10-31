import { appImage } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { MdPolicy } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";

export default function Asset() {
  return (
    <Link className="flex flex-col gap-2 min-w-[256px] " href={"/"}>
      <section className="w-full min-w-full flex flex-col bg-[#13161b] rounded-lg overflow-hidden relative shadow-lg border-gray-700 border-[1px]">
        <div className="absolute left-[12px] right-[12px] top-[12px] flex justify-between items-start z-10">
          <div></div>
          <div></div>
        </div>
        <div className="bg-[linear-gradient(180deg, rgba(250, 89, 160, 0), rgba(250, 89, 160, .15))] w-full h-[calc(100% -105px)]  flex flex-col items-center justify-center z-10 aspect-square ">
          <div className="w-[160px] h-[160px] min-h-[160px] min-w-[160px] relative overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src={appImage.logo}
              alt=""
            />
          </div>
        </div>
        <div className="min-h-[105px] p-3 z-10 bottom-0 right-0 left-0 bg-[#0d0e12] overflow-hidden ">
          <div className="grid grid-cols-1 gap-2 relative">
            <VscVerified className="text-[25px] absolute top-1 right-4" />
            <section className="flex items-center gap relative rounded-md py-[2px] px-2 bg-[#282c34] w-fit">
              <MdPolicy className="text-xs" />
              <span className="text-xs">4da0c...107822cf</span>
            </section>
            <section className="text-ellipsis text-nowrap whitespace-normal">
              Asset Name
            </section>
            <section className="flex items-end justify-start gap-1 min-h-6 overflow-hidden">
              <section className="flex items-end gap-2">
                <span className="text-gray-300 text-[16px] leading-6">₳</span>
                <span className="text-gray-300 text-[16px] font-medium leading-6">
                  0.22
                </span>
                <span className="text-gray-400 text-[12px] leading-5 justify-end">
                  Fee with script reference
                </span>
              </section>
            </section>
          </div>
        </div>
      </section>
      <section className="ml-[20px] text-gray-400 text-[12px] leading-[16px] font-medium">
        <span>Oct 29, 2024</span>
      </section>
    </Link>
  );
}
