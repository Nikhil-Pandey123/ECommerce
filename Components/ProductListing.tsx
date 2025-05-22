'use client';
import React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductProps {
  image: string;
  title: string;
  price: number;
  description: string;
  bestSeller?: boolean;
}

const ProductCard = ({
  image,
  title,
  price,
  description,
  bestSeller,
}: ProductProps) => {
  return (
    <div className="group relative flex h-[360px] w-[300px] flex-col items-center justify-start overflow-hidden rounded-[30px] border border-white/10 bg-[#2f2f2f]/60 p-6 text-white shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
      {/* 🔥 Best Seller Badge */}
      {bestSeller && (
        <div className="absolute top-4 left-1 z-20 animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-red-500 px-3 py-1 text-xs font-bold text-black shadow-md">
          🔥 Best Seller
        </div>
      )}

      {/* Product Image */}
      <div className="relative -mt-12 mb-4 h-28 w-28">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="drop-shadow-lg"
        />
      </div>

      {/* Product Info */}
      <h2 className="text-center text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-center text-sm text-gray-300">{description}</p>

      {/* Price + Cart Icon */}
      <div className="mt-auto flex w-full items-center justify-between px-2">
        <span className="text-lg font-bold">Rs. {price}/-</span>
        <div className="rounded-full border border-white/20 p-2">
          <ShoppingCart className="h-5 w-5 cursor-pointer text-white" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
