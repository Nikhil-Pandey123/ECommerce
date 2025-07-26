import React from 'react';

interface StatCardProps {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ name, icon: Icon, value }) => {
  return (
    <div
      className="overflow-hidden rounded-xl border border-[#1e1e1e] bg-[#1e1e1e] shadow-lg backdrop-blur-md"
      role="region"
      aria-label={`${name} statistic`}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-300">
          <Icon size={20} className="mr-2" />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
