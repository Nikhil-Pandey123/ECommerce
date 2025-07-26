'use client';
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setSalesData(data.sales);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="mx-2 rounded-xl border border-[#1f1f1f] bg-[#1e1e1e] p-4 shadow-lg backdrop-blur-md md:mx-0 md:p-6">
      <h2 className="mb-4 text-center text-base font-medium text-white md:text-left md:text-lg">
        Sales Overview
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={40} />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31,41,55,0.8',
                borderColor: '#4b5563',
                fontSize: '12px',
              }}
              itemStyle={{
                color: '#e5e7eb',
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#9c27b0"
              strokeWidth={3}
              dot={{ fill: '#9c27b0', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
