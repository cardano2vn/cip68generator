'use client';

import Link from 'next/link';
import Image from 'next/image';
import configs from '@/configs';
import images from '@/assets/images';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';


const Header = function () {
    return (
        <header
            className={cn(
                'fixed left-[50%] top-0 my-0 ml-[-600px] mr-auto box-border flex h-[75px] w-[1200px] translate-y-[30px] items-center justify-between rounded-2xl bg-[#13161b] px-[30px] py-0 shadow-sm transition duration-300 ease-out',
            )}
        >
            {/* logo-begin */}
            <Link
                className="relative flex items-center justify-center gap-2"
                href={configs.router.landing}
            >
                <Image className="h-[35px] w-[35px] object-cover" src={images.logo} alt="Logo" />
                <span className="text-2xl">Generator</span>
            </Link>
            {/* logo-end */}
            {/* connect-wallet-begin */}
            <Button>Connect Wallet</Button>
            {/* connect-wallet-end */}
        </header>
    );
};

export default Header;
