'use client';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/Components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import AirflexBackground from '@/Components/AirflexBackground';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cart, removeFromCart, clearCart } = useCartStore();

  // Authentication Check
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      toast.error('Please login to view your cart');
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  if (loading) {
    return (
      <AirflexBackground>
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-lg bg-white/10 p-8 backdrop-blur-sm">
            <div className="text-xl font-medium text-white">
              Loading your cart...
            </div>
          </div>
        </div>
      </AirflexBackground>
    );
  }

  return (
    <AirflexBackground>
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-white drop-shadow-lg">
              Your Cart
            </h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"></div>
          </div>

          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto max-w-md rounded-2xl border border-white/20 bg-black/60 p-12 shadow-2xl backdrop-blur-md">
                <div className="mb-4 text-6xl">🛒</div>
                <h2 className="mb-4 text-2xl font-semibold text-white drop-shadow-lg">
                  Your cart is empty
                </h2>
                <p className="mb-6 text-gray-100 drop-shadow-md">
                  Start adding some amazing products to your cart!
                </p>
                <Link href="/products">
                  <Button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700">
                    Browse Collections
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="rounded-2xl border border-white/20 bg-black/60 p-6 shadow-2xl backdrop-blur-md">
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex flex-col items-center gap-6 py-4 sm:flex-row">
                        {/* Product Image */}
                        <div className="relative h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="rounded-xl border border-white/20 object-cover shadow-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="mb-2 text-xl font-semibold text-white drop-shadow-lg">
                            {item.title}
                          </h3>
                          <div className="flex flex-col gap-2 text-gray-100 sm:flex-row sm:items-center">
                            <span className="rounded-full border border-white/20 bg-white/30 px-3 py-1 text-sm font-medium">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-lg font-medium drop-shadow-md">
                              Rs. {item.price} × {item.quantity}
                            </span>
                          </div>
                          <div className="mt-2 text-xl font-bold text-white drop-shadow-lg">
                            Rs. {item.price * (item.quantity || 1)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="destructive"
                          onClick={() => handleRemove(item.id)}
                          className="rounded-lg border border-red-400 bg-red-500 px-6 py-2 text-white shadow-lg transition-all duration-200 hover:bg-red-600"
                        >
                          Remove
                        </Button>
                      </div>

                      {/* Divider */}
                      {index < cart.length - 1 && (
                        <div className="mt-6 border-t border-white/30"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="rounded-2xl border border-white/20 bg-black/60 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                  {/* Total */}
                  <div className="text-center lg:text-left">
                    <div className="mb-1 text-sm text-gray-100 drop-shadow-md">
                      Total Amount
                    </div>
                    <div className="text-3xl font-bold text-white drop-shadow-lg">
                      Rs. {total.toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                    <Link href="/products" className="flex-1 lg:flex-none">
                      <Button
                        variant="outline"
                        className="w-full rounded-lg border-white/50 bg-transparent px-6 py-3 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                      >
                        Continue Shopping
                      </Button>
                    </Link>

                    <Link href="/checkout" className="flex-1 lg:flex-none">
                      <Button className="w-full rounded-lg bg-gradient-to-r from-green-500 to-blue-500 px-8 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-blue-600">
                        Checkout
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      onClick={clearCart}
                      className="w-full rounded-lg border border-red-400 bg-red-500 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:bg-red-600 sm:w-auto"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AirflexBackground>
  );
}
