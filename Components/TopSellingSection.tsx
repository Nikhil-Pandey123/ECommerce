import React from 'react';
import ProductListing from './ProductListing';
import Link from 'next/link';
import { dummyProducts } from '@/lib/data/products';

const TopSellingSection = () => {
  return (
    <section className="relative w-full bg-gray-50 py-16">
      {/* Background with some decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 h-20 w-20 rounded-full bg-cyan-200 opacity-20"></div>
        <div className="absolute bottom-20 left-10 h-16 w-16 rounded-full bg-blue-200 opacity-20"></div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Our Top Selling Products
          </h1>
          <p className="mx-auto max-w-xl text-gray-600">
            Check out our best-selling items that customers love the most
          </p>
        </div>

        {/* Products grid - fixed the layout issue */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dummyProducts.slice(0, 6).map(product => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="transition-transform duration-200 hover:scale-105">
                <ProductListing
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  description={product.description}
                  price={product.price}
                  bestSeller={product.bestSeller}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block rounded-lg bg-cyan-600 px-8 py-3 text-white transition-colors duration-200 hover:bg-cyan-700"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellingSection;
