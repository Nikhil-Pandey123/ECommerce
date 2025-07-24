'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import AirflexBackground from '@/Components/AirflexBackground';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    if (!name || !email || !address) {
      toast.error('Please fill out all fields');
      return;
    }
    const loadingToast = toast.loading('Processing your order...');

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity || 1,
          })),
          total,
          shippingInfo: {
            fullName: name,
            address,
            email,
          },
        }),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success('Redirecting to payment page...', {
          duration: 1500,
        });
      }

      setTimeout(() => {
        router.push('/checkout/payment');
      }, 1000);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Error while placing order: ', error);
    }
  };

  return (
    <AirflexBackground>
      <div className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-medium text-gray-900">
              Checkout
            </h1>
            <p className="text-sm text-gray-700">
              Review your order and complete your purchase
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto max-w-sm rounded-2xl border border-gray-300 bg-white/10 p-10 backdrop-blur-xl">
                <div className="mb-4 text-4xl opacity-80">📦</div>
                <h2 className="mb-3 text-xl font-medium text-gray-900">
                  No items to checkout
                </h2>
                <p className="mb-6 text-sm text-gray-700">
                  Add some items to your cart first
                </p>
                <Link href="/products">
                  <Button className="rounded-lg bg-blue-600 px-6 py-2 font-normal text-white transition-colors hover:bg-blue-700">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Shipping Information */}
              <div className="rounded-xl border border-gray-300 bg-white/15 p-6 backdrop-blur-xl">
                <h2 className="mb-6 text-lg font-medium text-gray-900">
                  Shipping Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-800"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="mt-1 border-gray-400 bg-white/20 text-gray-900 placeholder:text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-800"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="mt-1 border-gray-400 bg-white/20 text-gray-900 placeholder:text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-800"
                    >
                      Delivery Address
                    </Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="mt-1 min-h-[100px] border-gray-400 bg-white/20 text-gray-900 placeholder:text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your complete address"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-xl border border-gray-300 bg-white/15 p-6 backdrop-blur-xl">
                <h2 className="mb-6 text-lg font-medium text-gray-900">
                  Order Summary
                </h2>

                <div className="mb-6 max-h-80 space-y-4 overflow-y-auto">
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 border-b border-gray-300 pb-4 last:border-b-0"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="rounded-lg border border-gray-400 object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-700">
                          Qty: {item.quantity} × Rs.{' '}
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Rs.{' '}
                        {(item.price * (item.quantity || 1)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Tax</span>
                    <span className="text-gray-900">Rs. 0</span>
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
                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full rounded-lg bg-green-600 py-3 font-normal text-white transition-colors hover:bg-green-700"
                  >
                    Place Order
                  </Button>

                  <Link href="/cart" className="block">
                    <Button
                      variant="outline"
                      className="w-full rounded-lg border-gray-400 bg-white/20 py-2 font-normal text-gray-800 hover:bg-gray-200/50"
                    >
                      Back to Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AirflexBackground>
  );
}
