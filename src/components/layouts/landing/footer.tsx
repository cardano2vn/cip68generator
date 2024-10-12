'use client';

import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import routers from '@/constants/routers';
import { FaMailBulk, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { appImage } from '@/public/images';

const Footer = function () {
    return (
        <div className={cn('px-auto pb-[50px] pt-[100px]')}>
            <div className={cn('mx-auto my-0 w-full max-w-[1200px]')}>
                {/* subscribe-begin */}
                <section
                    className={cn(
                        'flex justify-between rounded-xl bg-slate-900 px-[100px] py-[45px] max-sm:flex-col max-sm:px-3 max-sm:py-7',
                    )}
                >
                    <div className={cn('mr-[100px] h-[150px] w-[150px]')}>
                        <Image
                            className={cn('h-full w-full animate-pulse object-cover')}
                            src={appImage.logo}
                            alt=""
                        />
                    </div>
                    <div className={cn('flex-1')}>
                        <h2 className={cn('text-[40px] leading-[50px] max-sm:text-[22px]')}>
                            Subscribe To <span className="pl-4 text-[#ccc]">CIP68 Generator</span>
                        </h2>
                        <p className={cn('mb-7 mt-4 text-gray-400 max-sm:text-[12px]')}>
                            Unlock instant updates and exclusive insights, engage with your favorite
                            projects and earn rewards just for staying informed!
                        </p>
                        <Button className="flex h-[35px] items-center gap-2 rounded-md max-sm:text-[14px]">
                            <span>Subcribe</span>
                            <svg
                                width="12"
                                height="9"
                                viewBox="0 0 13 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.92652 0.198869L11.9459 4.51989C12.1925 4.78505 12.1925 5.21495 11.9459 5.48011L7.92652 9.80113C7.67987 10.0663 7.27998 10.0663 7.03334 9.80113C6.78669 9.53597 6.78669 9.10606 7.03334 8.8409L9.9745 5.67898H0.631579C0.282768 5.67898 0 5.37499 0 5C0 4.62501 0.282768 4.32102 0.631579 4.32102H9.9745L7.03334 1.1591C6.78669 0.893936 6.78669 0.464029 7.03334 0.198869C7.27998 -0.0662898 7.67987 -0.0662898 7.92652 0.198869Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </Button>
                    </div>
                </section>
                {/* subscribe-end */}

                {/*  footer-begin */}
                <section className={cn('mt-[100px] flex justify-between max-sm:flex-col')}>
                    <div className={cn('flex w-[412px] flex-col')}>
                        <Link
                            className="relative flex items-center gap-[8px]"
                            href={routers.landing}
                        >
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
                            CIP68 Generator is an AI-powered decentralized communication
                            infrastructure built to provide encrypted emails, unified notifications,
                            and targeted marketing across multiple chains and dApps for users,
                            developers, and marketers.
                        </p>

                        <p className={cn('text-[15px] leading-[22px] text-gray-500')}>
                            cardano2vn@gmail.com
                        </p>
                    </div>

                    <div className={cn('flex gap-[45px] leading-[20px]')}>
                        <ul>
                            <h2 className={cn('mb-9 text-[19px] font-bold text-white')}>
                                Products
                            </h2>
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
                                    Subcription Hub
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Prescale
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    3D NFT
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <h2 className={cn('mb-9 text-[19px] font-bold text-white')}>
                                Resources
                            </h2>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Gitbook
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Generator Docs
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Ambassador
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <h2 className={cn('mb-9 text-[19px] font-bold text-white')}>
                                Developers
                            </h2>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Bug Bounty
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Ecosystem
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Terms Of Service
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>

                        <ul>
                            <h2 className={cn('mb-9 text-[19px] font-bold text-white')}>
                                Learn More
                            </h2>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    Roadmap
                                </Link>
                            </li>
                            <li className={cn('mt-[25px]')}>
                                <Link
                                    className={cn(
                                        'cursor-pointer text-[15px] leading-[20px] text-gray-400',
                                    )}
                                    href={''}
                                >
                                    FAQs
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

                        <div className={cn('flex items-center gap-8')}>
                            <Link
                                className={cn(
                                    'flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px]',
                                )}
                                href={''}
                            >
                                <FaTelegramPlane className={cn('text-[19px]')} />
                            </Link>
                            <Link
                                className={cn(
                                    'flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px]',
                                )}
                                href={''}
                            >
                                <FaMailBulk className={cn('text-[19px]')} />
                            </Link>
                            <Link
                                className={cn(
                                    'flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px]',
                                )}
                                href={''}
                            >
                                <FaXTwitter className={cn('text-[19px]')} />
                            </Link>
                            <Link
                                className={cn(
                                    'flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px]',
                                )}
                                href={''}
                            >
                                <FaYoutube className={cn('text-[19px]')} />
                            </Link>
                        </div>
                    </ul>
                    <div className={cn('text-[15px] text-[rgb(153,153,153)]')}>
                        © 2024 Design & Develop With By Cardano2vn
                    </div>
                </footer>
                {/* bottom-end */}
            </div>
        </div>
    );
};

export default Footer;
