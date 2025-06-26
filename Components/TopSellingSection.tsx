import React from 'react';
import ProductListing from './ProductListing';
import Link from 'next/link';
import AirflexBackground from './AirflexBackground';
const TopSellingSection = () => {
  return (
    <section className="relative mt-15 min-h-screen w-full overflow-hidden py-16">
      <div className="absolute inset-0 w-full bg-gradient-to-br from-gray-50 via-white to-cyan-50">
        {/* Animated geometric shapes inspired by AIRFLEX logo */}
        <div className="absolute top-10 left-10 h-32 w-32 opacity-10">
          <div className="relative h-full w-full">
            {/* Large "A" shape */}
            <div className="absolute inset-0 rotate-12 transform">
              <div className="mx-auto h-0 w-0 border-r-16 border-b-32 border-l-16 border-r-transparent border-b-gray-400 border-l-transparent"></div>
              <div className="mx-auto mt-2 h-4 w-8 skew-x-12 transform bg-cyan-400"></div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-20 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-cyan-200 to-blue-200 opacity-20"></div>
        <div className="absolute bottom-20 left-20 h-16 w-16 animate-bounce rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 h-12 w-12 rotate-45 transform animate-spin bg-cyan-300 opacity-10"></div>
        <div className="absolute right-1/3 bottom-1/3 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r from-gray-300 to-cyan-200 opacity-15"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
            linear-gradient(90deg, #06b6d4 1px, transparent 1px),
            linear-gradient(#06b6d4 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Logo-inspired wing shapes */}
        <div className="absolute top-32 right-32 opacity-8">
          <div className="relative h-20 w-40">
            <div className="absolute inset-0 skew-y-12 transform rounded-full bg-gradient-to-r from-transparent via-cyan-200 to-transparent"></div>
            <div className="absolute inset-x-4 inset-y-2 -skew-y-6 transform rounded-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>
        </div>

        <div className="absolute bottom-32 left-32 opacity-8">
          <div className="relative h-20 w-40 rotate-180 transform">
            <div className="absolute inset-0 skew-y-12 transform rounded-full bg-gradient-to-r from-transparent via-cyan-200 to-transparent"></div>
            <div className="absolute inset-x-4 inset-y-2 -skew-y-6 transform rounded-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Subtle overlay for better text contrast */}
      <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

      {/* Content container with proper max-width */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Enhanced header with logo-inspired styling */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <h1 className="mb-4 bg-gradient-to-r from-gray-700 via-gray-800 to-cyan-600 bg-clip-text text-4xl font-bold tracking-wider text-transparent md:text-5xl">
              Our Top Selling
            </h1>
            {/* Decorative underline inspired by logo */}
            <div className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <div className="absolute -bottom-4 left-1/2 h-0.5 w-16 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-gray-400 to-cyan-300"></div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Discover our most popular products that customers love
          </p>
        </div>

        {/* Enhanced product grid with better spacing */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="transform transition-all duration-300">
            <ProductListing
              image="/Airflex photo/1.png"
              title="Product 1"
              price={1000}
              description="This is a great product."
              bestSeller={true}
            />
          </div>
          <div className="transform transition-all duration-300">
            <ProductListing
              image="/Airflex photo/2.png"
              title="Product 2"
              price={2000}
              description="This is another great product."
              bestSeller={true}
            />
          </div>
          <div className="transform transition-all duration-300">
            <ProductListing
              image="/Airflex photo/3.png"
              title="Product 3"
              price={3000}
              description="This is yet another great product."
              bestSeller={false}
            />
          </div>
          <div className="transform transition-all duration-300">
            <ProductListing
              image="/Airflex photo/4.png"
              title="Product 4"
              price={4000}
              description="This is a fantastic product."
              bestSeller={false}
            />
          </div>
          <div className="transform transition-all duration-300">
            <ProductListing
              image="/Airflex photo/5.png"
              title="Product 5"
              price={4000}
              description="This is a fantastic product."
              bestSeller={false}
            />
          </div>
          <div className="transform transition-all duration-300">
            <ProductListing
              image="/Airflex photo/6.png"
              title="Product 6"
              price={4000}
              description="This is a fantastic product."
              bestSeller={false}
            />
          </div>
        </div>

        {/* Call to action section */}
        <div className="mt-12 text-center">
          <Link href={'/products'}>
            <button className="transform cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-blue-700">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellingSection;
