import Link from "next/link";
import { cn } from "@/utils";

type Props = {
  redirect: string;
  name: string;
  isActive: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavLink({
  redirect,
  name,
  isActive,
  className,
  setOpen,
}: Props) {
  return (
    <li className="">
      <Link
        onClick={() => {
          if (setOpen) {
            setOpen(false);
          }
        }}
        href={redirect}
        className={cn(
          'relative inline-block px-0 py-1 text-[16px] font-normal text-gray-300 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-center before:scale-0 before:bg-slate-100 before:transition-all before:duration-300 before:content-[""] hover:before:scale-100',
          { "before:scale-100": isActive },
          className,
        )}
      >
        {name}
      </Link>
    </li>
  );
}
