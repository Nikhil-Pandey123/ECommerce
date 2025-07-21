import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
const HomeBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="animate-fade-in text-5xl font-extrabold tracking-wider text-white md:text-6xl">
        Elevate Your Game with Airflex
      </h1>
      <p className="animate-fade-in mt-4 max-w-2xl text-lg text-white delay-200 md:text-xl">
        Experience innovative sports retail with avatar creation and virtual
        try-on features.
      </p>
      <Link href={'/products'}>
        <Button className="mt-8 cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-green-400 px-8 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
          Explore Now
        </Button>
      </Link>
    </div>
  );
};

export default HomeBanner;
