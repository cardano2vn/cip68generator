'use client';

import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import routers from '@/constants/routers';
import { appImage } from '@/public/images';

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
                        src={appImage.logo}
                        alt=""
                    />
                </div>
                <div className={cn('flex-1')}>
                    <h2 className={cn('text-[40px] leading-[50px]')}>
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
            <section className={cn('mt-[100px] flex justify-between')}>
                <div className={cn('flex w-[412px] flex-col')}>
                    <Link className="relative flex items-center gap-2" href={routers.landing}>
                        <Image
                            className="h-[35px] w-[35px] object-cover"
                            src={appImage.logo}
                            alt="Logo"
                        />
                        <span className="text-2xl">Generator</span>
                    </Link>

                    <p
                        className={cn(
                            'mx-0 mb-[12px] mt-[35px] text-[15px] leading-[25px] text-gray-300',
                        )}
                    >
                        CIP68 Generator is an AI-powered decentralized communication infrastructure
                        built to provide encrypted emails, unified notifications, and targeted
                        marketing across multiple chains and dApps for users, developers, and
                        marketers.
                    </p>

                    <p className={cn('text-[14px] leading-[22px] text-gray-500')}>
                        cardano2vn@gmail.com
                    </p>
                </div>

                <div className={cn('flex gap-[45px] leading-[20px]')}>
                    <ul>
                        <h2 className={cn('mb-9 text-[20px] font-bold text-white')}>Products</h2>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <h2 className={cn('mb-9 text-[20px] font-bold text-white')}>Products</h2>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <h2 className={cn('mb-9 text-[20px] font-bold text-white')}>Products</h2>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                    </ul>

                    <ul>
                        <h2 className={cn('mb-9 text-[20px] font-bold text-white')}>Products</h2>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                        <li className={cn('mt-[25px]')}>
                            <Link
                                className={cn(
                                    'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                )}
                                href={''}
                            >
                                CIP68 DApp
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
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
