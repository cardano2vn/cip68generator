import Link from 'next/link';
import { cn } from '@/utils';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { SidebarToggle } from './sidebar-toggle';
import { Icons } from '@/components/common/icons';
import { MenuList } from './menu-list';
import { Button } from '@/components/ui/button';
import { Images } from '@/components/common/images';

export function Sidebar() {
    const sidebar = useSidebarToggle();

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-20 h-screen -translate-x-full bg-section transition-[width] duration-300 ease-in-out lg:translate-x-0',
                sidebar?.isOpen === false ? 'w-[73px]' : 'w-[300px]',
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} toggle={sidebar?.toggle} />
            <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
                <Button
                    className={cn(
                        'mb-1 transition-transform duration-300 ease-in-out',
                        sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0',
                    )}
                    variant="link"
                    asChild
                >
                    <Link
                        href="/dashboard"
                        className="flex items-center no-underline hover:no-underline"
                    >
                        <Images.logo className="h-4 w-4" />
                        <p
                            className={cn(
                                'ml-2 whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
                                sidebar?.isOpen === false
                                    ? 'hidden -translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100',
                            )}
                        >
                            Generator
                        </p>
                        {/* <Images.logo
                            }
                        /> */}
                    </Link>
                </Button>
                <MenuList />
            </div>
        </aside>
    );
}
