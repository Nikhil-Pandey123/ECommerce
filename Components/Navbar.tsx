import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <div>
        <Link href="/">
          <Image src="/file.svg" alt="Logo" width={50} height={50} />
        </Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search"
          className="h-10 w-full rounded-md bg-gray-200 px-4 py-2 text-lg font-bold text-gray-700"
        />
      </div>

      <div className="ml-4 flex space-x-4 text-lg font-bold text-gray-700">
        <Link href="/about">Home</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/contact">Services</Link>
        <Link href="/contact">About Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
