import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  className?: string;
  description: string;
  image: StaticImageData;
};

export default function Banner({ image, title, description }: Props) {
  return (
    <section className="relative h-[70vh] w-full before:absolute before:bottom-0 before:left-0 before:right-0 before:z-10 before:block before:h-full before:w-full before:bg-gradient-to-b before:from-slate-800 before:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:z-10 after:block after:h-full after:w-full after:bg-gradient-to-t after:from-slate-900 after:content-['']">
      <Image className="absolute h-full w-full" src={image} alt="" />
      <div className="absolute z-20 flex h-full w-full flex-col items-center justify-center gap-2">
        <h2 className="relative mt-[15px] text-[50px] font-bold leading-[50px] text-[#fff]">
          {title}
        </h2>
        <p className="max-w-[600px] text-center text-[17px] font-normal">
          {description}
        </p>
      </div>
    </section>
  );
}
