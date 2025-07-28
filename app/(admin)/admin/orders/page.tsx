'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/getOrders')
      .then(res => setOrders(res.data.orders))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="relative z-10 ml-8 min-h-screen flex-1 overflow-auto dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-semibold tracking-tight dark:text-white">
          Orders
        </h2>

        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black/5 dark:ring-white/10">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="dark:bg-gray-800">
              <tr>
                {[
                  'Order ID',
                  'Customer',
                  'Email',
                  'Address',
                  'Items',
                  'Total',
                  'Status',
                  'Date',
                ].map((heading, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-sm font-medium tracking-wider uppercase dark:text-gray-300"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 dark:bg-gray-950">
              {orders.map(order => (
                <tr
                  key={order._id}
                  className="transition-colors dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 font-mono text-sm dark:text-gray-100">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 text-sm dark:text-gray-100">
                    {order.shippingInfo.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm dark:text-gray-100">
                    {order.shippingInfo.email}
                  </td>
                  <td className="px-6 py-4 text-sm dark:text-gray-100">
                    {order.shippingInfo.address}
                  </td>
                  <td className="space-y-1 px-6 py-4 text-sm dark:text-gray-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="font-mono text-xs">
                        {item.productId} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold dark:text-gray-100">
                    Rs. {order.total}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : order.status === 'Cancelled'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm dark:text-gray-100">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
