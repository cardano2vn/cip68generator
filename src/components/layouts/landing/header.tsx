'use client';

import Link from 'next/link';
import Image from 'next/image';
import images from '@/public/images';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import routers, { publicRoutes } from '@/constants/routers';
import Account from '@/components/common/account';
import NavLink from './nav-link';

const Header = function () {
    return (
        <header className="fixed left-[50%] top-0 z-50 my-0 ml-[-600px] mr-auto box-border flex h-[75px] w-[1200px] translate-y-[30px] items-center justify-between rounded-2xl bg-[#13161b] px-[30px] py-0 shadow-sm transition duration-300 ease-out">
            {/* logo-begin */}
            <Link
                className="relative flex items-center justify-center gap-2"
                href={routers.landing}
            >
                <Image className="h-[35px] w-[35px] object-cover" src={images.logo} alt="Logo" />
                <span className="text-2xl">Generator</span>
            </Link>
            {/* logo-end */}

            <ul className="flex w-full items-center justify-center gap-12">
                {publicRoutes.map(function (publicRoute, index: number) {
                    return (
                        <NavLink
                            key={index}
                            setSelected={null!}
                            className=""
                            isActive={false}
                            redirect={publicRoute.redirect}
                            name={publicRoute.name}
                        />
                    );
                })}
            </ul>

            {/* connect-wallet-begin */}
            {/* <Button>Connect Wallet</Button> */}
            <Account />
            {/* connect-wallet-end */}
        </header>
    );
};

export default Header;
