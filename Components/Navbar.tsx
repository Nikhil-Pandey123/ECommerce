import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
const Navbar = () => {
  return (
    <nav className="flex-between background-color: #f8f9fa; fixed z-50 w-full p-6 shadow-md sm:px-12 dark:shadow-none">
      <Link href={'/public/vercel.svg'} className="flex items-center gap-1">
        <Image
          src="/vercel.svg"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />

        <p className="h2-bold text-white max-sm:hidden">
          Air<span className="text-primary-500">Flex</span>
        </p>
      </Link>

      <div className="border-border bg-background dark:bg-input dark:border-input flex items-center rounded-lg border px-4 py-2 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-muted-foreground mr-2 h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex-between gap-5">
        <Button className="cursor-pointer rounded-full bg-black text-white">
          Sign In
        </Button>
        <Button className="bg-primary-500 cursor-pointer rounded-full text-white">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
