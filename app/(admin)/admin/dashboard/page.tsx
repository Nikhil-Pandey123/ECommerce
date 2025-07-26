import React from 'react';
import StatCard from '@/Components/StatCard';
import {
  DollarSign,
  ShoppingBag,
  SquareActivityIcon,
  Users,
} from 'lucide-react';
import SalesChart from '@/Components/SalesChart';

const page = () => {
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <main className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard name={'Total Sales'} icon={DollarSign} value="$10,000" />
          <StatCard name={'Total Clients'} icon={Users} value={15} />
          <StatCard name={'Total Products'} icon={ShoppingBag} value={'230'} />
          <StatCard name={'Stock'} icon={SquareActivityIcon} value={'12,000'} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <SalesChart />
        </div>
      </main>
    </div>
  );
};

export default page;
