'use client';

import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import images from '@/assets/images';
import Image from 'next/image';

const Footer = function () {
    return (
        <div>
            {/* subscribe-begin */}
            <section
                className={cn('flex justify-between rounded-xl bg-slate-900 px-[100px] py-[45px]')}
            >
                <div className={cn('mr-[100px] h-[150px] w-[150px]')}>
                    <Image
                        className={cn('h-full w-full animate-pulse object-cover')}
                        src={images.logo}
                        alt=""
                    />
                </div>
                <div className={cn('flex-1')}>
                    <h2 className={cn('text-[24px] leading-[50px]')}>
                        Subscribe To <span className="pl-4 text-[#ccc]">CIP68 Generator</span>
                    </h2>
                    <p className={cn('mb-7 mt-4')}>
                        Unlock instant updates and exclusive insights, engage with your favorite
                        projects and earn rewards just for staying informed!
                    </p>
                    <Button>Subcribe</Button>
                </div>
            </section>
            {/* subscribe-end */}

            {/*  footer-begin */}
            {/*  footer-end */}

            {/* bottom-begin */}
            <footer
                className={cn(
                    'border-[rgb(238, 238, 238)] mt-10 flex items-center justify-between border-t-[1px] border-solid pt-8',
                )}
            >
                <ul className={cn('flex items-center')}>
                    <strong className={cn('mr-10 text-[16px] text-[rgb(153,153,153)]')}>
                        Community
                    </strong>
                </ul>
                <div className={cn('text-[15px] text-[rgb(153,153,153)]')}>
                    © 2024 Design & Develop With By Cardano2vn
                </div>
            </footer>
            {/* bottom-end */}
        </div>
    );
};

export default Footer;
