/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
// import Logo from './Logo';
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
// import NavMobile from './NavMobile';
// import ThemeToggler from './ThemeToggler';

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathname = usePathname();
  // console.log('path name ==>', pathname);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        header ? " bg-white shadow-lg" : "dark:bg-transparent"
      } sticky top-0 z-30 transition-all
        ${pathname === "/" && "bg-[#fef9f5]"}
        `}
    >
      <div className="py-6 mx-[10%]">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="flex items-center gap-2">
          <div>
          <Image width={20} height={20} src={"/icon/Logo.png"} alt="logo" />
          </div>
            <div className="font-bold text-md text-slate-700 ">SIMS PPOB (S.TANZIL)</div>
          </Link>
          <div className="flex items-center">
            <Nav
              containerStyles={"xl:flex gap-x-8 items-center"}
              linkStyles={`relative hover:text-red-500 transition-all`}
              underlineStyles={
                "absolute left-0 top-full h-[2px] mt-1 bg-red-500 w-full"
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
