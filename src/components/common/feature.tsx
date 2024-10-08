'use client';

import React from 'react';
import { cn } from '@/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import images from '@/assets/images';

const Feature = function () {
    return (
        <div
            className={cn(
                'box-border flex w-full flex-col items-center rounded-xl px-[40px] py-[50px] text-center',
            )}
        >
            <Image
                className={cn('flex h-[70px] w-[70px] items-center justify-center object-cover')}
                src={images.logo}
                alt="Feature"
            />
            <div className={cn('mt-[30px] text-[20px] font-bold')}>Mint Token</div>
            <div className={cn('mt-[20px] text-[15px] leading-[22px] text-[rgb(153,153,153)]')}>
                Precise and tailored push messages can be differentiated based on groups or labels.
            </div>
            <Button className={cn('mt-[10px] px-5 text-[14px]')}>Explorer</Button>
        </div>
    );
};

export default Feature;
