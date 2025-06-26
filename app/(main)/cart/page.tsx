'use client';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/Components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import AirflexBackground from '@/Components/AirflexBackground';
export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  return (
    <section className="mx-auto min-h-screen w-full rounded-lg bg-white p-6 text-black shadow-2xl">
      <AirflexBackground>
        <h1 className="mb-6 text-center text-3xl font-bold">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg">🛒 Your cart is empty</p>
            <Link href="/products">
              <Button className="mt-4">Browse Collections</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-6 border-b border-white/10 pb-6 md:flex-row"
              >
                <div className="relative h-32 w-32">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
                <div className="w-full flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    Rs. {item.price} × {item.quantity} = Rs.{' '}
                    {item.price * (item.quantity || 1)}
                  </p>
                </div>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}

            {/* Total + Action Buttons */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
              <div className="text-2xl font-bold">Total: Rs. {total}</div>
              <div className="flex gap-4">
                <Link href="/products" className="cursor-pointer">
                  <Button
                    variant="outline"
                    className="curosr-pointer text-black"
                  >
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/checkout">
                  <Button className="cursor-pointer">Checkout</Button>
                </Link>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </AirflexBackground>
    </section>
  );
}
