'use client';

import BackgroundVideo from '@/Components/BackgroundVideo';
import HomeBanner from '@/Components/HomeBanner';
import TopSellingSection from '@/Components/TopSellingSection';

export default function HomePage() {
  return (
    <div className="relative">
      <BackgroundVideo />

      <section className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <HomeBanner />
      </section>

      <section className="bg-primary relative z-10 py-16">
        <div className="container mx-auto px-4">
          <TopSellingSection />
        </div>
      </section>
    </div>
  );
}
