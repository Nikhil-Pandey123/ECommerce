import React from 'react';
import { mainFeatures } from '@/lib/data/features';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center justify-start bg-white px-6 py-12">
      <h1 className="mb-7 bg-gradient-to-r from-gray-700 via-gray-800 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
        Features
      </h1>

      <h2 className="mb-12 text-center text-5xl leading-tight font-bold">
        Discover What Makes
        <span className="mt-2.5 block bg-gradient-to-r from-gray-700 to-cyan-600 bg-clip-text text-transparent">
          AirFlex Unique
        </span>
      </h2>

      <div className="mb-20 text-center">
        <h3 className="mb-4 text-4xl font-bold text-gray-900">Core Features</h3>
        <p className="text-lg text-gray-600">
          Everything you need to create, customize, and commerce
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {mainFeatures.map(feature => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            subtitle={feature.subtitle}
            description={feature.description}
            features={feature.features}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
