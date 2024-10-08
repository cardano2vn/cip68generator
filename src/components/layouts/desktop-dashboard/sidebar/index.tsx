'use client';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { cn } from '@/utils';
import Link from 'next/link';
import { SidebarToggle } from './sidebar-toggle';
import { Button } from '@/components/ui/button';
import { MenuList } from './menu-list';
import { Icons } from '@/components/common/icons';
import { Images } from '@/components/common/images';

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const sidebar = useSidebarToggle();

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                `relative hidden h-screen flex-none border-r bg-section transition-[width] duration-500 md:block`,
                sidebar.isOpen ? 'w-[300px]' : 'w-[92px]',
                className,
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
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Icons.logo className="h-6 w-6" />
                        <Images.logo
                            className={cn(
                                'whitespace-nowrap p-10 text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
                                sidebar?.isOpen === false
                                    ? 'hidden -translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100',
                            )}
                        />
                    </Link>
                </Button>
                <MenuList />
            </div>
        </aside>
    );
}
