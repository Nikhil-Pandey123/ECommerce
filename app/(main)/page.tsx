import HomeBanner from '@/Components/HomeBanner';
import TopSellingSection from '@/Components/TopSellingSection';
export default function Home() {
  return (
    <>
      <main className="min-h-screen w-full bg-cover bg-center">
        <HomeBanner />
      </main>

      <div>
        <TopSellingSection />
      </div>
    </>
  );
}
