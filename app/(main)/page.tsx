'use client';

import BackgroundVideo from '@/Components/BackgroundVideo';
import HomeBanner from '@/Components/HomeBanner';
import TopSellingSection from '@/Components/TopSellingSection';
import FeaturesSection from '@/Components/FeaturesSection';
import UpcomingFeaturesSection from '@/Components/UpcomingFeaturesSection';
import Footer from '@/Components/Footer';
export default function HomePage() {
  return (
    <div className="relative">
      <BackgroundVideo />

      <section className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <HomeBanner />
      </section>

      <section className="relative z-10">
        <TopSellingSection />
      </section>

      <section className="realtive z-10">
        <FeaturesSection />
      </section>

      <section className="relative z-10">
        <UpcomingFeaturesSection />
      </section>

      <section className="relative z-10">
        <Footer />
      </section>
    </div>
  );
}
