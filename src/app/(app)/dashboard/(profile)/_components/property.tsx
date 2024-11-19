import { appImage } from "@/public/images";
import Image from "next/image";

type Props = {
  image: string;
  name: string;
  value: string;
};

export default function Property({ image, name, value }: Props) {
  return (
    <div className="flex items-center gap-2 p-2 bg-[#030711] rounded-lg">
      <section className="min-h-10 min-w-10 h-10 w-10 bg-[#28243C] rounded-lg  flex items-center justify-center">
        <Image
          className="p-2 w-full h-full object-cover"
          src={appImage.logo}
          alt={image}
        />
      </section>
      <section>
        <h3 className="text-[#8a97a8] text-[10px] leading-4 font-semibold uppercase">
          {name}
        </h3>
        <p className="text-white text-[14px] leading-5 font-medium whitespace-nowrap text-ellipsis max-w-44 overflow-hidden">
          {value}
        </p>
      </section>
    </div>
  );
}
