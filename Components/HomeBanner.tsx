import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

const HomeBanner = () => {
  return (
    <div className="relative flex w-[100%] flex-col items-center justify-between gap-8 rounded-xl text-white shadow-lg md:flex-row">
      {/* Left side ko  Content */}
      <div className="flex w-full flex-col items-center gap-6 md:w-1/2">
        {/* Heading and CTA */}
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-extrabold tracking-wide">SPORTS</h1>
          <Button className="bg-white text-black transition hover:bg-gray-200">
            Buy Now
          </Button>
          <p className="mx-auto max-w-xs text-sm text-gray-300">
            Enhance your style with our premium, performance-driven designs for
            every athlete.
          </p>
        </div>

        {/* Product Card */}
        <div className="relative mt-4 flex h-[360px] w-[340px] flex-col items-center justify-between overflow-hidden rounded-xl text-black shadow-xl transition hover:scale-[1.02]">
          {/* Top-right icon
          <div className="absolute top-[-5px] right-[-5px] bg-transparent p-2 shadow-md">
            <Image
              src="/Airflex photo/trophy-icon.avif"
              alt="Trophy Icon"
              width={50}
              height={50}
              className="rounded-xl bg-black shadow-md"
            />
          </div> */}

          {/* Header Text */}
          <div className="mt-4 w-full px-4 text-left">
            <h3 className="text-xl font-semibold">Pro Gear Pack</h3>
            <span className="text-sm text-gray-500">1 year / 1 User</span>
          </div>

          {/* Inner Content */}
          <div className="relative z-10 w-[90%] rounded-3xl bg-transparent p-5 shadow-inner">
            <h2 className="mb-1 text-xl font-bold">Athlete Max</h2>
            <p className="mb-1 text-sm text-gray-600">
              Get elite-level gear recommendations
            </p>
            <p className="mb-4 text-sm text-gray-600">
              Stay ahead with trending sports deals
            </p>
            <p className="mb-10 text-lg font-semibold">Rs. 1999.00</p>

            {/* Buy Button */}
            <button className="absolute right-4 bottom-4 rounded-xl bg-black px-5 py-2 text-white transition hover:bg-gray-800">
              Buy →
            </button>
          </div>
        </div>
      </div>

      {/* Right side ko  Content */}
      <div className="relative flex flex-col items-center justify-center gap-6">
        <div className="space-y-1 rounded-2xl bg-white px-6 py-4 text-center text-black shadow-md">
          <h2 className="text-3xl font-extrabold text-red-500">55% OFF</h2>
          <p className="text-sm font-medium">On All Products</p>
          <p className="text-xs text-gray-700">Limited Time Offer</p>
          <p className="text-xs font-bold text-red-600 uppercase">Hurry Up</p>
          <span className="mt-2 block text-lg font-semibold">Rs. 1999.00</span>
        </div>

        {/* Banner Image */}
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/Airflex photo/man.png"
            alt="Sports Banner"
            width={800}
            height={800}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
