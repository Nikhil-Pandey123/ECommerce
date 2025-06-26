import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

const FeatureCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  features,
}: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 p-6 shadow-sm transition hover:shadow-lg">
      <div className="mb-4 flex items-center space-x-3">
        <Icon className="h-10 w-10 text-cyan-600" />
        <h4 className="text-2xl font-semibold">{title}</h4>
      </div>
      <h5 className="mb-2 text-lg font-medium text-blue-600">{subtitle}</h5>
      <p className="mb-4 text-gray-700">{description}</p>
      <ul className="list-inside list-disc space-y-1 text-gray-600">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
