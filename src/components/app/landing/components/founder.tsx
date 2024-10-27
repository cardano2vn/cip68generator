"use client";
import { cn } from "@/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  FaTwitter as TwitterIcon,
  FaLinkedinIn as LinkedinIcon,
} from "react-icons/fa";

type Props = {
  id?: number;
  avatar: StaticImageData;
  company?: string;
  firstName: string;
  lastName: string;
  role: string;
  twitter: string;
  linkedin: string;
  description: string;
};
const Founder = function ({
  avatar,
  firstName,
  lastName,
  role,
  twitter,
  linkedin,
  description,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 rounded-2xl bg-slate-900 p-7 transition-all duration-300 ease-in-out",
      )}
    >
      <div
        className={cn(
          "bg-[rgba(0, 0, 0, 0.08)] relative h-[150px] w-[150px] overflow-hidden rounded-full transition-all duration-500",
        )}
      >
        <Image
          className={cn(
            "absolute inset-0 h-full w-full object-cover text-transparent transition-all duration-500 ease-in-out hover:scale-150",
          )}
          src={avatar}
          alt="Avatar"
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 flex h-12 justify-center gap-4 transition-all duration-500",
          )}
        >
          {twitter && (
            <Link
              className={cn(
                "relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] text-[16px] text-white",
              )}
              target="_blank"
              href={twitter}
            >
              <LinkedinIcon />
            </Link>
          )}
          {linkedin && (
            <Link
              className={cn(
                "relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] text-[16px] text-white",
              )}
              target="_blank"
              href={linkedin}
            >
              <TwitterIcon />
            </Link>
          )}
        </div>
      </div>
      <div className={cn("flex flex-col gap-[10px]")}>
        <div
          className={cn(
            "text-center text-[16px] font-medium leading-[120%] text-white",
          )}
        >
          {firstName + " " + lastName}
        </div>
        <div
          className={cn(
            "text-center text-[13px] font-medium leading-[120%] text-white",
          )}
        >
          {role}
        </div>
        <div
          className={cn(
            "text-center text-[10px] font-normal leading-[120%] text-white",
          )}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default Founder;
