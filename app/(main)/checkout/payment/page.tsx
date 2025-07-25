'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { useState } from 'react';
import { toast } from 'sonner';

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [isLoading, setIsLoading] = useState(false);

  const { cart } = useCartStore();
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // Handle eSewa payment flow
  const handleEsewaPayment = async () => {
    if (!orderId) {
      toast.error('Order ID not found. Please try again.');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Connecting to eSewa...');

    try {
      const res = await fetch('http://localhost:5000/initialize-esewa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, totalPrice: total }),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success('Redirecting to eSewa...');

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

        const fields = {
          amount: data.purchasedItemData.totalPrice,
          tax_amount: 0,
          product_service_charge: 0,
          product_delivery_charge: 0,
          total_amount: data.purchasedItemData.totalPrice,
          transaction_uuid: data.purchasedItemData._id,
          product_code:
            process.env.NEXT_PUBLIC_ESEWA_PRODUCT_CODE || 'EPAYTEST',
          success_url: 'http://localhost:5000/complete-payment',
          failure_url: 'http://localhost:5000/payment-failure',
          signed_field_names: data.payment.signed_field_names,
          signature: data.payment.signature,
        };

        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error(data.message || 'Failed to initialize payment');
        console.error('Payment init error:', data);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong with eSewa payment');
      console.error('eSewa error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Cash on Delivery
  const handleCashOnDelivery = () => {
    toast.success('Order placed with Cash on Delivery!');
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  // If no order ID, show error screen
  if (!orderId) {
    return (
      <div className="p-6 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-red-600">Oops!</h2>
        <p className="text-gray-700">
          We couldn’t find your order. Please go back and try again.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Select Payment Method
      </h2>

      <div className="mb-6 text-gray-700">
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Total Amount:</strong> Rs. {total.toLocaleString()}
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleEsewaPayment}
          disabled={isLoading}
          className={`w-full rounded px-4 py-2 text-white transition ${
            isLoading
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Processing eSewa...' : 'Pay with eSewa'}
        </button>

        <button
          onClick={handleCashOnDelivery}
          disabled={isLoading}
          className="w-full rounded bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
        >
          Cash on Delivery
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Need help?{' '}
        <a href="/support" className="text-blue-600 hover:underline">
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default PaymentPage;
