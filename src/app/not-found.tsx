import { appImage } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import router from "@/constants/routers";

export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0d0e12] text-white gap-2">
      <div>
        <Image
          className="animate-pulse"
          width={260}
          src={appImage.logo}
          alt="not-found"
        />
      </div>
      <div className="text-2xl font-bold">404 - Page not found</div>
      <div className="text-base text-[#8e97a8]">
        The page you are looking for does not exist
      </div>
      <Link
        href={router.landing}
        className="mt-3 h-10 rounded-md flex items-center justify-center px-6 text-sm font-medium text-white bg-gradient-to-r from-[#ffb444] to-[#eb6f3a]"
      >
        Back to Home
      </Link>
    </div>
  );
}
