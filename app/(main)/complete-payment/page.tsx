'use client';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/Components/ui/button';

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your order has been placed successfully.
          </p>
        </div>

        {transactionId && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Transaction ID:</p>
            <p className="font-mono text-sm font-medium">{transactionId}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link href="/orders" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              View Orders
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
