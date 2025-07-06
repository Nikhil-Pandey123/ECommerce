'use client';
import { dummyProducts } from '@/lib/data/products';
import Image from 'next/image';
import { Button } from '@/Components/ui/button';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore'; // Import wishlist store
import Link from 'next/link';
import AirflexBackground from '@/Components/AirflexBackground';
import { useState, useEffect } from 'react'; // Add useEffect
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Award,
  MoreHorizontal,
} from 'lucide-react';

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const { addToCart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore(); // Get wishlist functions
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = dummyProducts.find(p => p.id === params.id);

  // Check if product is in wishlist
  const isWishlisted = product
    ? wishlist.some(item => item.id === product.id)
    : false;

  if (!product) {
    return (
      <AirflexBackground>
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-2xl border border-slate-700/20 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Product Not Found
            </h2>
            <p className="mb-6 text-gray-600">
              The product you're looking for doesn't exist.
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-cyan-700">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </AirflexBackground>
    );
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Blue', 'Gray'];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <AirflexBackground>
      <div className="min-h-screen pt-20">
        {/* Breadcrumb wala */}
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex text-sm">
            <Link
              href="/"
              className="text-gray-500 transition-colors hover:text-cyan-600"
            >
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href="/products"
              className="text-gray-500 transition-colors hover:text-cyan-600"
            >
              Products
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="font-medium text-gray-900">{product.title}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              {/* Main Product Image is here */}
              <div className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-700/20 bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
                <div className="relative h-full w-full">
                  <Image
                    src={productImages[activeImageIndex]}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Image Navigation Arrows */}
                <button
                  onClick={() =>
                    setActiveImageIndex(prev =>
                      prev > 0 ? prev - 1 : productImages.length - 1
                    )
                  }
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex(prev =>
                      prev < productImages.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                >
                  →
                </button>

                {/* Best Seller Badge */}
                {product.bestSeller && (
                  <div className="absolute top-6 left-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    <Award className="mr-1 inline h-4 w-4" />
                    Best Seller
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      activeImageIndex === index
                        ? 'border-cyan-500 shadow-lg shadow-cyan-500/30'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="h-full w-full bg-white object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl leading-tight font-bold text-gray-900">
                      {product.title}
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleWishlistToggle}
                      className={`rounded-full p-3 transition-all ${
                        isWishlisted
                          ? 'bg-red-100 text-red-500 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`}
                      />
                    </button>
                    <button className="rounded-full bg-gray-100 p-3 text-gray-500 transition-all hover:bg-gray-200">
                      <Share2 className="h-5 w-5" />
                    </button>

                    <Link
                      href={'/customization'}
                      className="rounded-full bg-gray-100 p-3 text-gray-500 transition-all hover:bg-gray-200"
                    >
                      <Image
                        src="/Airflex photo/virtual-reality.png"
                        alt="rotate"
                        width={30}
                        height={30}
                      />
                    </Link>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (4.8) · 142 reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
                    Rs. {product.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {Math.round(product.price * 1.3)}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    23% OFF
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-slate-700/20 bg-white/60 p-6 backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {product.description ||
                    'Experience premium quality and unmatched comfort with this exceptional piece from Airflex. Crafted with attention to detail and designed for performance, this product represents the perfect fusion of style and functionality.'}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-xl border-2 px-4 py-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-xl border border-gray-300 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Only 8 left in stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full transform cursor-pointer rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 py-4 text-lg font-bold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-700"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart - Rs. {product.price * quantity}
                </Button>

                <Button
                  variant="outline"
                  className="w-full cursor-pointer rounded-2xl border-2 border-gray-300 bg-white py-4 text-lg font-bold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50"
                >
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-white/60 p-4 backdrop-blur-sm">
                  <div className="rounded-full bg-green-100 p-2">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">
                      On orders over Rs. 2000
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/60 p-4 backdrop-blur-sm">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Quality Guarantee
                    </p>
                    <p className="text-sm text-gray-600">
                      100% authentic products
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/60 p-4 backdrop-blur-sm">
                  <div className="rounded-full bg-purple-100 p-2">
                    <RotateCcw className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">
                      30-day return policy
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/60 p-4 backdrop-blur-sm">
                  <div className="rounded-full bg-amber-100 p-2">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Premium Quality</p>
                    <p className="text-sm text-gray-600">Airflex guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                You Might Also Like
              </h2>
              <p className="mt-2 text-gray-600">
                Discover more from our collection
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dummyProducts.slice(0, 4).map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                >
                  <div className="group cursor-pointer rounded-2xl border border-slate-700/20 bg-white/80 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-contain p-4 transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-cyan-600">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-lg font-bold text-cyan-600">
                        Rs. {relatedProduct.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AirflexBackground>
  );
}
