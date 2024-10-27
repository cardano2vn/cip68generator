import { Button } from "@/components/ui/button";

type Props = {
  id: number;
  title: string;
  description?: string;
  description2?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  bonus?: any[];
};

export default function GuideStep({
  id,
  title,
  description,
  description2,
  bonus,
}: Props) {
  return (
    <div className="mx-0 my-8 text-gray-400">
      <header className="flex flex-row items-center">
        <Button className="relative mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-[16px] font-bold tracking-normal text-gray-400 outline-none">
          {id}
        </Button>
        <h4 className="text-[16px]">{title}</h4>
      </header>
      {description && <p className="mt-4 text-[14px]">{description}</p>}
      {description2 && <p className="mt-4 text-[14px]">{description2}</p>}
      {bonus && (
        <div>
          {bonus.map(function (item, index) {
            return (
              <p className="mt-4 text-[14px]" key={index}>
                &#8226; {item?.content}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
