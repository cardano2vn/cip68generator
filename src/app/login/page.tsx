'use client';

import { cn } from '@/utils';
import configs from '@/configs';
import Link from 'next/link';
import Image from 'next/image';
import images from '@/assets/images';
import { networks, wallets } from '@/constants';
import Network from '@/components/common/network';
import Wallet from '@/components/common/wallet';

const Login = function () {
    return (
        <main className={cn('flex h-full text-[14px]')}>
            <div className={cn('m-3 flex flex-1 flex-col overflow-hidden rounded-xl bg-[#0d0e12]')}>
                <div
                    className={cn(
                        'box-border flex h-screen flex-col items-center justify-between px-[14vw] pb-[4vh] pt-[10vh]',
                    )}
                >
                    {/* header-begin */}
                    <header className={cn('flex w-full items-center justify-between')}>
                        <Link
                            className={cn('relative flex items-center justify-center gap-2')}
                            href={configs.router.landing}
                        >
                            <Image
                                className={cn('h-[35px] w-[35px] object-cover')}
                                src={images.logo}
                                alt="Logo"
                            />
                            <span className="text-2xl">Generator</span>
                        </Link>
                        <div className={cn('flex items-center gap-8')}>
                            <Link className={cn('h-8 w-8 rounded-full')} href={''}>
                                <Image
                                    className={cn('h-full w-full object-cover')}
                                    src={images.logo}
                                    alt="Social Network"
                                />
                            </Link>
                            <Link className={cn('h-8 w-8 rounded-full')} href={''}>
                                <Image
                                    className={cn('h-full w-full object-cover')}
                                    src={images.logo}
                                    alt="Social Network"
                                />
                            </Link>
                            <Link className={cn('h-8 w-8 rounded-full')} href={''}>
                                <Image
                                    className={cn('h-full w-full object-cover')}
                                    src={images.logo}
                                    alt="Social Network"
                                />
                            </Link>
                            <Link className={cn('h-8 w-8 rounded-full')} href={''}>
                                <Image
                                    className={cn('h-full w-full object-cover')}
                                    src={images.logo}
                                    alt="Social Network"
                                />
                            </Link>
                        </div>
                    </header>
                    {/* header-end */}

                    {/* wallet-begin */}
                    <aside className={cn('mb-[20px] mt-[60px]')}>
                        {/* web3-begin */}
                        <section
                            className={cn(
                                'box-border w-[540px] rounded-2xl bg-slate-900 px-[45px] py-[35px] shadow-xl',
                            )}
                        >
                            <header className={cn('flex items-center justify-between')}>
                                <h2 className={cn('text-[20px] text-white')}>Connect Wallet</h2>
                                <h2 className={cn('text-[16px] text-white')}>Mainnet</h2>
                            </header>

                            <aside className={cn('mt-5 flex')}>
                                <section
                                    className={cn(
                                        'item-center mr-[30px] flex h-[230px] flex-col gap-3 overflow-y-auto overflow-x-hidden border-r-[1px] border-solid border-[rgb(238,238,238)] pr-[30px]',
                                    )}
                                >
                                    {networks.map(function (network, index: number) {
                                        return (
                                            <Network
                                                key={index}
                                                image=""
                                                name={network.name}
                                                active={network.name === 'Mainnet'}
                                            />
                                        );
                                    })}
                                </section>
                                <section
                                    className={cn(
                                        'pointer-events-none relative h-[230px] flex-1 opacity-100 transition-all duration-100 ease-in-out before:absolute before:left-0 before:right-0 before:h-[50px] before:opacity-100 before:content-[""] after:bottom-0 after:bg-[rgba(255,255,255,0.6)]',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'mr-[-20px] flex h-full w-full flex-col gap-4 overflow-y-auto overflow-x-hidden pr-[20px]',
                                        )}
                                    >
                                        {wallets.map(function (wallet, index: number) {
                                            return (
                                                <Wallet
                                                    key={index}
                                                    image={wallet.image}
                                                    name={wallet.name}
                                                />
                                            );
                                        })}
                                    </div>
                                </section>
                            </aside>
                        </section>
                        {/* web3-end */}

                        {/* web2-begin */}
                        <section className={cn('mt-10')}>
                            <div
                                className={cn(
                                    'flex items-center justify-between gap-3 text-white before:h-[1px] before:flex-1 before:overflow-hidden before:bg-white before:content-[""] after:h-[1px] after:flex-1 after:overflow-hidden after:bg-white',
                                )}
                            >
                                <p className={cn('flex items-center px-[10px] py-0 text-[16px]')}>
                                    Web2 Login Powered by
                                </p>
                                <Link
                                    className={cn('text-[14px] font-semibold text-white')}
                                    target="_blank"
                                    href={'/'}
                                >
                                    Paricle Network
                                </Link>
                            </div>
                            <div className={cn('mt-[25px] flex items-center justify-center gap-7')}>
                                <Link className={cn('h-8 w-8 rounded-full')} href={''}>
                                    <Image
                                        className={cn('h-full w-full')}
                                        src={images.eternl}
                                        alt=""
                                    />
                                </Link>
                                <Link className={cn('h-8 w-8 rounded-full')} href={''}>
                                    <Image
                                        className={cn('h-full w-full')}
                                        src={images.eternl}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </section>
                        {/* web2-end */}
                    </aside>
                    {/* wallet-end */}

                    {/* footer-begin */}
                    <footer className={cn('pb-[20px] text-center')}>
                        <div className={cn('')}>
                            <Link
                                className={cn(
                                    'border-b-[1px] border-solid border-white text-[14px] leading-[16px] text-white',
                                )}
                                href={configs.router.landing}
                            >
                                Help Center
                            </Link>
                        </div>
                        <p className={cn('mt-4 text-[rgb(153,153,153)]')}>
                            © 2024 Design & Develop With By Cardano2vn
                        </p>
                    </footer>
                    {/* footer-end */}
                </div>
            </div>
        </main>
    );
};

export default Login;
