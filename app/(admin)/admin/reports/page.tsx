import React from 'react';
import StatCard from '@/Components/StatCard';
import {
  DollarSign,
  ListOrderedIcon,
  ShoppingBag,
  SquareActivityIcon,
  Users,
} from 'lucide-react';
const page = () => {
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <main className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard name={'Total Orders'} icon={ListOrderedIcon} value="147" />
          <StatCard name={'Total Revenue'} icon={DollarSign} value="$10,000" />
          <StatCard name={'Total Customers'} icon={Users} value={'230'} />
          <StatCard
            name={'Avg. Order Value'}
            icon={DollarSign}
            value={'12,000'}
          />
        </div>
      </main>

      <div>
        <h1>Recent Orders</h1>
      </div>
    </div>
  );
};

export default page;
