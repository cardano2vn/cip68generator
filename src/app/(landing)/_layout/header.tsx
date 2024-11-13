"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import routers, { publicRoutes } from "@/constants/routers";
import NavLink from "./nav-link";
import { motion } from "framer-motion";
import { appImage } from "@/public/images";
import { useEffect, useState } from "react";
import Hamburger from "./hamburger";

const Header = function () {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 30 }}
      animate={{ y: isVisible ? 30 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed left-[50%] top-0 z-50 my-0 ml-[-600px] mr-auto box-border flex h-[75px] w-[1200px] translate-y-[30px] items-center justify-between rounded-2xl bg-[#13161b] px-[30px] py-0 shadow-sm transition duration-300 ease-out max-md:h-[52px] max-md:w-full max-md:px-[15px] max-md:m-0 max-md:py-0 max-md:left-3 max-md:top-0 max-md:right-[10px] "
    >
      {/* logo-begin */}

      <Link
        className="relative flex items-center justify-center gap-2"
        href={routers.landing}
      >
        <Image
          className="h-[35px] w-[35px] object-cover"
          src={appImage.logo}
          alt="Logo"
        />
        <span className="text-2xl">Generator</span>
      </Link>

      {/* logo-end */}

      <ul className="flex w-full items-center justify-center gap-12 max-md:hidden">
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
      <Link className="max-md:hidden" href={"/login"}>
        <Button>Start Create</Button>
      </Link>
      {/* connect-wallet-end */}

      <Hamburger />
    </motion.header>
  );
};

export default Header;
