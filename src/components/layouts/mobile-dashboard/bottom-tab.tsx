import { mainMenu } from "@/constants/menu-list";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetMenu } from "./sheet-menu";
import { Icons } from "@/components/common/icons";

export default function BottomTab() {
  const pathname = usePathname();
  return (
    <>
      <div className="z-9999 border-1 fixed bottom-0 left-0 right-0 h-16 w-full rounded-t-3xl border bg-section">
        <div className="mx-auto grid h-full grid-cols-4">
          {mainMenu.slice(0, 3).map(({ title, href, icon }, index) => {
            const Icon = Icons[icon || "arrowRight"];
            const active = pathname === href;
            return (
              <Link
                href={href}
                key={index}
                className={cn(
                  "flex h-16 w-full flex-col items-center justify-center gap-1 border-none text-xs",
                  active ? "text-primary" : "text-muted-foreground",
                )}
                prefetch={false}
              >
                <Icon className="h-5 w-5" />
                {title}
              </Link>
            );
          })}
          <SheetMenu />
        </div>
      </div>
    </>
  );
}
