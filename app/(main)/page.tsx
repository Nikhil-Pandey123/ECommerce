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

      {/* Remove the container wrapper here - TopSellingSection handles its own width */}
      <section className="relative z-10">
        <TopSellingSection />
      </section>
    </div>
  );
}
