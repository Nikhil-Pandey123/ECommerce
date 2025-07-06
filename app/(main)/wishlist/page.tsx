'use client';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useCartStore } from '@/lib/store/cartStore';
import AirflexBackground from '@/Components/AirflexBackground';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/Components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      selectedSize: 'M', // Default size
      quantity: 1,
    });
  };

  if (wishlist.length === 0) {
    return (
      <AirflexBackground>
        <div className="min-h-screen pt-20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="rounded-2xl border border-slate-700/20 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-sm">
                <Heart className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <h2 className="mb-4 text-3xl font-bold text-gray-900">
                  Your Wishlist is Empty
                </h2>
                <p className="mb-8 text-gray-600">
                  Start adding products you love to your wishlist!
                </p>
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-cyan-700">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AirflexBackground>
    );
  }

  return (
    <AirflexBackground>
      <div className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="mt-2 text-gray-600">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}{' '}
                  in your wishlist
                </p>
              </div>
              {wishlist.length > 0 && (
                <Button
                  onClick={clearWishlist}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map(item => (
              <div
                key={item.id}
                className="group relative rounded-2xl border border-slate-700/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-red-500 shadow-lg backdrop-blur-sm transition-all hover:bg-red-50 hover:text-red-600"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </button>

                {/* Product Image */}
                <Link href={`/products/${item.id}`}>
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition-transform group-hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="space-y-3">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-cyan-600">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-cyan-600">
                      Rs. {item.price}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-cyan-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Link href={`/products/${item.id}`}>
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AirflexBackground>
  );
}
