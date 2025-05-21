import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { Input } from '@/Components/ui/input';
const Navbar = () => {
  return (
    <nav className="background-color: #f8f9fa; fixed z-50 flex w-full p-6 shadow-md sm:px-12 dark:shadow-none">
      <div className="w-[30%]">
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
      </div>

      <div className="flex-1 rounded-md border-none bg-white text-2xl font-bold">
        <Input type="text" placeholder="Search " />
      </div>

      <div className="ml-10 flex w-[25%] items-center justify-center gap-5">
        <Link href={'login'}>
          <Button className="cursor-pointer bg-black p-4 text-white">
            Sign in
          </Button>
        </Link>

        <Link href={'signout'}>
          <Button className="bg-primary-500 cursor-pointer p-4 text-black">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
