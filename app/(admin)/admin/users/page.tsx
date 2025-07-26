import React from 'react';
import StatCard from '@/Components/StatCard';
import { Users } from 'lucide-react';
const page = () => {
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard name={'Total Users'} icon={Users} value={1245} />
          <StatCard name={'Active Users'} icon={Users} value={892} />
          <StatCard name={' New Users  '} icon={Users} value={47} />
          <StatCard name={'Verified Users  '} icon={Users} value={1189} />
        </div>
      </div>
    </div>
  );
};

export default page;
