import AirflexBackground from '@/Components/AirflexBackground';
import React from 'react';

const page = () => {
  return (
    <div>
      <AirflexBackground>
        <section className="mt-4 flex h-screen flex-col items-center justify-start text-center">
          <h1 className="text-twitter-blue mb-3 text-3xl font-bold">
            OUR BLOGS
          </h1>
          <p className="text-xl text-gray-900">
            Welcome to Airflex Blog section
          </p>
        </section>
      </AirflexBackground>
    </div>
  );
};

export default page;
