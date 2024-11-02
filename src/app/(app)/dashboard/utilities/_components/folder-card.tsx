import { FolderIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Collection } from "@prisma/client";
import Link from "next/link";
import { dashboardRoutes } from "@/constants/routers";

export default function FolderCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={
        dashboardRoutes.utilities.children.collection.redirect +
        `/${collection.id}`
      }
    >
      <Card className="rounded-lg p-2">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <FolderIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-medium text-white">
              {collection.name}
            </span>
          </div>
          <Checkbox className="h-4 w-4 rounded-full" />
        </div>
      </Card>
    </Link>
  );
}
