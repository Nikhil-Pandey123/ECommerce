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
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
            <div className="text-lg text-white/90">Loading your cart...</div>
          </div>
        </div>
      </AirflexBackground>
    );
  }

  return (
    <AirflexBackground>
      <div className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <h1 className="mb-2 text-3xl font-medium text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-700">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto max-w-sm rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
                <div className="mb-4 text-4xl opacity-60">🛒</div>
                <h2 className="mb-3 text-xl font-medium text-white/90">
                  Your cart is empty
                </h2>
                <p className="mb-6 text-sm text-white/60">
                  Discover our products and add items you love
                </p>
                <Link href="/products">
                  <Button className="rounded-lg bg-blue-600 px-6 py-2 font-normal text-white transition-colors hover:bg-blue-700">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="space-y-4 lg:col-span-2">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="rounded-lg border border-white/20 object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 line-clamp-2 text-base font-medium text-black/90">
                          {item.title}
                        </h3>
                        <div className="mb-3 flex items-center gap-3 text-sm text-black">
                          <span>Qty: {item.quantity}</span>
                          <span>•</span>
                          <span>Rs. {item.price.toLocaleString()}</span>
                        </div>
                        <div className="font-medium text-black">
                          Rs.{' '}
                          {(item.price * (item.quantity || 1)).toLocaleString()}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(item.id)}
                        className="border-white/20 bg-transparent px-3 py-1 text-xs text-black hover:border-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 rounded-xl border border-gray-300 bg-white/15 p-6 backdrop-blur-xl">
                  <h2 className="mb-6 text-lg font-medium text-gray-900">
                    Order Summary
                  </h2>

                  <div className="mb-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        Subtotal ({cart.length} items)
                      </span>
                      <span className="text-gray-900">
                        Rs. {total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Shipping</span>
                      <span className="text-gray-900">Free</span>
                    </div>
                    <div className="border-t border-gray-400 pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">Total</span>
                        <span className="text-lg font-medium text-gray-900">
                          Rs. {total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/checkout" className="block">
                      <Button className="w-full rounded-lg bg-green-600 py-3 font-normal text-white transition-colors hover:bg-green-700">
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <Link href="/products" className="block">
                      <Button
                        variant="outline"
                        className="w-full rounded-lg border-gray-400 bg-white/20 py-2 font-normal text-gray-800 hover:bg-gray-200/50"
                      >
                        Continue Shopping
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="w-full rounded-lg border-red-400 bg-white/20 py-2 text-sm font-normal text-red-700 hover:border-red-500 hover:bg-red-100/50"
                    >
                      Clear All Items
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
