import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Images } from "@/components/common/images";
import Link from "next/link";
import { dashboardRoutes } from "@/constants/routers";
export default function UtilitiesPage() {
  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-[#13161b] shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Utilities</h1>
        <div className="mt-2 grid  gap-4 grid-cols-3 max-md:grid-cols-1">
          <Link
            href={dashboardRoutes.utilities.children.collection.redirect}
            className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800"
          >
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.metadata className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">
                  Collection Metadata
                </div>
                <div className="font- self-stretch text-center text-sm text-secondary">
                  Have images but need JSON? We got you covered!
                </div>
              </div>
            </Card>
          </Link>

          <Link
            href={dashboardRoutes.utilities.children.storage.redirect}
            className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800"
          >
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.storegae className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">
                  Stogare
                </div>
                <div className="font- self-stretch text-center text-sm text-secondary">
                  Upload and manage your media
                </div>
              </div>
            </Card>
          </Link>
          <Card className="rounded-lg">
            <AspectRatio ratio={5 / 3} className="bg-muted">
              <Images.collection className="h-full w-full rounded-t-lg object-cover" />
            </AspectRatio>
            <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
              <div className="font-semibol self-stretch text-center text-base">
                Fast collection
              </div>
              <div className="font- self-stretch text-center text-sm text-secondary">
                Create collection using csv file
              </div>
            </div>
          </Card>
          <Card className="rounded-lg">
            <AspectRatio ratio={5 / 3} className="bg-muted">
              <Images.collection className="h-full w-full rounded-t-lg object-cover" />
            </AspectRatio>
            <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
              <div className="font-semibol self-stretch text-center text-base">
                Marketplace
              </div>
              <div className="font- self-stretch text-center text-sm text-secondary">
                Create collection to marketplace
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
