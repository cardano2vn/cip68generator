'use client';

import { cn } from '@/utils';
import Image from 'next/image';
import images from '@/public/images';

type Props = {
    active?: boolean;
    name: string;
    image?: string;
};

const Network = function ({ name, active = true }: Props) {
    return (
        <div
            className={cn(
                'flex h-14 w-14 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl text-[12px] text-gray-300 hover:bg-slate-800',
                active && 'bg-slate-800 text-gray-500',
            )}
        >
            <Image
                className={cn('h-7 w-7 object-cover')}
                src={images.cardano}
                alt="Network Image"
            />
            <span
                className={cn(
                    'relative top-[-6px] mt-0 scale-75 text-center leading-[12px] text-white',
                )}
            >
                {name}
            </span>
        </div>
    );
};

export default Network;
