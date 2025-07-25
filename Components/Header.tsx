import { Bell } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header className="mx-4 border-b border-[#1f1f1f] bg-[#1e1e1e] shadow-lg sm:mx-6 lg:mx-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <h1 className="text-lg font-semibold text-gray-100 sm:text-xl lg:text-2xl">
          Dashboard
        </h1>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image
            src="/Airflex photo/nepal.png"
            alt="Placeholder Image"
            width={30}
            height={30}
            className="cursor-pointer rounded-full shadow-md"
          />

          <div className="relative">
            <Bell className="h-5 w-5 cursor-pointer text-gray-300 hover:text-white sm:h-6 sm:w-6" />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/Airflex photo/admin.png"
              alt="Airflex Logo"
              width={30}
              height={30}
              className="cursor-pointer rounded-full shadow-md"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
