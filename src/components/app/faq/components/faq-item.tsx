'use client';

import { cn } from '@/utils';
import { useState } from 'react';

type Props = {
    title?: string;
    Children: () => JSX.Element;
};

export default function FaqItem({ title, Children }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = function () {
        setIsOpen(!isOpen);
    };
    return (
        <div
            className={cn('mb-5 w-full rounded-2xl bg-slate-900 shadow-xl', isOpen && 'shadow-2xl')}
        >
            <header
                className={cn(
                    'relative box-border flex w-full flex-col rounded-2xl px-5 py-3 filter',
                )}
            >
                <section className={cn('icon', { isOpen: isOpen })} />
                <section
                    className={cn(
                        'relative flex w-full cursor-pointer flex-wrap items-center justify-between text-left transition-all duration-300 ease-in-out before:absolute before:right-[-36px] before:top-0 before:z-10 before:h-full before:w-[60px] before:bg-transparent before:content-[""]',
                    )}
                    onClick={handleOpen}
                >
                    <h3
                        className={cn(
                            'm-0 p-0 text-[18px] font-semibold leading-[40px] text-gray-300',
                        )}
                    >
                        {title}
                    </h3>
                </section>
                {isOpen && (
                    <section
                        className={cn('flex flex-wrap items-center justify-between text-left')}
                    >
                        <Children />
                    </section>
                )}
            </header>
        </div>
    );
}
