'use client';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [isLoading, setIsLoading] = useState(false);

  const { cart } = useCartStore();
  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const router = useRouter();

  const handleEsewaPayment = async () => {
    if (!orderId) {
      toast.error('Order ID not found');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Initializing payment...');

    try {
      const res = await fetch('http://localhost:5000/initialize-esewa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId,
          totalPrice: total,
        }),
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

        // Debug log
        console.log('eSewa form fields:', fields);

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
        console.error('Payment initialization failed:', data);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to initialize payment');
      console.error('Error initializing eSewa payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderId) {
    return (
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold text-red-600">Error</h2>
        <p>Order ID not found. Please go back and try again.</p>
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
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Choose Payment Method</h2>
      <div className="mb-4">
        <p className="text-gray-600">Order ID: {orderId}</p>
        <p className="text-gray-600">
          Total Amount: Rs. {total.toLocaleString()}
        </p>
      </div>
      <button
        onClick={handleEsewaPayment}
        disabled={isLoading}
        className={`rounded px-4 py-2 text-white ${
          isLoading
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isLoading ? 'Processing...' : 'Pay with eSewa'}
      </button>
    </div>
  );
};

export default PaymentPage;
