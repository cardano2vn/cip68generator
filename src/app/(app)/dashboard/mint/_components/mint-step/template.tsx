/* eslint-disable @typescript-eslint/no-unused-vars */
import { Images } from "@/components/common/images";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Plus } from "lucide-react";
import { useMintOneContext } from "@/contexts/mint-one";

export default function TemplateStep() {
  const { stepper } = useMintOneContext();

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="flex-wrap gap-3 space-y-5">
        <div className="mt-2 grid gap-4 grid-cols-4 max-md:grid-cols-2">
          <Card className="h-full" onClick={stepper.next}>
            <AspectRatio
              ratio={5 / 3}
              className="bg-muted flex items-center justify-center opacity-70 border-dashed"
            >
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
            </AspectRatio>
            <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
              <div className="font-semibol self-stretch text-center text-base">
                <h3 className="text-lg font-semibold">Start from Scratch</h3>
              </div>
              {/* <div className="font- self-stretch text-center text-sm text-secondary">
                Comming Soon
              </div> */}
            </div>
          </Card>

          {/* {Array.from({ length: 7 }, (_, index) => index).map((index) => (
            <Card key={index} className="h-full">
              <AspectRatio
                ratio={5 / 3}
                className="bg-muted flex items-center justify-center opacity-70 border-dashed"
              >
                <svg viewBox="0 0 24 24" width="80" height="80">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 1.573a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm.83 5.128 4 1.825c.11.05.214.11.31.177L12 11.47 6.86 8.703c.096-.068.2-.127.31-.177l4-1.825a2 2 0 0 1 1.66 0ZM6.037 9.964a2 2 0 0 0-.037.382V15.3a2 2 0 0 0 1.17 1.82l4 1.824.08.035V12.77L6.037 9.964Zm6.713 9.015.08-.035 4-1.824A2 2 0 0 0 18 15.3v-4.954c0-.13-.013-.258-.037-.382L12.75 12.77v6.208Zm0 2.344a.75.75 0 1 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1ZM20.601 3.72a.75.75 0 0 1 0 1.061l-.707.707a.75.75 0 0 1-1.06-1.06l.707-.708a.75.75 0 0 1 1.06 0ZM5.166 20.217a.75.75 0 0 0-1.06-1.06l-.707.706a.75.75 0 0 0 1.06 1.061l.707-.707Zm17.584-7.894a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75ZM3 13.073a.75.75 0 0 0 0-1.5H2a.75.75 0 1 0 0 1.5h1Zm17.601 7.851a.75.75 0 0 1-1.06 0l-.707-.707a.75.75 0 1 1 1.06-1.06l.707.706a.75.75 0 0 1 0 1.061ZM4.106 5.49a.75.75 0 0 0 1.06-1.06L4.46 3.72A.75.75 0 0 0 3.4 4.782l.707.707Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">
                  Builders Program
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                  <Button size="sm">Use</Button>
                </div>
              </div>
            </Card>
          ))} */}
        </div>
      </div>
    </div>
  );
}
