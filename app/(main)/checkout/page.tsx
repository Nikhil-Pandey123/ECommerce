'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = () => {
    if (!name || !email || !address) {
      toast.error('Please fill out all fields');
      return;
    }

    toast.success('🎉 Order placed successfully!');
    clearCart();
    setName('');
    setEmail('');
    setAddress('');
  };

  return (
    <section className="bg-primary mx-auto min-h-screen max-w-5xl p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      {cart.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg">Your cart is empty</p>
          <Link href="/products">
            <Button className="mt-4">Browse Collections</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Order Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b border-white/10 pb-4"
              >
                <div className="relative h-20 w-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="rounded-md object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  Rs. {item.price * (item.quantity || 1)}
                </p>
              </div>
            ))}
            <div className="mt-4 text-right text-xl font-bold">
              Total: Rs. {total}
            </div>
          </div>

          {/* User Info Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Information</h2>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={handlePlaceOrder} className="w-full md:w-auto">
            Place Order
          </Button>
        </div>
      )}
    </section>
  );
}
