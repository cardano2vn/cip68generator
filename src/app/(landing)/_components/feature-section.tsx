"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { appImage } from "@/public/images";

const Feature = function () {
  return (
    <div className="w-full max-w-[calc(100%/var(--columns)-var(--gap)*(var(--columns)-1)/var(--columns))] p-4 shadow-2xl">
      <div className="perspective-1000 group relative h-full min-h-[190px] w-full">
        {/* Front Side of the Flip Card */}
        <div className="flip-card-front group-hover:rotate-y-180 absolute inset-0 flex items-center justify-center rounded-lg bg-slate-900 p-6 transition-transform duration-700 ease-in-out">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-4 max-md:mb-1 inline-block h-14 w-14 flex-shrink-0 text-gray-600 md:mb-0">
              <Image
                className="object-contain"
                src={appImage.logo}
                alt={"Service Image"}
                width={52}
                height={52}
              />
            </div>
            <div className="text-center md:ml-6 md:text-left">
              <h3 className="truncate text-xl font-normal text-white max-md:text-base">
                Transform
              </h3>
              <p className="line-clamp-4 text-sm font-normal text-white max-md:text-xs">
                To enable transformations you have to add the transform utility.
              </p>
            </div>
          </div>
        </div>

        {/* Back Side of the Flip Card */}
        <div className="flip-card-back group-hover:rotate-y-0 rotate-y-180 absolute inset-0 rounded-lg bg-slate-900 p-6 max-md:p-4 transition-transform duration-700 ease-in-out">
          <div className="flex h-full flex-col gap-3">
            <div className="text-sm font-normal text-white max-md:text-xs">
              <p>
                A lot of transformations can be executed on the GPU instead of
                the CPU. This enables better performance. You can use the
                transform-gpu utility to enable GPU Acceleration.
              </p>
            </div>
            <Button className="max-md:text-xs h-8">Explore</Button>
          </div>
        </div>
      </div>

      <style>{`
                .group {
                    perspective: 1000px;
                }
                .flip-card-front,
                .flip-card-back {
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                }
                .flip-card-front {
                    transform: rotateY(0deg);
                }
                .flip-card-back {
                    transform: rotateY(180deg);
                }
                .group:hover .flip-card-front {
                    transform: rotateY(-180deg);
                }
                .group:hover .flip-card-back {
                    transform: rotateY(0deg);
                }
            `}</style>
    </div>
  );
};

export default Feature;
