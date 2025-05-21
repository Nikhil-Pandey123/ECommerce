import HomeBanner from '@/Components/HomeBanner';
import Image from 'next/image';
export default function Home() {
  return (
    <main className="bg-[url('/Airflex photo/man.jpeg')] min-h-screen w-full border-2 border-red-400 bg-cover bg-center">
      <HomeBanner />
    </main>
  );
}
