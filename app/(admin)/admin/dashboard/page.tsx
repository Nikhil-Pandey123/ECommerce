import React from 'react';
import StatCard from '@/Components/StatCard';
import {
  DollarSign,
  ShoppingBag,
  SquareActivityIcon,
  Users,
} from 'lucide-react';
import SalesChart from '@/Components/SalesChart';
import CategoryChart from '@/Components/CategoryChart';
import OrderChart from '@/Components/OrderChart';

const page = () => {
  return (
    <div className="bg-background relative z-10 flex-1 overflow-auto">
      <main className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            name={'Total Sales'}
            icon={DollarSign}
            value="$10,000"
            className="bg-card border-border border shadow-sm transition-shadow duration-200 hover:shadow-md"
          />
          <StatCard
            name={'Total Clients'}
            icon={Users}
            value={15}
            className="bg-card border-border border shadow-sm transition-shadow duration-200 hover:shadow-md"
          />
          <StatCard
            name={'Total Products'}
            icon={ShoppingBag}
            value={'230'}
            className="bg-card border-border border shadow-sm transition-shadow duration-200 hover:shadow-md"
          />
          <StatCard
            name={'Stock'}
            icon={SquareActivityIcon}
            value={'12,000'}
            className="bg-card border-border border shadow-sm transition-shadow duration-200 hover:shadow-md"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-card border-border rounded-lg border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <SalesChart />
          </div>

          <div className="bg-card border-border rounded-lg border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <CategoryChart />
          </div>

          <div className="bg-card border-border rounded-lg border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md lg:col-span-2">
            <OrderChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
