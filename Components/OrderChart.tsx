'use client';
import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const STATUS_COLORS = {
  Delivered: '#00c853', // Green
  Cancelled: '#d50000', // Red
  Pending: '#9c27b0',
  Processing: '#f6c177',
  Shipped: '#00b894',
  Returned: '#9ca3af',
};
const OrderChart = () => {
  const [orderData, setOrderData] = useState([]);

  const [isSmallScreen, setisSmallScreen] = useState(false);

  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setOrderData(data.orderStatus);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      setisSmallScreen(window.innerWidth <= 768);
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const outerRadius = isSmallScreen ? 60 : 80;

  return (
    <div className="mx-2 rounded-xl border border-[#1f1f1f] bg-[#1e1e1e] p-4 shadow-lg backdrop-blur-md md:mx-0 md:p-6">
      <h2 className="mb-4 text-center text-base font-medium text-gray-100 md:text-left md:text-lg">
        Order Status
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={orderData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={outerRadius}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(2)}%`
              }
            >
              {orderData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name] || '#cccccc'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31,41,55,0.8',
                borderBlock: '#4b5563',
                borderRadius: '4px',
                padding: '8px',
                fontSize: '12px',
              }}
              itemStyle={{
                color: '#e5e7eb',
              }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              align="center"
              wrapperStyle={{
                fontSize: 12,
              }}
              verticalAlign="bottom"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderChart;
